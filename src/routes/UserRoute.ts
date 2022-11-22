import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router();

const userController = new UserController();

userRouter.get("/", (req, res) => userController.getAllUser(req, res));

userRouter.get("/:id", (req, res) => userController.getOneUserById(req, res));

/**
 * Il y a deux routes pour l'identification.
 */

userRouter.post("/inscription", (req, res) => {
  console.log("coucou");
  userController.createNewUser(req, res);
}); // Pour inscription signup
// il faudra également une route pour le login ...

/**
 * Il y a deux routes pour s'inscrire et une autre pour se connecter.
 */
// userRouter.post("/login", (req, res) => userController.loginUser(req, res)); // Pour login

/**
 * Il y a deux routes pour l'identification.
 */

userRouter.put("/:id", (req, res) => userController.updateOneUser(req, res));

userRouter.delete("/:id", (req, res) => userController.deleteOneUser(req, res));

export default userRouter;
