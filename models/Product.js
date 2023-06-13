import sequelize from "@/lib/dbConnection";
import { DataTypes } from "sequelize";
import Category from "./Category";

const Product = sequelize.define(
  "Product",
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
        model: "Category",
        key: "id",
      },
    },
    properties: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Product.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Product;
