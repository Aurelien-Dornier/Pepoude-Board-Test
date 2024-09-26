import { Model, DataTypes } from "sequelize";

export class Order extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        status: {
          type: DataTypes.ENUM("pending", "processing", "shipped", "delivered"),
          defaultValue: "pending",
        },
        totalAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "Orders",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId",
    });
  }
}
