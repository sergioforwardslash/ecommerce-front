import sequelize from "@/lib/dbConnection";
import { DataTypes } from "sequelize";

const Setting = sequelize.define(
  "Settings",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Setting;
