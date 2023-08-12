import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
if(!uri) throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')

let cached = global as typeof globalThis & {
    mongoose: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

if (!cached.mongoose) {
    cached.mongoose = {
        conn: null,
        promise: null
    }
}

const dbConnect = async () => {

    if (cached.mongoose.conn) {
        return cached.mongoose.conn
    }

    if (!cached.mongoose.promise) {
        cached.mongoose.promise = mongoose.connect(uri, { bufferCommands: false })
    } 

    try {
        cached.mongoose.conn = await cached.mongoose.promise
    } catch (err) {
        cached.mongoose.promise = null
        throw new Error('Error connecting to database')
    }

    return cached.mongoose.conn
    
}

export default dbConnect