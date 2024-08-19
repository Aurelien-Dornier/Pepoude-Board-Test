import { seedUsers } from "./seeders/seedUsers.js";
import { seedProducts } from "./seeders/seedProducts.js";
import { seedOrders } from "./seeders/seedOrders.js";
import { seedMessages } from "./seeders/seedMessages.js";
import { seedLogs } from "./seeders/seedLogs.js";
import { seedCategories } from "./seeders/seedCategory.js";

export async function seedDataBase() {
  console.log("🌱 Seeding database...");
  try {
    await seedUsers();
    const categories = await seedCategories();
    await seedProducts(categories);
    await seedOrders();
    await seedMessages();
    await seedLogs();
    console.log("🌱 Database seeded successfully");
  } catch (error) {
    console.error("🚨 Error seeding database:", error);
  }
}

seedDataBase();
