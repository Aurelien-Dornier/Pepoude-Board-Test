import { models } from "../../models/index.js";
import bcrypt from "bcrypt";

const { User } = models;
export async function seedUsers() {
  const users = [
    {
      username: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("adminPassword123", 10),
      role: "admin",
    },
    {
      username: "user1",
      email: "user1@example.com",
      password: await bcrypt.hash("userPassword123", 10),
      role: "user",
    },
    {
      username: "user2",
      email: "user2@example.com",
      password: await bcrypt.hash("userPassword456", 10),
      role: "user",
    },
  ];

  await User.bulkCreate(users);
  console.log(" ✅Users seeded successfully");
}
