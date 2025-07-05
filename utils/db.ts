import mongoose from "mongoose";
import { cache } from "react";

const MOONGODB_URI = process.env.MOONGODB_URI!

if (!MOONGODB_URI) {
    throw new Error("Invalid/Missing environment variable: 'MOONGODB_URI'")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDatabase () {
    if (cached.conn){
        return cached.conn;
    }
    if (!cached.promise){
         mongoose
         .connect(MOONGODB_URI)
         .then(()=> {
            mongoose.connection;
        })
    }
    try{
        cached.conn = await cached.promise
    }catch(error){
        cached.promise = null;
        console.log(error)
    }
    return cached.conn;

}