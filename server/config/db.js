const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const hasValidMongoUri = (uri) => /^mongodb(\+srv)?:\/\//.test(uri || "");

// Connects to MongoDB Atlas using the connection string in .env
const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!hasValidMongoUri(mongoUri)) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("MONGO_URI must start with mongodb:// or mongodb+srv://");
      }

      memoryServer = await MongoMemoryServer.create();
      mongoUri = memoryServer.getUri();
      console.log("Using in-memory MongoDB for local development");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};

module.exports = connectDB;
module.exports.disconnectDB = disconnectDB;
