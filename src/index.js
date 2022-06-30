import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { signIn, signUp } from './controllers/userController.js';
import { currencyHandler, deleteHandler, editHandler, userBalance } from './controllers/currencyController.js';
import { userReceipt } from './controllers/receiptController.js';

dotenv.config()

const server = express();
server.use(cors());
server.use(express.json());

server.post("/sign-up", signUp);
server.post("/sign-in", signIn);

server.get("/balance", userBalance);
server.get("/receipt", userReceipt);

server.post("/currency",currencyHandler);
server.delete("/currency", deleteHandler);
server.put("/currency",  editHandler);

server.listen(process.env.PORT, () => {console.log(`Tá rodando na rota ${process.env.PORT}`)});