import { sequelize } from "../models/index.js";

const createDataBase = async () => {
  try {
    console.log("🚀Creating database...");
    await sequelize.sync({ force: true });
    console.log("✅ Database created successfully");
  } catch (error) {
    console.log("❌ Error creating database", error);
  } finally {
    await sequelize.close();
  }
};
createDataBase();
