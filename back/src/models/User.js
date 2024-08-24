import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

export class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [3, 40],
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [12, 100],
          },
        },
        role: {
          type: DataTypes.ENUM("admin", "user"),
          defaultValue: "user",
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: true,
        hooks: {
          beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
          },
          beforeUpdate: async (user) => {
            if (user.changed("password")) {
              user.password = await User.hashPassword(user.password);
            }
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Message, {
      foreignKey: "userId",
      as: "messages",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Order, {
      foreignKey: "userId",
      as: "orders",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Log, {
      foreignKey: "userId",
      as: "logs",
      onDelete: "CASCADE",
    });
    this.hasMany(models.Notification, {
      foreignKey: "createdBy",
      as: "notifications",
      onDelete: "CASCADE",
    });
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}
