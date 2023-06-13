import sequelize from "@/lib/dbConnection";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parntId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Category",
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

Category.belongsTo(Category, { foreignKey: "parent" });

module.exports = Category;
