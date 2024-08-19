import { models } from "../../models/index.js";

const { Order, User } = models;

export async function seedOrders(products) {
  if (!products || products.length === 0) {
    console.error("No products provided. Make sure to seed products first.");
    return;
  }

  const users = await User.findAll();

  const orders = [
    {
      status: "pending",
      totalAmount: 1034.97,
      userId: users.find((u) => u.username === "user1").id,
    },
    {
      status: "processing",
      totalAmount: 19.99,
      userId: users.find((u) => u.username === "user2").id,
    },
  ];

  try {
    const createdOrders = await Order.bulkCreate(orders);

    // Ajout des produits aux commandes
    await createdOrders[0].addProducts([products[0], products[2]]);
    await createdOrders[1].addProducts([products[1]]);

    console.log(" ✅ Orders seeded successfully");
  } catch (error) {
    console.error("Error seeding orders:", error);
    throw error;
  }
}
