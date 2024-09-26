import { models } from "../../models/index.js";
import bcrypt from "bcrypt";

const { User } = models;
export async function seedUsers() {
  const users = [
    {
      username: "kiboude",
      email: "kiboude@example.com",
      password: await bcrypt.hash("kiboudePassword123", 10),
      role: "admin",
    },
    {
      username: "generalpepin",
      email: "generalpepin@example.com",
      password: await bcrypt.hash("generalpepinPassword123", 10),
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
    {
      username: "user3",
      email: "user3@example.com",
      password: await bcrypt.hash("userPassword789", 10),
      role: "user",
    },
    {
      username: "user4",
      email: "user4@example.com",
      password: await bcrypt.hash("userPassword1011", 10),
      role: "user",
    },
    {
      username: "user5",
      email: "user5@example.com",
      password: await bcrypt.hash("userPassword1213", 10),
      role: "user",
    },
    {
      username: "user6",
      email: "user6@example.com",
      password: await bcrypt.hash("userPassword1415", 10),
      role: "user",
    },
    {
      username: "user7",
      email: "user7@example.com",
      password: await bcrypt.hash("userPassword1617", 10),
      role: "user",
    },
  ];

  await User.bulkCreate(users);
  console.log(" ✅Users seeded successfully");
}
