
import { ObjectId } from "mongodb";
import db from "../setup/mongo.js";
import dayjs from "dayjs";

export const currencyHandler = async (req,res) => {
    
    const currency = res.locals.cleanData;
    const date = dayjs().format('DD/MM');
    const user = res.locals.user;

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
    const user = res.locals.user;
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
    const user = res.locals.user;
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