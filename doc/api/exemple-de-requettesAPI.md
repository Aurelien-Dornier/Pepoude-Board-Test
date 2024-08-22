## API Documentation

1. [Categories](#categories)

   - [Get Category by Name](#get-category-by-name)
   - [Get All Categories](#get-all-categories)
   - [Get Category by ID](#get-category-by-id)
   - [Create a New Category](#create-a-new-category)

2. [Orders](#orders)

   - [Get Order by ID](#get-order-by-id)
   - [Search Orders by User ID](#search-orders-by-user-id)
   - [Create a New Order](#create-a-new-order)
   - [Update an Order](#update-an-order)
   - [Delete an Order](#delete-an-order)

3. [Products](#products)

   - [Get All Products](#get-all-products)
   - [Search Products by Name](#search-products-by-name)
   - [Get Product by ID](#get-product-by-id)
   - [Create a New Product](#create-a-new-product)
   - [Update a Product](#update-a-product)
   - [Delete a Product](#delete-a-product)

4. [Users & Authentication](#users--authentication)
   - [Register a New User](#register-a-new-user)
   - [Login User](#login-user)
   - [Search Users by Username](#search-users-by-username)

### Categories

#### Get Category by Name

**GET** `/api/categories/search?name=Art`

**Description**: Retrieve categories by their name.

**Example Request:**

```http
GET http://localhost:3000/api/categories/search?name=Art
```

**Example Response:**

```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Art",
      "createdAt": "2024-08-21T18:49:27.770Z",
      "updatedAt": "2024-08-21T18:49:27.770Z"
    }
  ]
}
```

---

#### Get All Categories

**GET** `/api/categories`

**Description**: Retrieve all categories.

**Example Request:**

```http
GET http://localhost:3000/api/categories
```

**Example Response:**

```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Art",
      "createdAt": "2024-08-21T18:49:27.770Z",
      "updatedAt": "2024-08-21T18:49:27.770Z"
    },
    {
      "id": 2,
      "name": "Automotive",
      "createdAt": "2024-08-21T18:49:27.770Z",
      "updatedAt": "2024-08-21T18:49:27.770Z"
    },
    {
      "id": 3,
      "name": "Books",
      "createdAt": "2024-08-21T18:49:27.770Z",
      "updatedAt": "2024-08-21T18:49:27.770Z"
    }
  ]
}
```

---

#### Get Category by ID

**GET** `/api/categories/:id`

**Description**: Retrieve a category by its ID.

**Example Request:**

```http
GET http://localhost:3000/api/categories/2
```

**Example Response:**

```json
{
  "success": true,
  "message": "Category fetched successfully",
  "data": {
    "id": 2,
    "name": "Automotive",
    "createdAt": "2024-08-21T18:49:27.770Z",
    "updatedAt": "2024-08-21T18:49:27.770Z",
    "products": [
      {
        "id": 16,
        "name": "Car Charger",
        "description": "Fast charging car charger",
        "price": "29.99",
        "stock": 10,
        "createdAt": "2024-08-21T18:49:27.774Z",
        "updatedAt": "2024-08-21T18:49:27.774Z",
        "categoryId": 2
      }
    ]
  }
}
```

---

#### Create a New Category

**POST** `/api/categories`

**Description**: Create a new category.

**Example Request:**

```http
POST http://localhost:3000/api/categories
Content-Type: application/json

{
  "name": "viande"
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": 26,
    "name": "viande",
    "createdAt": "2024-08-21T20:27:20.851Z",
    "updatedAt": "2024-08-21T20:27:20.851Z"
  }
}
```

---

### Orders

#### Get Order by ID

**GET** `/api/orders/:id`

**Description**: Retrieve an order by its ID.

**Example Request:**

```http
GET http://localhost:3000/api/orders/5
```

**Example Response:**

```json
{
  "success": true,
  "message": "Order found",
  "data": {
    "id": 5,
    "status": "shipped",
    "totalAmount": "4084.90",
    "createdAt": "2024-08-21T18:49:27.784Z",
    "updatedAt": "2024-08-21T18:49:27.784Z",
    "userId": 8,
    "user": {
      "id": 8,
      "username": "user6",
      "email": "user6@example.com"
    },
    "Products": [
      {
        "id": 21,
        "name": "Sunglasses",
        "description": "Polarized sunglasses",
        "price": "49.99",
        "stock": 10,
        "createdAt": "2024-08-21T18:49:27.774Z",
        "updatedAt": "2024-08-21T18:49:27.774Z",
        "categoryId": 8,
        "OrderProduct": {
          "quantity": 1
        }
      }
    ]
  }
}
```

---

#### Search Orders by User ID

**GET** `/api/orders?userId=:userId`

**Description**: Retrieve all orders placed by a specific user.

**Example Request:**

```http
GET http://localhost:3000/api/orders?userId=4
```

**Example Response:**

```json
{
  "success": true,
  "message": "Orders fetched successfully",
  "data": [
    {
      "id": 3,
      "status": "delivered",
      "totalAmount": "599.98",
      "createdAt": "2024-08-21T18:49:27.784Z",
      "updatedAt": "2024-08-21T18:49:27.784Z",
      "userId": 4,
      "user": {
        "id": 4,
        "username": "user2",
        "email": "user2@example.com"
      },
      "Products": [
        {
          "id": 22,
          "name": "E-reader",
          "description": "High resolution e-reader",
          "price": "149.99",
          "stock": 10,
          "createdAt": "2024-08-21T18:49:27.774Z",
          "updatedAt": "2024-08-21T18:49:27.774Z",
          "categoryId": 3,
          "OrderProduct": {
            "quantity": 1
          }
        }
      ]
    },
    {
      "id": 17,
      "status": "shipped",
      "totalAmount": "154.96",
      "createdAt": "2024-08-21T18:49:27.784Z",
      "updatedAt": "2024-08-21T18:49:27.784Z",
      "userId": 4,
      "user": {
        "id": 4,
        "username": "user2",
        "email": "user2@example.com"
      },
      "Products": [
        {
          "id": 24,
          "name": "Headphones",
          "description": "Noise cancelling headphones",
          "price": "129.99",
          "stock": 10,
          "createdAt": "2024-08-21T18:49:27.774Z",
          "updatedAt": "2024-08-21T18:49:27.774Z",
          "categoryId": 7,
          "OrderProduct": {
            "quantity": 1
          }
        }
      ]
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "totalCount": 2
}
```

---

#### Create a New Order

**POST** `/api/orders`

**Description**: Create a new order.

**Example Request:**

```http
POST http://localhost:3000/api/orders
Content-Type: application/json

{
  "userId": 1,
  "status": "pending",
  "products": [
    {
      "productId": 2,
      "quantity": 1
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 21,
    "status": "pending",
    "totalAmount": "34.98",
    "createdAt": "2024-08-21T20:31:11.406Z",
    "updatedAt": "2024-08-21T20:31:11.406Z",
    "userId": 1,
    "user": {
      "id": 1,
      "username": "kiboude",
      "email": "kiboude@example.com"
    },
    "Products": [
      {
        "id": 2,
        "name": "T-shirt",
        "description": "Comfortable cotton t-shirt",
        "price": "19.99",
        "stock

": 9,
        "createdAt": "2024-08-21T18:49:27.774Z",
        "updatedAt": "2024-08-21T20:31:11.414Z",
        "categoryId": 6,
        "OrderProduct": {
          "quantity": 1
        }
      },
      {
        "id": 3,
        "name": "Novel",
        "description": "Bestselling fiction novel",
        "price": "14.99",
        "stock": 9,
        "createdAt": "2024-08-21T18:49:27.774Z",
        "updatedAt": "2024-08-21T20:31:11.416Z",
        "categoryId": 3,
        "OrderProduct": {
          "quantity": 1
        }
      }
    ]
  }
}
```

---

#### Update an Order

**PATCH** `/api/orders/:id`

**Description**: Update an existing order by its ID.

**Example Request:**

```http
PATCH http://localhost:3000/api/orders/2
Content-Type: application/json

{
  "userId": 2,
  "status": "shipped",
  "products": [
    {
      "productId": 34,
      "quantity": 1
    }
  ]
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Order updated successfully",
  "data": {
    "id": 2,
    "status": "shipped",
    "totalAmount": "29.99",
    "createdAt": "2024-08-21T18:49:27.784Z",
    "updatedAt": "2024-08-21T20:32:31.199Z",
    "userId": 2,
    "user": {
      "id": 2,
      "username": "generalpepin",
      "email": "generalpepin@example.com"
    },
    "Products": [
      {
        "id": 28,
        "name": "Desk Lamp",
        "description": "Adjustable desk lamp",
        "price": "19.99",
        "stock": 10,
        "createdAt": "2024-08-21T18:49:27.774Z",
        "updatedAt": "2024-08-21T18:49:27.774Z",
        "categoryId": 13,
        "OrderProduct": {
          "quantity": 1
        }
      },
      {
        "id": 29,
        "name": "Running Shorts",
        "description": "Quick dry running shorts",
        "price": "24.99",
        "stock": 10,
        "createdAt": "2024-08-21T18:49:27.774Z",
        "updatedAt": "2024-08-21T18:49:27.774Z",
        "categoryId": 18,
        "OrderProduct": {
          "quantity": 1
        }
      },
      {
        "id": 34,
        "name": "Ceramic Vase",
        "description": "Handcrafted ceramic vase",
        "price": "29.99",
        "stock": 8,
        "createdAt": "2024-08-21T18:49:27.774Z",
        "updatedAt": "2024-08-21T20:32:31.197Z",
        "categoryId": 13,
        "OrderProduct": {
          "quantity": 1
        }
      }
    ]
  }
}
```

---

#### Delete an Order

**DELETE** `/api/orders/:id`

**Description**: Delete an order by its ID.

**Example Request:**

```http
DELETE http://localhost:3000/api/orders/2
```

**Example Response:**

```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

### Products

#### Get All Products

**GET** `/api/products`

**Description**: Retrieve all products.

**Example Request:**

```http
GET http://localhost:3000/api/products
```

**Example Response:**

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Smartphone",
      "description": "Latest model smartphone",
      "price": "999.99",
      "stock": 10,
      "createdAt": "2024-08-21T18:49:27.774Z",
      "updatedAt": "2024-08-21T18:49:27.774Z",
      "categoryId": 7
    },
    {
      "id": 4,
      "name": "Smartwatch",
      "description": "Latest model smartwatch",
      "price": "199.99",
      "stock": 10,
      "createdAt": "2024-08-21T18:49:27.774Z",
      "updatedAt": "2024-08-21T18:49:27.774Z",
      "categoryId": 24
    }
  ]
}
```

---

#### Search Products by Name

**GET** `/api/products/search?name=Smart`

**Description**: Retrieve products by their name.

**Example Request:**

```http
GET http://localhost:3000/api/products/search?name=Smart
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product found",
  "data": [
    {
      "id": 1,
      "name": "Smartphone",
      "description": "Latest model smartphone",
      "price": "999.99",
      "stock": 10,
      "createdAt": "2024-08-21T18:49:27.774Z",
      "updatedAt": "2024-08-21T18:49:27.774Z",
      "categoryId": 7
    },
    {
      "id": 4,
      "name": "Smartwatch",
      "description": "Latest model smartwatch",
      "price": "199.99",
      "stock": 10,
      "createdAt": "2024-08-21T18:49:27.774Z",
      "updatedAt": "2024-08-21T18:49:27.774Z",
      "categoryId": 24
    },
    {
      "id": 26,
      "name": "Smart Home Device",
      "description": "Voice controlled smart home device",
      "price": "79.99",
      "stock": 10,
      "createdAt": "2024-08-21T18:49:27.774Z",
      "updatedAt": "2024-08-21T18:49:27.774Z",
      "categoryId": 22
    }
  ]
}
```

---

#### Get Product by ID

**GET** `/api/products/:id`

**Description**: Retrieve a product by its ID.

**Example Request:**

```http
GET http://localhost:3000/api/products/2
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product found",
  "data": {
    "id": 2,
    "name": "T-shirt",
    "description": "Comfortable cotton t-shirt",
    "price": "19.99",
    "stock": 9,
    "createdAt": "2024-08-21T18:49:27.774Z",
    "updatedAt": "2024-08-21T20:31:11.414Z",
    "categoryId": 6
  }
}
```

---

#### Create a New Product

**POST** `/api/products`

**Description**: Create a new product.

**Example Request:**

```http
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Iphone",
  "description": "Iphone 6",
  "price": "350",
  "categoryId": 1
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "stock": 0,
    "id": 36,
    "name": "Iphone",
    "description": "Iphone 6",
    "price": "350.00",
    "categoryId": 1,
    "updatedAt": "2024-08-21T20:36:38.201Z",
    "createdAt": "2024-08-21T20:36:38.201Z"
  }
}
```

---

#### Update a Product

**PATCH** `/api/products/:id`

**Description**: Update an existing product by its ID.

**Example Request:**

```http
PATCH http://localhost:3000/api/products/4
Content-Type: application/json

{
  "name": "Iphone",
  "description": "Iphone 7",
  "price": "450",
  "categoryId": 1
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 4,
    "name": "Iphone",
    "description": "Iphone 7",
    "price": "450.00",
    "stock": 10,
    "createdAt": "2024-08-21T18:49:27.774Z",
    "updatedAt": "2024-08-21T20:37:25.054Z",
    "categoryId": 1
  }
}
```

---

#### Delete a Product

**DELETE** `/api/products/:id`

**Description**: Delete a product by its ID.

**Example Request:**

```http
DELETE http://localhost:3000/api/products/2
```

**Example Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### Users & Authentication

#### Register a New User

**POST** `/api/register`

**Description**: Register a new user.

**Example Request:**

```http
POST http://localhost:3000/api/register
Content-Type: application/json

{
  "username": "pepin3",
  "email": "pepin3@mail.com",
  "password": "Pepin3@legeneral"
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "User registered",
  "data": {
    "role": "user",
    "id": 10,
    "email": "pepin3@mail.com",
    "username": "pepin3",
    "updatedAt": "2024-08-21T20:38:29.529Z",
    "createdAt": "2024-08-21T20:38:29.529Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNDI3MjcwOSwiZXhwIjoxNzI0Mjc2MzA5fQ.9EOTh2oG2idvEnzRUkyrp9GNmdrm4hyWHyGTNunRJwQ"
}
```

---

#### Login User

**POST** `/api/login`

**Description**: Log in a user.

**Example Request:**

```http
POST http://localhost:3000/api/login
Content-Type: application/json

{
  "email": "kiboude@example.com",
  "password": "kiboudePassword123"
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "User logged in",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyNDI3Mjc5MiwiZXhwIjoxNzI0Mjc2MzkyfQ.ZfS1eXK0HYj6suZTQ8kkyOKIrg3ybx_G_K5l12sdr2M",
    "user": {
      "id": 1,
      "username": "kiboude",
      "email": "kiboude@example.com",
      "password": "$2b$10$MEuTcP4ztW/ae3UnFtcI2u4GgSdJ53g9M7eFajHaWgLy.yAO2uJA2",
      "role": "admin",
      "createdAt": "2024-08-21T18:49:27.702Z",
      "updatedAt": "2024-08-21T18:49:27.702Z"
    }
  }
}
```

---

#### Search Users by Username

**GET** `/api/users/name?username=:username`

**Description**: Search for users by username.

**Example Request:**

```http
GET http://localhost:3000/api/users/name?username=pepin
```

**Example Response:**

```json
{
  "success": true,
  "message": "Users found",
  "data": [
    {
      "id": 2,
      "username": "generalpepin",
      "email": "generalpepin@example.com",
      "role": "admin",
      "createdAt": "2024-08-21T18:49:27.702Z",
      "updatedAt": "2024-08-21T18:49:27.702Z"
    },
    {
      "id": 10,
      "username": "pepin3",
      "email": "pepin3@mail.com",
      "role": "user",
      "createdAt": "2024-08-21T20:38:29.529Z",
      "updatedAt": "2024-08-21T20:38:29.529Z"
    }
  ]
}
```
