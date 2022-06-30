import { moneySchema, editSchema } from "../setup/validation.js";
import { ObjectId } from "mongodb";
import db from "../setup/mongo.js";


export const currencyHandler = async (req,res) => {
    
    const currency = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    

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

    const { id, text, value } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    const validation = editSchema.validate({text, value, id});
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