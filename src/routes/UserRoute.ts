import { Router } from 'express';
import { UserController } from '../controllers/UserController'

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', (req, res) => userController.getAllUser(req, res));
userRouter.get('/:id', (req, res) => userController.getOneUserById(req, res));
userRouter.post('/', (req, res) => userController.createNewUser(req, res));
userRouter.put('/:id', (req, res) => userController.updateOneUser(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteOneUser(req, res));

export default userRouter;
