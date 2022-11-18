import { AppDataSource } from "../data-source";
import User from "../models/interfaces/UserInterface";

/**
 * Le role du service est d'aller chercher les données,
 * pour les mettre à disposition de controlleur.
 */
export class UserService {
  getAllUsers(): Promise<User[]> {
    return AppDataSource.query(`SELECT * FROM utilisateur;`);
  }

  getOneUserById(id: number): Promise<User> {
    return AppDataSource.query(`SELECT nom FROM utilisateur where id = ${id}`);
  }

  createNewUser(newUser: User): Promise<any> {
    return AppDataSource.query(
      `INSERT INTO utilisateur (nom, email, password) VALUES ('${newUser.nom}', '${newUser.email}', '${newUser.password}')`
    );
  }

  updateOneUser(id: number, changes: User): Promise<User> {
    return AppDataSource.query(
      `UPDATE utilisateur SET nom = '${changes.nom}', email = '${changes.email}', password = '${changes.password}'`
    );
  }

  deleteOneUser(id: number): Promise<User> {
    return AppDataSource.query(`DELETE FROM utilisateur where id = ${id}`);
  }
}
