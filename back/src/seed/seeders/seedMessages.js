import { models } from "../../models/index.js";

const { Message, User } = models;

export async function seedMessages() {
  const users = await User.findAll();

  const messages = [
    {
      content: "Welcome to our platform!",
      isRead: false,
      userId: users.find((u) => u.username === "user1").id,
    },
    {
      content: "Your order has been processed.",
      isRead: true,
      userId: users.find((u) => u.username === "user2").id,
    },
  ];

  await Message.bulkCreate(messages);
  console.log(" ✅Messages seeded successfully");
}
