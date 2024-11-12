import { sequelize } from './models/index.js';
import { autoMigrate } from './utils/autoMigrate.js';

export class Server {
  constructor(app) {
    this.app = app;
  }

  async start() {
    try {
      // En production, exécuter la migration automatique
      if (process.env.NODE_ENV === 'production') {
        await autoMigrate();
      }

      const port = process.env.PORT || 3000;
      
      this.app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
      });

      this.setupGracefulShutdown();
    } catch (error) {
      console.error('🚨 Error starting server:', error);
      process.exit(1);
    }
  }

  setupGracefulShutdown() {
    // Gérer la fermeture propre de l'application
    process.on('SIGTERM', this.handleShutdown);
    process.on('SIGINT', this.handleShutdown);
  }

  handleShutdown = async () => {
    console.log('📌 Shutting down server...');
    try {
      await sequelize.close();
      console.log('📌 Database connections closed');
      process.exit(0);
    } catch (error) {
      console.error('🚨 Error during shutdown:', error);
      process.exit(1);
    }
  };
}