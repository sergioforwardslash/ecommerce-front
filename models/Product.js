import sequelize from "@/lib/dbConnection";
import { DataTypes } from "sequelize";
import Category from "./Category";

const Product = sequelize.define(
  "Products",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    properties: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "Products",
    timestamps: true,
  }
);

Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

module.exports = Product;
