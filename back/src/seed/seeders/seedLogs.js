import { models } from "../../models/index.js";

const { Log, User } = models;

export async function seedLogs() {
  const users = await User.findAll();

  const logs = [
    {
      action: "User Login",
      details: "User logged in successfully",
      userId: users.find((u) => u.username === "user1").id,
    },
    {
      action: "Order Created",
      details: "New order placed",
      userId: users.find((u) => u.username === "user2").id,
    },
  ];

  await Log.bulkCreate(logs);
  console.log(" ✅Logs seeded successfully");
}
