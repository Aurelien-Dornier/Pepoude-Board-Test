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
    },
    {
      name: "T-shirt",
      description: "Comfortable cotton t-shirt",
      price: 19.99,
      categoryId: categories.find((c) => c.name === "Clothing")?.id,
    },
    {
      name: "Novel",
      description: "Bestselling fiction novel",
      price: 14.99,
      categoryId: categories.find((c) => c.name === "Books")?.id,
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
