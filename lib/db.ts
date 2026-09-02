import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.__mongooseCache ?? { conn: null, promise: null };
if (process.env.NODE_ENV !== "production") {
  global.__mongooseCache = cache;
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined. Add it to your .env file.");
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      // Fail fast so the DEFAULT_CONTENT fallback kicks in quickly when the
      // database is unreachable (e.g. during local dev without MongoDB).
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}