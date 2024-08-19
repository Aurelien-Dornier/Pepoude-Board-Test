import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route de test
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
