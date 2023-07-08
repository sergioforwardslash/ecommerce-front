import { DataTypes } from 'sequelize';
import sequelize from '@/lib/dbConnection';
import Product from '@/models/Product'; // assuming you have a Product.js file exporting the Product model

const WishedProduct = sequelize.define('WishedProduct', {
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    references: {
      model: Product,
      key: 'id',
    },
  },
}, {
  timestamps: false,
  paranoid: false,
});

Product.hasMany(WishedProduct, { foreignKey: 'productId' });
WishedProduct.belongsTo(Product, { foreignKey: 'productId' });

module.exports = WishedProduct;
