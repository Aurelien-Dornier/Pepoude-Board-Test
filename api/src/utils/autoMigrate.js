import { sequelize } from '../models/index.js';
import { createDataBase } from '../seed/createTables.js';
import { seedDataBase } from '../seed/seedDataBase.js';

export async function autoMigrate() {
  try {
    // Établir la connexion
    await sequelize.authenticate();
    console.log('📡 Connected to database');

    // Vérifier si la base de données est vide
    const tables = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    );
    
    if (tables[0].length === 0) {
      console.log('Base de données vide, démarrage de la migration...');
      await createDataBase();
      await seedDataBase();
      console.log('Migration et seeding terminés avec succès');
    } else {
      console.log('La base de données existe déjà');
    }
  } catch (error) {
    console.error('Erreur pendant la migration automatique:', error);
    throw error;
  }
}