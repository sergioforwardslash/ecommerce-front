import { DataTypes } from 'sequelize';
import sequelize from '@/lib/dbConnection';

const Review = sequelize.define('Review', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  stars: DataTypes.INTEGER,
  product: DataTypes.UUID, // assuming that this is a UUID
}, {
  timestamps: true, // enables createdAt and updatedAt, but not deletedAt
  paranoid: false, // ensures that the deletedAt column will not be used
});

export default Review;
