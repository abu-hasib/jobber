import mongoose from "mongoose";

import User from "../users/user.model";
import Message from "./message";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Message };

export { connectDb };

export default models;
