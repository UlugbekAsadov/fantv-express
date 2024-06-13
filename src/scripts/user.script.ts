import mongoose from 'mongoose';
import { UserModel } from '../models/user.model';
import { databaseConnection } from '../configs/db.config';

export const updateUsers = async () => {
  try {
    databaseConnection();

    // Update all users to set default values for new fields
    await UserModel.updateMany({}, { $set: { followers: 0, price: 0 } });

    console.log('All users have been updated.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating users:', error);
    mongoose.disconnect();
  }
};
