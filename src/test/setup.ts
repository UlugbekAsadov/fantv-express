import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export const connect = async () => {
  const uri = process.env.TEST_BASE_URL;

  if (!uri) {
    throw Error('Missing TEST_BASE_URL environment variable');
  }

  await mongoose.connect(uri).catch((err) => console.log({ err }));
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
