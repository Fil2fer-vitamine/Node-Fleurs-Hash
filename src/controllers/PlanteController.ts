import { Request, Response } from 'express';
import Plante from '../models/interfaces/PlanteInterface';
import { PlanteService } from '../services/PlanteService';

/**
 * Le role du controlleur est de gérer les requêtes,
 * il fait appelle au service qui lui permet de rappatrier
 * les données.
 */
export class PlanteController {
  public planteService = new PlanteService();

  async getAllPlantes(req: Request, res: Response): Promise<void> {
    try {
      const allPlantes = await this.planteService.getAllPlantes();
      res.send({ status: 'OK', data: allPlantes });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async getOnePlanteById(req: Request, res: Response): Promise<void> {
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
      const onePlante = await this.planteService.getOnePlanteById(id);
      res.send({ status: 'OK', data: onePlante });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async createNewPlante(req: Request, res: Response): Promise<void> {
    const newPlante: Plante = {
      ...req.body,
    };
    console.log(newPlante);
    if (
      !newPlante.name ||
      newPlante.unitprice_ati === undefined ||
      newPlante.quantity === undefined ||
      newPlante.category === undefined ||
      newPlante.rating === undefined ||
      newPlante.url_picture === undefined
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity', 'category', 'rating', 'url_picture'",
        },
      });
      return;
    }

    try {
      await this.planteService.createNewPlante(newPlante);
      res.status(201).send({
        status: 'OK',
        message: `New Plante created`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async updateOnePlante(req: Request, res: Response): Promise<void> {
    const changes: Plante = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.name || !changes.unitprice_ati || !changes.quantity || !changes.category || !changes.rating || !changes.url_picture) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'unitprice_ati', 'quantity', 'category', 'rating', 'url_picture'",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.planteService.updateOnePlante(id, changes);
      res.status(201).send({
        status: 'OK',
        message: `Plante with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }

  async deleteOnePlante(req: Request, res: Response): Promise<void> {
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
      await this.planteService.deleteOnePlante(id);
      res
        .status(200)
        .send({ status: 'OK', message: `Plante with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
  }
}
