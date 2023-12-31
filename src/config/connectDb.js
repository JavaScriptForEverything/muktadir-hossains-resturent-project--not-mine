import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
