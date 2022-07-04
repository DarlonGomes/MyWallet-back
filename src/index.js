import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userHandler from './routes/userRoute.js';
import walletHandler from './routes/walletRoute.js';

dotenv.config()

const server = express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
server.use(express.json());

server.use("/user", userHandler);

server.use("/wallet", walletHandler);

server.listen(process.env.PORT);