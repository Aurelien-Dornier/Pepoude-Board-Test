import { models } from "../../models/index.js";

const { Category } = models;

export const seedCategories = async () => {
  try {
    const categories = await Category.bulkCreate([
      { name: "Art" },
      { name: "Automotive" },
      { name: "Books" },
      { name: "Beauty" },
      { name: "Books" },
      { name: "Clothing" },
      { name: "Electronics" },
      { name: "Fashion" },
      { name: "Furniture" },
      { name: "Fitness" },
      { name: "Gaming" },
      { name: "Health" },
      { name: "Home" },
      { name: "Jewelry" },
      { name: "Music" },
      { name: "Outdoors" },
      { name: "Pet" },
      { name: "Sports" },
      { name: "Shoes" },
      { name: "Toys" },
      { name: "Travel" },
      { name: "Technology" },
      { name: "Travel" },
      { name: "Watches" },
    ]);
    console.log(" ✅ Categories seeded successfully");
    return categories;
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
};
