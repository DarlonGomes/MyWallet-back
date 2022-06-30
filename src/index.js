import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userHandler from './routes/userRoute.js';
import walletHandler from './routes/walletRoute.js';

dotenv.config()

const server = express();

server.use(cors());
server.use(express.json());

server.use("/user", userHandler);

server.use("/wallet", walletHandler)

server.listen(process.env.PORT, () => {console.log(`Tá rodando na rota ${process.env.PORT}`)});