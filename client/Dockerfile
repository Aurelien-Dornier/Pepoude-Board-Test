# On part d'une image Node.js
FROM node:20-alpine

# Répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install



# Copier le reste du code de l'application
COPY . .

# Exposer le port 5173 (port par défaut de Vite en dev)
EXPOSE 5173

# Commande de démarrage en mode développement
CMD [ "npm", "run", "dev", "--host" ]
