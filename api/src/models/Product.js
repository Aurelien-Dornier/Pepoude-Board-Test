import { DataTypes, Model } from "sequelize";

export class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "Products",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
    this.belongsToMany(models.Order, {
      through: models.OrderProduct,
      as: "orders",
      foreignKey: "productId",
      otherKey: "orderId",
    });
    this.hasMany(models.Notification, {
      foreignKey: "productId",
      as: "notifications",
      onDelete: "CASCADE",
    });
  }
}
