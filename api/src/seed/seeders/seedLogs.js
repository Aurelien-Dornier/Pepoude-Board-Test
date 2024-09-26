import { models } from "../../models/index.js";
import { faker } from "@faker-js/faker";

const { Log, User, Product, Order } = models;

export async function seedLogs() {
  try {
    const users = await User.findAll();
    const products = await Product.findAll();
    const orders = await Order.findAll();

    const logs = [];

    // Logs pour les connexions utilisateurs
    for (const user of users) {
      logs.push({
        action: "User Login",
        details: `User ${user.username} logged in successfully`,
        userId: user.id,
        createdAt: faker.date.recent({ days: 30 }),
      });
    }

    // Logs pour les créations de commandes
    for (const order of orders) {
      logs.push({
        action: "Order Created",
        details: `New order #${order.id} placed for $${order.totalAmount}`,
        userId: order.userId,
        createdAt: order.createdAt,
      });
    }

    // Logs pour les mises à jour de statut des commandes
    for (const order of orders) {
      logs.push({
        action: "Order Status Updated",
        details: `Order #${order.id} status changed to ${order.status}`,
        userId: order.userId,
        createdAt: faker.date.between({ from: order.createdAt, to: new Date() }),
      });
    }

    // Logs pour les mises à jour de produits
    for (let i = 0; i < 10; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      logs.push({
        action: "Product Updated",
        details: `Product ${product.name} (ID: ${product.id}) details updated`,
        userId: user.id,
        createdAt: faker.date.recent({ days: 60 }),
      });
    }

    // Logs pour les erreurs de connexion
    for (let i = 0; i < 5; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      logs.push({
        action: "Login Failure",
        details: `Failed login attempt for user ${user.username}`,
        userId: user.id,
        createdAt: faker.date.recent({ days: 30 }),
      });
    }

    // Logs pour les changements de mot de passe
    for (let i = 0; i < 3; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      logs.push({
        action: "Password Changed",
        details: `User ${user.username} changed their password`,
        userId: user.id,
        createdAt: faker.date.recent({ days: 90 }),
      });
    }

    await Log.bulkCreate(logs);
    console.log(` ✅ ${logs.length} Logs seeded successfully`);
  } catch (error) {
    console.error("Error seeding logs:", error);
    throw error;
  }
}
