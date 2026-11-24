import mongoose from 'mongoose';

export const connectDB = async () => {
  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/projx';

  // Sanitize URI if angle brackets were left around the password
  uri = uri.replace(/:(<)([^@>]+)(>)(@)/, ':$2$4');

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB`);
    console.error(`Reason: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
