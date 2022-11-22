import { Request, Response } from "express";
import User from "../models/interfaces/UserInterface";
import { UserService } from "../services/UserService";
import bcrypt from "bcrypt"; // pour hasher le password

/**
 * Le role du controlleur est de gérer les requêtes, il fait appel au service qui lui permet de rappatrier les données.
 * Quand il y a notion de base de données, il y a notion de serveurs : il y a asynchronisme entre le moment où l'on demande (de par une reqyête) et le moment où l'on reçoit une réponse du serveur.
 */

export class UserController {
  public userService = new UserService();

  /** -------------------- Partie Visualisation de tous les utilisateurs ------------------------ */

  async getAllUser(req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await this.userService.getAllUsers();
      res.send({ status: "OK", data: allUsers });
      console.log(allUsers);
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  /** --------------- Partie Visualisation de d'un des des utilisateurs par son Id --------------- */

  async getOneUserById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const onePlante = await this.userService.getOneUserById(id);
      res.send({ status: "OK", data: onePlante });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  /** -------------------- Partie Visualisation de création d'un utilisateur ------------------------ */

  async createNewUser(req: Request, res: Response): Promise<void> {
    console.log("UserController - createNewUser - body : ", req.body);

    // extraire les information du body pour s'en faire un objet
    const newUser: User = {
      // id: req.body.id,
      nom: req.body.nom,
      email: req.body.email,
      password: req.body.password,
    };

    // vérifier que nous avons toute les info nécessaire à notre dispo
    if (
      newUser.nom === undefined || // Si on n'a pas tous les champs valides, on ne fait rien ...
      newUser.email === undefined ||
      newUser.password === undefined
    ) {
      console.log(newUser);

      res.status(400).send({
        status: "FAILLED",
        data: {
          error:
            "Le nom, l'email ou le mot de passe est requis : apparemment, l'un des trois champs est absent !!!",
        },
      });
      return;
    }

    // on veut hasher le mot de passe dès l'inscription et le garder en mémoire dans la base de données.
    // Utilisation de bcrypt. Le Hash est suivi du salage 'salt' au nombre de 10.
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      // Store hash in your password DB.
      console.log("message mot de passe hashé :", hash);

      /*const newUser: User = {
        // id: req.body.id,
        nom: req.body.nom,
        email: req.body.email,
        password: hash,
      };*/
      newUser.password = hash;

      console.log("newUser", newUser);

      try {
        await this.userService.createNewUser(newUser);
        res.status(201).send({
          status: "OK",
          message: `New User created`,
          data: newUser,
        });
      } catch (error: any) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
    });
  }

  /** ------------- Partie Visualisation d'une modif d'un Utilisateur de par l'Id --------------- */

  async updateOneUser(req: Request, res: Response): Promise<void> {
    const changes: User = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.nom || !changes.email) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'email', 'password'",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.userService.updateOneUser(id, changes);
      res.status(201).send({
        status: "OK",
        message: `User with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  /** -------------------- Partie Visualisation suppression d'un utilisateur ------------------------ */

  async deleteOneUser(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.userService.deleteOneUser(id);
      res
        .status(200)
        .send({ status: "OK", message: `User with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  /** -------------------- Partie Visualisation login d'un utilisateur ------------------------ */

  async loginNewUser(req: Request, res: Response): Promise<void> {}
}
