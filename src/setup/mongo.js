import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

let db;
const MONGO_URI = process.env.MONGO_TEST;
const client = new MongoClient(MONGO_URI);
await client.connect();
db = client.db('myWallet');

export default db;