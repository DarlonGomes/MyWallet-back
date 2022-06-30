import client from "../setup/db.js";
import { moneySchema, editSchema } from "../setup/validation.js";
import { ObjectId } from "mongodb";

export const currencyHandler = async (req,res) => {
    
    const currency = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    await client.connect();
    const db = client.db('myWallet');

    const validation = moneySchema.validate(currency, {abortEarly: true});
    if(validation.error) return res.sendStatus(422);
    try {

        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await db.collection('records').findOne({_id: session.userId});

        if(user){
            await db.collection('account').insertOne({...currency, userId: session.userId});
            return res.sendStatus(201);
        }else{
            return res.sendStatus(422);
        }

    } catch (error) {
        res.sendStatus(500)
    }
}

export const userBalance = async (req,res) => {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    await client.connect();
    const db = client.db('myWallet');
    
    try {

        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await db.collection('records').findOne({_id: session.userId});

        if(user){
            const balance =  await db.collection('account').aggregate([{$match: { userId: session.userId }},{$group : {_id: "$userId", total: {$sum:"$value"}}}]).toArray();
            
            return res.send(balance[0]).status(200);
        }else{
            return res.sendStatus(422);
        }

    } catch (error) {
        res.sendStatus(500)
    }
}

export const editHandler = async (req,res) => {
    const data = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    await client.connect();
    const db = client.db('myWallet');

    const validation = editSchema.validate(data);
    if(validation.error) return res.sendStatus(422);

    try {
       
        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await db.collection('records').findOne({_id: session.userId});

        if(user){
            
            await db.collection('records').findOne({})
            
            return res.sendStatus(201);
        }else{
            return res.sendStatus(422);
        }

    } catch (error) {
        
    }



}

export const deleteHandler = async (req,res) => {

    const id = new ObjectId(req.body.id);
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    await client.connect();
    const db = client.db('myWallet');



    try {
       
        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await db.collection('records').findOne({_id: session.userId});

        if(user){
            
            await db.collection('account').deleteOne({_id: id})
            
            return res.sendStatus(200);
        }else{
            return res.sendStatus(422);
        }

    } catch (error) {
        
    }

}