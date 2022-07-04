
import { ObjectId } from "mongodb";
import db from "../setup/mongo.js";
import dayjs from "dayjs";

export const currencyHandler = async (req,res) => {
    
    const currency = res.locals.cleanData;
    const date = dayjs().format('DD/MM');
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token) return res.sendStatus(401);

    const session = await db.collection('tokens').findOne({token});

    if(!session) return res.sendStatus(401);
    const user = await db.collection('records').findOne({_id: session.userId});

    try {

        if(user){
            await db.collection('account').insertOne({...currency, userId: user._id, date: date});
            return res.sendStatus(201);
        }else{
            return res.sendStatus(422);
        }

    } catch (error) {
        res.sendStatus(500);
    }
}


export const editHandler = async (req,res) => {

    const { id, text, value } = res.locals.cleanData;

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token) return res.sendStatus(401);

    const session = await db.collection('tokens').findOne({token});

    if(!session) return res.sendStatus(401);
    const user = await db.collection('records').findOne({_id: session.userId});
    try {
        
        const dataExist = await db.collection('account').findOne({_id: ObjectId(id), userId: user._id})

    
        if(user && dataExist){
        
            await db.collection('account').updateOne(
                {_id: ObjectId(id)},
                {
                $set:{text, value}
                }
                );
            return res.sendStatus(201);   
            
        }
        else{
            return res.sendStatus(422);
        }
    }catch (error) {
        return res.sendStatus(500);
    }

}

export const deleteHandler = async (req,res) => {

    const id = new ObjectId(req.params.itemID);
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token) return res.sendStatus(401);

    const session = await db.collection('tokens').findOne({token});

    if(!session) return res.sendStatus(401);
    const user = await db.collection('records').findOne({_id: session.userId});
    try {
        if(user){
            
            await db.collection('account').deleteOne({_id: id})
            
            return res.sendStatus(200);
        }else{
            return res.sendStatus(422);
        }

    } catch (error) {
        return res.sendStatus(500);
    }

}