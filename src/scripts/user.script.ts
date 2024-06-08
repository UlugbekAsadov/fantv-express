import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { connectDb } from '../configs/db.config';

export const updateUsers = async () => {
  try {
    await connectDb();

    // Update all users to set default values for new fields
    await User.updateMany({}, { $set: { followers: 0, price: 0 } });

    console.log('All users have been updated.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating users:', error);
    mongoose.disconnect();
  }
};
