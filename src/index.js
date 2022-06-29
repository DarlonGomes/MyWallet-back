import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { signIn, signUp } from "../src/fnc/auth.js"
dotenv.config()

const server = express();
server.use(cors());
server.use(express.json());

server.post("/sign-up", (req,res) => signUp(req,res));
server.post("/sign-in", (req,res) => signIn(req,res));
server.get("/receipt", (req,res) => (req,res));
server.post("/income", (req,res) => (req,res));
server.post("/spent", (req,res) => (req,res));
server.delete("/receipt", (req,res) => (req,res));
server.put("/receipt", (req,res) => (req,res));

server.listen(process.env.PORT, () => {console.log(`Tá rodando na rota ${process.env.PORT}`)});