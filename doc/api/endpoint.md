# Documentation API

## Table des matières

1. [Introduction](#introduction)
2. [Authentification](#authentification)
3. [Routes Utilisateurs](#routes-utilisateurs)
4. [Routes Produits](#routes-produits)
5. [Routes Commandes](#routes-commandes)
6. [Middlewares](#middlewares)
7. [Gestion des erreurs](#gestion-des-erreurs)
8. [Pagination et filtrage](#pagination-et-filtrage)
9. [Exemples de requêtes](#exemples-de-requêtes)

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

### quelques exemples de requêtes et réponses

#### Créer une commande (POST)

```bash
http://localhost:3000/api/orders
```

**exemple de contenu de la requête**

```json
{
  "userId": 2,
  "status": "pending",
  "products": [
    {
      "productId": 14,
      "quantity": 1
    },
    {
      "productId": 9,
      "quantity": 1
    }
  ]
}
```

**Reponse 201 Created**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 32,
    "status": "pending",
    "totalAmount": "119.98",
    "createdAt": "2024-08-21T18:40:01.177Z",
    "updatedAt": "2024-08-21T18:40:01.177Z",
    "userId": 2,
    "user": {
      "id": 2,
      "username": "generalpepin",
      "email": "generalpepin@example.com"
    },
    "Products": [
      {
        "id": 14,
        "name": "Travel Pillow",
        "description": "Memory foam travel pillow",
        "price": "19.99",
        "stock": 9,
        "createdAt": "2024-08-21T14:39:02.846Z",
        "updatedAt": "2024-08-21T18:40:01.187Z",
        "categoryId": 21,
        "OrderProduct": {
          "quantity": 1
        }
      },
      {
        "id": 9,
        "name": "Fitness Tracker",
        "description": "Latest model fitness tracker",
        "price": "99.99",
        "stock": 9,
        "createdAt": "2024-08-21T14:39:02.846Z",
        "updatedAt": "2024-08-21T18:40:01.190Z",
        "categoryId": 18,
        "OrderProduct": {
          "quantity": 1
        }
      }
    ]
  }
}
```

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

## Exemples de requêtes

### Rechercher un utilisateur par son nom

```bash
http://localhost:3000/api/users/name?username=pepin
```

```bash
http://localhost:3000/api/usersproducts/search?status=pending
```
