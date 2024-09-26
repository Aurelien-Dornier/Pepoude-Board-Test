import { models } from "../../models/index.js";

const { Product } = models;

export async function seedProducts(categories) {
  if (!categories || categories.length === 0) {
    console.error("No categories provided. Make sure to seed categories first.");
    return [];
  }

  const products = [
    {
      name: "Smartphone",
      description: "Latest model smartphone",
      price: 999.99,
      categoryId: categories.find((c) => c.name === "Electronics")?.id,
      stock: 10,
    },
    {
      name: "T-shirt",
      description: "Comfortable cotton t-shirt",
      price: 19.99,
      categoryId: categories.find((c) => c.name === "Clothing")?.id,
      stock: 10,
    },
    {
      name: "Novel",
      description: "Bestselling fiction novel",
      price: 14.99,
      categoryId: categories.find((c) => c.name === "Books")?.id,
      stock: 10,
    },
    {
      name: "Smartwatch",
      description: "Latest model smartwatch",
      price: 199.99,
      categoryId: categories.find((c) => c.name === "Watches")?.id,
      stock: 10,
    },
    {
      name: "ACDC Dvd",
      description: "ACDC Dvd",
      price: 199.99,
      categoryId: categories.find((c) => c.name === "Music")?.id,
      stock: 10,
    },
    {
      name: "Laptop",
      description: "High performance laptop",
      price: 1299.99,
      categoryId: categories.find((c) => c.name === "Electronics")?.id,
      stock: 10,
    },
    {
      name: "Jeans",
      description: "Classic blue jeans",
      price: 39.99,
      categoryId: categories.find((c) => c.name === "Clothing")?.id,
      stock: 10,
    },
    {
      name: "Cookbook",
      description: "Bestselling cookbook",
      price: 24.99,
      categoryId: categories.find((c) => c.name === "Books")?.id,
      stock: 10,
    },
    {
      name: "Fitness Tracker",
      description: "Latest model fitness tracker",
      price: 99.99,
      categoryId: categories.find((c) => c.name === "Sports")?.id,
      stock: 10,
    },
    {
      name: "Guitar",
      description: "Acoustic guitar",
      price: 299.99,
      categoryId: categories.find((c) => c.name === "Music")?.id,
      stock: 10,
    },
    {
      name: "Dog Toy",
      description: "Interactive dog toy",
      price: 9.99,
      categoryId: categories.find((c) => c.name === "Pet")?.id,
      stock: 10,
    },
    {
      name: "Sneakers",
      description: "Running sneakers",
      price: 79.99,
      categoryId: categories.find((c) => c.name === "Shoes")?.id,
      stock: 10,
    },
    {
      name: "Dive Watch",
      description: "Professional dive watch",
      price: 499.99,
      categoryId: categories.find((c) => c.name === "Watches")?.id,
      stock: 10,
    },
    {
      name: "Travel Pillow",
      description: "Memory foam travel pillow",
      price: 19.99,
      categoryId: categories.find((c) => c.name === "Travel")?.id,
      stock: 10,
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable bluetooth speaker",
      price: 59.99,
      categoryId: categories.find((c) => c.name === "Technology")?.id,
      stock: 10,
    },
    {
      name: "Car Charger",
      description: "Fast charging car charger",
      price: 29.99,
      categoryId: categories.find((c) => c.name === "Automotive")?.id,
      stock: 10,
    },
    {
      name: "Protein Powder",
      description: "Whey protein powder",
      price: 39.99,
      categoryId: categories.find((c) => c.name === "Health")?.id,
      stock: 10,
    },
    {
      name: "Diamond Ring",
      description: "1 carat diamond ring",
      price: 4999.99,
      categoryId: categories.find((c) => c.name === "Jewelry")?.id,
      stock: 10,
    },
    {
      name: "Cat Food",
      description: "Premium cat food",
      price: 14.99,
      categoryId: categories.find((c) => c.name === "Pet")?.id,
      stock: 10,
    },
    {
      name: "Hiking Boots",
      description: "Waterproof hiking boots",
      price: 89.99,
      categoryId: categories.find((c) => c.name === "Sports")?.id,
      stock: 10,
    },
    {
      name: "Sunglasses",
      description: "Polarized sunglasses",
      price: 49.99,
      categoryId: categories.find((c) => c.name === "Fashion")?.id,
      stock: 10,
    },
    {
      name: "E-reader",
      description: "High resolution e-reader",
      price: 149.99,
      categoryId: categories.find((c) => c.name === "Books")?.id,
      stock: 10,
    },
    {
      name: "Yoga Mat",
      description: "Eco-friendly yoga mat",
      price: 29.99,
      categoryId: categories.find((c) => c.name === "Health")?.id,
      stock: 10,
    },
    {
      name: "Headphones",
      description: "Noise cancelling headphones",
      price: 129.99,
      categoryId: categories.find((c) => c.name === "Electronics")?.id,
      stock: 10,
    },
    {
      name: "Backpack",
      description: "Water resistant backpack",
      price: 49.99,
      categoryId: categories.find((c) => c.name === "Travel")?.id,
      stock: 10,
    },
    {
      name: "Smart Home Device",
      description: "Voice controlled smart home device",
      price: 79.99,
      categoryId: categories.find((c) => c.name === "Technology")?.id,
      stock: 10,
    },
    {
      name: "Gaming Mouse",
      description: "High precision gaming mouse",
      price: 39.99,
      categoryId: categories.find((c) => c.name === "Gaming")?.id,
      stock: 10,
    },
    {
      name: "Desk Lamp",
      description: "Adjustable desk lamp",
      price: 19.99,
      categoryId: categories.find((c) => c.name === "Home")?.id,
      stock: 10,
    },
    {
      name: "Running Shorts",
      description: "Quick dry running shorts",
      price: 24.99,
      categoryId: categories.find((c) => c.name === "Sports")?.id,
      stock: 10,
    },
    {
      name: "Tea Set",
      description: "Porcelain tea set",
      price: 39.99,
      categoryId: categories.find((c) => c.name === "Home")?.id,
      stock: 10,
    },
    {
      name: "Camping Tent",
      description: "4 person camping tent",
      price: 149.99,
      categoryId: categories.find((c) => c.name === "Outdoors")?.id,
      stock: 10,
    },
    {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 19.99,
      categoryId: categories.find((c) => c.name === "Technology")?.id,
      stock: 10,
    },
    {
      name: "Dumbbell Set",
      description: "Adjustable dumbbell set",
      price: 99.99,
      categoryId: categories.find((c) => c.name === "Fitness")?.id,
      stock: 10,
    },
    {
      name: "Ceramic Vase",
      description: "Handcrafted ceramic vase",
      price: 29.99,
      categoryId: categories.find((c) => c.name === "Home")?.id,
      stock: 10,
    },
    {
      name: "Puzzle",
      description: "1000 piece jigsaw puzzle",
      price: 19.99,
      categoryId: categories.find((c) => c.name === "Toys")?.id,
      stock: 10,
    },
  ];

  const validProducts = products.filter((p) => p.categoryId);

  if (validProducts.length === 0) {
    console.error("No valid products to seed. Check category names.");
    return [];
  }

  try {
    const createdProducts = await Product.bulkCreate(validProducts);
    console.log(" ✅ Products seeded successfully");
    return createdProducts;
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}
