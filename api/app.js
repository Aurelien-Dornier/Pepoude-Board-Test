import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./src/routes/router.js";

import { sessionMdw } from "./src/middlewares/sessionMdw.js";
import { middleware404 } from "./src/middlewares/middleware404.js";
import { autoMigrate } from "./src/utils/autoMigrate.js"    

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares Session
app.use(sessionMdw);

// Middlewares Cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api", router);

// Middlewares 404
app.use(middleware404);


async function startServer() {
  try {
    if (process.env.NODE_ENV === 'production') {
      await autoMigrate();
    }
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

// Démarrer le serveur
startServer();
export default app;
