import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const client = new MongoClient(process.env.DB);
let db

async function connectDB() {
    try {
        await client.connect();
        db = client.db('elementro')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
}

export { connectDB, db }
