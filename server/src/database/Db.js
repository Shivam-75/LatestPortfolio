import mongoose from "mongoose";

const Db = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("📡 Database Connected:", conn.connection.host);
    return conn;
  } catch (err) {
    console.error("❌ Database Error:", err.message);
    throw err;
  }
};

export default Db;