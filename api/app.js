import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./src/routes/router.js";

import { sessionMdw } from "./src/middlewares/sessionMdw.js";
import { middleware404 } from "./src/middlewares/middleware404.js";
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

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
export default app;
