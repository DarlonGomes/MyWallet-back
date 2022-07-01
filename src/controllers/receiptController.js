import db from "../setup/mongo.js";

export const userReceipt = async (req,res) => {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    

        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await db.collection('records').findOne({_id: session.userId});

        if(user){
            let receipt = await db.collection('account').find({userId: session.userId}).toArray();
            let [balance] =  await db.collection('account').aggregate([{$match: { userId: session.userId }},{$group : {_id: "$userId", total: {$sum:"$value"}}}]).toArray();
            if(!balance){
                balance = 0;
            }else{
                delete balance._id;
            }
            
            return res.send({receipt,balance}).status(200);
        }else{
            return res.sendStatus(422);
        }

}