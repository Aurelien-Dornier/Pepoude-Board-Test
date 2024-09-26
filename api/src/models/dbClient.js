import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);
// tester la connexion
// sequelize
//   .authenticate()
//   .then(() => console.log("Connexion réussie"))
//   .catch((err) => console.log("Erreur de connexion", err));
