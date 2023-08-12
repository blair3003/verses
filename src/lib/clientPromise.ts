import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if(!uri) throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')

let client: MongoClient
let clientPromise: Promise<MongoClient>
let mongo = global as typeof globalThis & {
    promise?: Promise<MongoClient>
}

if (process.env.NODE_ENV === 'development') {

    if (!mongo.promise) {
        client = new MongoClient(uri)
        mongo.promise = client.connect()
    }
    clientPromise = mongo.promise

} else {

    client = new MongoClient(uri)
    clientPromise = client.connect()
}

export default clientPromise