import { models } from "../../models/index.js";

const { Order, User, Product } = models;

export async function seedOrders() {
  try {
    const users = await User.findAll();
    const products = await Product.findAll();

    if (users.length === 0) {
      console.error("No users found. Make sure to seed users first.");
      return;
    }

    if (products.length === 0) {
      console.error("No products found. Make sure to seed products first.");
      return;
    }

    const orders = [];

    // Créer 20 commandes aléatoires
    for (let i = 0; i < 20; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const orderProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 1);

      const totalAmount = orderProducts.reduce((sum, product) => {
        const quantity = Math.floor(Math.random() * 3) + 1;
        return sum + product.price * quantity;
      }, 0);

      orders.push({
        status: ["pending", "processing", "shipped", "delivered"][Math.floor(Math.random() * 4)],
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        userId: user.id,
      });
    }

    const createdOrders = await Order.bulkCreate(orders);

    // Ajouter des produits à chaque commande
    for (const order of createdOrders) {
      const orderProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 1);

      const productAssociations = orderProducts.map((product) => ({
        productId: product.id,
        quantity: Math.floor(Math.random() * 3) + 1,
      }));

      await order.addProducts(
        productAssociations.map((pa) => pa.productId),
        {
          through: productAssociations,
        }
      );
    }

    console.log(" ✅ Orders seeded successfully");
    return createdOrders;
  } catch (error) {
    console.error("Error seeding orders:", error);
    throw error;
  }
}
