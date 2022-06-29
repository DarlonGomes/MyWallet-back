import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

 async function connectDb(){
    let db;
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db('myWallet');

    return db
}

export default connectDb;