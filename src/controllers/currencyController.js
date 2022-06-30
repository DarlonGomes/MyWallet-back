import { currencySchema, editCurrencySchema } from "../setup/validation.js";
import { ObjectId } from "mongodb";
import { clearData } from "../setup/sanitization.js";
import db from "../setup/mongo.js";
import dayjs from "dayjs";

export const currencyHandler = async (req,res) => {
    
    const currency = clearData(req.body);
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const date = dayjs().format('DD/MM');

    const validation = currencySchema.validate(currency, {abortEarly: true});
    if(validation.error) return res.sendStatus(422);
    try {

        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await db.collection('records').findOne({_id: session.userId});

        if(user){
            await db.collection('account').insertOne({...currency, userId: session.userId, date: date});
            return res.sendStatus(201);
        }else{
            return res.sendStatus(422);
        }

    } catch (error) {
        res.sendStatus(500)
    }
}


export const editHandler = async (req,res) => {

    const { id, text, value } = clearData(req.body);
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    const validation = editCurrencySchema.validate({text, value, id});
    if(validation.error) return res.sendStatus(422);

    try {
        
        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);


        const user = await db.collection('records').findOne({_id: session.userId});
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
        return res.sendStatus(500)
    }

}

export const deleteHandler = async (req,res) => {

    const id = new ObjectId(req.body.id);
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
  



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