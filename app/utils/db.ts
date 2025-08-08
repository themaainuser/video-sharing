/* eslint-disable */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Invalid/Missing environment variable: 'MONGODB_URI'")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        mongoose
            .connect(MONGODB_URI)
            .then(() => {
                mongoose.connection;
            })
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        console.log(error)
    }
    return cached.conn;
}