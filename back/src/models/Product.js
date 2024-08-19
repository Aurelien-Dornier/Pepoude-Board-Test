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
      through: "OrderProduct",
      as: "orders",
      foreignKey: "productId",
    });
  }
}
