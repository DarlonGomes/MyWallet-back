import db from "../setup/mongo.js";

export const userReceipt = async (req,res) => {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    

        if(!token) return res.sendStatus(401);

        const session = await db.collection('tokens').findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await db.collection('records').findOne({_id: session.userId});

        if(user){
            const receipt = await db.collection('account').find({userId: session.userId}).toArray();
            
            return res.send(receipt).status(200);
        }else{
            return res.sendStatus(422);
        }

}