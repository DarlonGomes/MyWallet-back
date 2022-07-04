import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userHandler from './routes/userRoute.js';
import walletHandler from './routes/walletRoute.js';

dotenv.config()

const server = express();

server.use(cors({
    origin: "https://my-wallet-cochi.vercel.app"
}));
server.use(express.json());

server.use("/user", userHandler);

server.use("/wallet", walletHandler);

server.listen(process.env.PORT);