import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        '[mongodb] MongoDB URI not found in environment variables.',
      );
    }

    const connection = await mongoose.connect(mongoUri);
    console.log(`
    =================================================
                                                   
             [mongodb] MongoDB Connected           
      ${connection.connection.host}                
    =================================================
    `);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
