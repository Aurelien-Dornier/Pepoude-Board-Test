import { DataTypes, Model } from "sequelize";

export class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM(
            "product-added",
            "product-updated",
            "product-deleted",
            "category-added",
            "category-updated",
            "category-deleted"
          ),
          allowNull: false,
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Notification",
        tableName: "notifications",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "createdBy",
    });
    this.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
    this.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  }
}
