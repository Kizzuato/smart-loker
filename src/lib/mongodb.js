// lib/mongodb.js
import mongoose from 'mongoose';
import "../app/models/index.ts";

const MONGODB_URI = "mongodb+srv://Kizzuato:Azazel03@kizzuato.7ptmhd7.mongodb.net/?retryWrites=true&w=majority&appName=Kizzuato";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;