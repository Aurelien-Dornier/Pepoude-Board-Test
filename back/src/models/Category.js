import { Model, DataTypes } from "sequelize";

export class Category extends Model {
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
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "Categories",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
    });
    this.hasMany(models.Notification, {
      foreignKey: "categoryId",
      as: "notifications",
      onDelete: "CASCADE",
    });
  }
}
