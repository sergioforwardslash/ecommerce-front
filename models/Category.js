import sequelize from "@/lib/dbConnection";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  "Categories",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    properties: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {}
);

Category.belongsTo(Category, { foreignKey: "parentId", as: "parentCategory" });

module.exports = Category;
