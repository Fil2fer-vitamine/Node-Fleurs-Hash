import { Request, Response } from 'express';
import User from '../models/interfaces/UserInterface';
import { UserService } from '../services/UserService';

/**
 * Le role du controlleur est de gérer les requêtes,
 * il fait appelle au service qui lui permet de rappatrier
 * les données.
 */
export class UserController {
  public userService = new UserService();

  async getAllUser(req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await this.userService.getAllUsers();
      res.send({ status: 'OK', data: allUsers });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async getOneUserById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const onePlante = await this.userService.getOneUserById(id);
      res.send({ status: 'OK', data: onePlante });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async createNewUser(req: Request, res: Response): Promise<void> {
    const newUser: User = {
      ...req.body,
    };
    console.log(newUser);
    if (
      !newUser.name ||
      newUser.email === undefined    
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'email'",
        },
      });
      return;
    }

    try {
      await this.userService.createNewUser(newUser);
      res.status(201).send({
        status: 'OK',
        message: `New User created`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async updateOneUser(req: Request, res: Response): Promise<void> {
    const changes: User = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.name || !changes.email) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'email'",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.userService.updateOneUser(id, changes);
      res.status(201).send({
        status: 'OK',
        message: `User with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async deleteOneUser(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.userService.deleteOneUser(id);
      res
        .status(200)
        .send({ status: 'OK', message: `User with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }
}
