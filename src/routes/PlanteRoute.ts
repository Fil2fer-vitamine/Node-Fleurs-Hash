import { Router } from 'express';
import { PlanteController } from '../controllers/PlanteController'

const planteRouter = Router();

const planteController = new PlanteController();

planteRouter.get('/', (req, res) => planteController.getAllPlantes(req, res));
planteRouter.get('/:id', (req, res) => planteController.getOnePlanteById(req, res));
planteRouter.post('/', (req, res) => planteController.createNewPlante(req, res));
planteRouter.put('/:id', (req, res) => planteController.updateOnePlante(req, res));
planteRouter.delete('/:id', (req, res) => planteController.deleteOnePlante(req, res));

export default planteRouter;
