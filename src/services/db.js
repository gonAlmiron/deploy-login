import mongoose from 'mongoose';
import Config from '../config';


export const initDb = () => {
mongoose.set('strictQuery', true);
  return mongoose.connect(Config.MONGO_ATLAS_URL);
  
}