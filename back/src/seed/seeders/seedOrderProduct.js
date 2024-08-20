import { models } from "../../models/index.js";

const { OrderProduct, Order, Product } = models;

export async function seedOrderProduct() {
  try {
    const orders = await Order.findAll();
    const products = await Product.findAll();

    if (orders.length === 0) {
      console.error("No orders found. Make sure to seed orders first.");
      return;
    }

    if (products.length === 0) {
      console.error("No products found. Make sure to seed products first.");
      return;
    }

    // Générer une quantité aléatoire de produits pour chaque commande
    for (const order of orders) {
      const orderProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 1);

      for (const product of orderProducts) {
        const quantity = Math.floor(Math.random() * 3) + 1;
        await OrderProduct.create({
          orderId: order.id,
          productId: product.id,
          quantity: quantity,
        });
      }
    }

    console.log(" ✅Order products seeded successfully");
  } catch (error) {
    console.error("Error in seedOrderProduct:", error);
  }
}
seedOrderProduct();
