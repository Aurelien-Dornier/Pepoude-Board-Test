# On part d'une image Node.js
FROM node:20-alpine

# Définition du répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install 

# Copier le reste du code de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage en mode développement
CMD [ "npm", "run", "dev" ]
