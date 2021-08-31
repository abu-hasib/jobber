import mongoose from "mongoose";

import User from "../users/user.model";
import Job from "../jobs/job.model";
import Profile from "../profiles/profile.model";

import Message from "./message";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Message, Job, Profile };

export { connectDb };

export default models;
