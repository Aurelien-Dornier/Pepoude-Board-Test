import { models } from "../../models/index.js";

const { Category } = models;

export const seedCategories = async () => {
  try {
    const categories = await Category.bulkCreate([
      { name: "Electronics" },
      { name: "Clothing" },
      { name: "Books" },
    ]);
    console.log(" ✅ Categories seeded successfully");
    return categories;
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
};
