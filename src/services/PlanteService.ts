import { AppDataSource } from "../data-source";
import Plante from "../models/interfaces/PlanteInterface";

/**
 * Le role du service est d'aller chercher les données,
 * pour les mettre à disposition de controlleur.
 */
export class PlanteService {
  getAllPlantes(): Promise<Plante[]> {
    return AppDataSource.query(`SELECT * FROM plantesncf;`);
  }

  getOnePlanteById(id: number): Promise<Plante> {
    return AppDataSource.query(`SELECT name FROM plantesncf where id = ${id}`);
  }

  createNewPlante(newPlante: Plante): Promise<Plante> {
    return AppDataSource.query(
      `INSERT INTO plantesncf (name, email) VALUES (${newPlante.name}, ${newPlante.unitprice_ati}, ${newPlante.quantity}, ${newPlante.category}, ${newPlante.rating}, ${newPlante.url_picture})`
    );
  }

  updateOnePlante(id: number, changes: Plante): Promise<Plante> {
    return AppDataSource.query(
      `UPDATE User SET name = ${changes.name}, email =${changes.unitprice_ati}, ${changes.quantity}, email =${changes.category}, ${changes.rating}, email =${changes.url_picture}`
    );
  }

  deleteOnePlante(id: number): Promise<Plante> {
    return AppDataSource.query(`DELETE FROM user where id = ${id}`);
  }
}
