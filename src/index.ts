import express from "express";
import * as dotenv from "dotenv";
import { PlanteController } from "./controllers/PlanteController";
import * as path from "path";
import planteRouter from "./routes/PlanteRoute";
import { AppDataSource } from "./data-source";
import bodyParser = require("body-parser");
import userRouter from "./routes/UserRoute";

// Init environment variables (see .env.local file if it doesn't exist go to README.md file)
dotenv.config({ path: ".env.local" });

/**
 * Pour tester le hashage du mot de passe
 */
const infoDeConnexion = {
  email: "gg@gmail.com",
  password: "222222",
};
/**
 * Pour tester le hashage du mot de passe  --> demander la vidéo à Etienne Pommente. 18/11/2022 10H45
 */

AppDataSource.initialize()
  .then(async () => {
    // Express server creation
    const app = express();
    const port = process.env.PORT || 8080;

    app.use(bodyParser.json());
    // Set a static folder for assets
    app.use(
      "/assets",
      express.static(path.join(__dirname, "../public/assets"))
    );

    /************************************************
     * Data's routes
     */
    app.use("/api/plante", planteRouter);
    app.use("/api/myusers", userRouter);

    // Bind express server on port 3004
    app.listen(port, () => {
      console.log(
        `Express server est démarré sur la port ${port}. Ouverture de http://localhost:${port} pour voir ceci.`
      );
    });
  })
  .catch((error) => console.log(error));
