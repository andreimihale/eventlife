import mongoos from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoos.connect(MONGODB_URI, {
      dbName: "eventlife",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
