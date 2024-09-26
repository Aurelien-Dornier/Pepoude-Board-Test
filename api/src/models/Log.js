import { Model, DataTypes } from "sequelize";

export class Log extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        action: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        details: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "Log",
        tableName: "Logs",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
