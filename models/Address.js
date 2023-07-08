import { DataTypes } from "sequelize";
import sequelize from "@/lib/dbConnection"; // assuming you have a db.js file that sets up and exports a sequelize instance

const Address = sequelize.define(
  "Address",
  {
    userEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

export default Address;
