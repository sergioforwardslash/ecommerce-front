const sequelize = require("@/lib/dbConnection");
import { DataTypes } from "sequelize";

const Order = sequelize.define(
  "Order",
  {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    line_items: {
      type: DataTypes.JSON,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    paid: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order;
