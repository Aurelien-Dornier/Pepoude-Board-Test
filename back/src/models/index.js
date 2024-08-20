import { User } from "./User.js";
import { Order } from "./Order.js";
import { Product } from "./Product.js";
import { OrderProduct } from "./OrderProduct.js";
import { Category } from "./Category.js";
import { Log } from "./Log.js";
import { Message } from "./Message.js";
import { sequelize } from "./dbClient.js";

export const models = {
  User: User.init(sequelize),
  Category: Category.init(sequelize),
  Order: Order.init(sequelize),
  Product: Product.init(sequelize),
  Message: Message.init(sequelize),
  OrderProduct: OrderProduct.init(sequelize),
  Log: Log.init(sequelize),
};
// Associations si elles existent
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

export { sequelize };
