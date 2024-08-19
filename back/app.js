import "dotenv/config";
import express from "express";
import { router } from "./src/routes/router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
