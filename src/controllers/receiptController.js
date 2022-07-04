import db from "../setup/mongo.js";

export const userReceipt = async (req,res) => {
    
    const user = res.locals.user

        if(user){
            let receipt = await db.collection('account').find({userId: user._id}).toArray();
            let [balance] =  await db.collection('account').aggregate([{$match: { userId: user._id }},{$group : {_id: "$userId", total: {$sum:"$value"}}}]).toArray();
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