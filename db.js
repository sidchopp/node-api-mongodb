import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGODB_URI;

let dbConnection;

export const connectToDb = async (cb) => {
  //cb is an argument - call back function that will be called after the connection is set or after we get an error
  try {
    const client = await MongoClient.connect(uri);
    dbConnection = client.db();
    return cb();
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

export const getDb = () => dbConnection;
