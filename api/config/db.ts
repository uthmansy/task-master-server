import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    // Connect to MongoDB without 'useNewUrlParser' and 'useUnifiedTopology'
    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully");
  } catch (error: unknown) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error(`Mongo Error: ${error.message}`);
    } else {
      console.error(
        "Mongo Error: Unknown error occurred while connecting to MongoDB"
      );
    }
    process.exit(1); // Exit the process with an error code
  }
};

export default connectDB;
