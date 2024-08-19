import { DataTypes, Model } from "sequelize";

export class Message extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Message",
        tableName: "Messages",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  }
}
