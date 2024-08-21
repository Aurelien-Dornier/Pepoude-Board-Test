# Documentation API

## Table des matières

1. [Introduction](#introduction)
2. [Authentification](#authentification)
3. [Routes Utilisateurs](#routes-utilisateurs)
4. [Routes Produits](#routes-produits)
5. [Routes Commandes](#routes-commandes)
6. [Routes Catégories](#routes-catégories)
7. [Middlewares](#middlewares)
8. [Gestion des erreurs](#gestion-des-erreurs)
9. [Pagination et filtrage](#pagination-et-filtrage)
10. [Exemples de requêtes](#exemples-de-requêtes)

## Introduction

Cette API permet de gérer les utilisateurs, les produits et les commandes pour notre plateforme e-commerce. Elle utilise JSON pour les requêtes et les réponses.

## Authentification

L'API utilise l'authentification JWT (JSON Web Token). Pour accéder aux endpoints protégés, incluez le token dans l'en-tête `Authorization` sous la forme `Bearer <token>`.

## Routes Utilisateurs (Users)

| Méthode | Chemin       | Middleware        | Contrôleur    | Description                            | Paramètres                      |
| ------- | ------------ | ----------------- | ------------- | -------------------------------------- | ------------------------------- |
| GET     | /users       | authenticateToken | getAllUsers   | Obtenir tous les utilisateurs (ADMIN)  | page, limit                     |
| GET     | /users/:name | authenticateToken | getUserByName | Obtenir un utilisateur par nom (ADMIN) | -                               |
| POST    | /login       | -                 | loginUser     | Connexion utilisateur                  | email, password                 |
| POST    | /register    | validateUser      | registerUser  | Inscription utilisateur                | username, email, password, role |

## Routes Produits (Products)

| Méthode | Chemin           | Middleware        | Contrôleur       | Description                   | Paramètres                         |
| ------- | ---------------- | ----------------- | ---------------- | ----------------------------- | ---------------------------------- |
| GET     | /products        | -                 | getAllProducts   | Obtenir tous les produits     | page, limit, sort, category        |
| GET     | /products/search | -                 | getProductByName | Rechercher un produit par nom | name                               |
| GET     | /products/:id    | -                 | getProductById   | Obtenir un produit par ID     | -                                  |
| POST    | /products        | authenticateToken | createProduct    | Créer un produit              | name, description, price, category |
| PUT     | /products/:id    | authenticateToken | updateProduct    | Mettre à jour un produit      | name, description, price, category |
| DELETE  | /products/:id    | authenticateToken | deleteProduct    | Supprimer un produit          | -                                  |

## Routes Commandes (Orders)

| Méthode | Chemin             | Middleware        | Contrôleur         | Description                            | Paramètres            |
| ------- | ------------------ | ----------------- | ------------------ | -------------------------------------- | --------------------- |
| GET     | /orders            | authenticateToken | getAllOrders       | Obtenir toutes les commandes           | page, limit, status   |
| GET     | /orders/:id        | authenticateToken | getOrderById       | Obtenir une commande par ID            | -                     |
| POST    | /orders            | authenticateToken | creatOrder         | Créer une commande                     | products, totalAmount |
| PATCH   | /orders/:id        | authenticateToken | updateOrder        | Mettre à jour une commande             | status                |
| DELETE  | /orders/:id        | authenticateToken | deleteOrder        | Supprimer une commande                 | -                     |
| GET     | /orders/statistics | authenticateToken | getOrderStatistics | Obtenir les statistiques des commandes | startDate, endDate    |

## Routes Catégories (Categories)

| Méthode | Chemin             | Middleware        | Contrôleur        | Description                      | Paramètres |
| ------- | ------------------ | ----------------- | ----------------- | -------------------------------- | ---------- |
| GET     | /categories        | authenticateToken | getAllCategories  | Obtenir toutes les catégories    | -          |
| GET     | /categories/search | authenticateToken | getCategoryByName | Rechercher une catégorie par nom | name       |
| GET     | /categories/:id    | authenticateToken | getCategoryById   | Obtenir une catégorie par ID     | -          |
| POST    | /categories        | authenticateToken | createCategory    | Créer une catégorie              | name,      |
| PUT     | /categories/:id    | authenticateToken | updateCategory    | Mettre à jour une catégorie      | name,      |
| DELETE  | /categories/:id    | authenticateToken | deleteCategory    | Supprimer une catégorie          | -          |

## Middlewares

| Nom                 | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `validateUser`      | Valide les données utilisateur lors de l'inscription |
| `middleware404`     | Gère les routes non trouvées                         |
| `sessionMdw`        | Configure la session Express                         |
| `authenticateToken` | Vérifie le token JWT                                 |
| `ctrlWrapper`       | Gère les erreurs des contrôleurs                     |

## Gestion des erreurs

| Code | Description            |
| ---- | ---------------------- |
| 400  | Requête invalide       |
| 401  | Non autorisé           |
| 403  | Accès interdit         |
| 404  | Ressource non trouvée  |
| 500  | Erreur serveur interne |

## Pagination et filtrage

- Utilisez `page` et `limit` pour la pagination
- Utilisez `sort` pour trier les résultats (ex: `sort=price` ou `sort=-createdAt`)
- Des filtres spécifiques sont disponibles pour certaines routes (ex: `category` pour les produits)
