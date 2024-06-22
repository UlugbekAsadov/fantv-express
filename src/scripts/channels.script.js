import mongoose from 'mongoose';
import { databaseConnection } from '../configs/db.config';
import { ChannelModel } from '../models/channel.model';

const updateChannels = async () => {
  try {
    databaseConnection();
    const randomNumber = Math.floor(Math.random() * 2000);
    await ChannelModel.updateMany({ followers: { $exist: false } }, { $set: { followers: randomNumber } });
    console.log('All channels have been updated.');

    mongoose.disconnect();
  } catch (error) {
    console.log(error);
    console.log('Failed to update channels.');

    mongoose.disconnect();
  }
};

updateChannels();
