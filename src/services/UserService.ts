import { AppDataSource } from '../data-source';
import User from '../models/interfaces/UserInterface';

/**
 * Le role du service est d'aller chercher les données,
 * pour les mettre à disposition de controlleur.
 */
export class UserService {
  getAllUsers(): Promise<User[]> {
    return AppDataSource.query(`SELECT * FROM plantesncf;`);
  }

  getOneUserById(id: number): Promise<User> {
    return AppDataSource.query(`SELECT name FROM plantesncf where id = ${id}`);
  }

  createNewUser(newUser: User): Promise<any> {
    return AppDataSource.query(
      `INSERT INTO plantesncf (name, email) VALUES (${newUser.name}, ${newUser.email})`
    );
  }

  updateOneUser(id: number, changes: User): Promise<User> {
    return AppDataSource.query(`UPDATE User SET name = ${changes.name}, email =${changes.email}`);
  }

  deleteOneUser(id: number): Promise<User> {
    return AppDataSource.query(`DELETE FROM user where id = ${id}`);
  }
}
