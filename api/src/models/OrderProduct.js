import { Model, DataTypes } from "sequelize";

export class OrderProduct extends Model {
  static init(sequelize) {
    return super.init(
      {
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        modelName: "OrderProduct",
        tableName: "OrderProducts",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "orderId",
    });
    this.belongsTo(models.Product, {
      foreignKey: "productId",
    });
  }
}
