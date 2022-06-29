import client from "../setup/db.js";
import { signInSchema, signUpSchema } from "../setup/validation.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


export const signUp = async (req,res) => {

    await client.connect();
    const db = client.db('myWallet');
    const user = req.body;
   
    const validation = signUpSchema.validate(user, {abortEarly: true});
    if(validation.error){return res.sendStatus(422)};
    
    try {
        const alreadyExist = await db.collection('records').findOne({email: user.email})
        

        if(alreadyExist){
            return res.sendStatus(401);
        }

        delete user.repeat_password;
        const hashPassword = bcrypt.hashSync(user.password, 10);

        await (await db).collection('records').insertOne({...user, password: hashPassword})

        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
        
  
}



export const signIn = async (req,res) => {
    
    await client.connect();
    const db = client.db('myWallet');
    const login = req.body;
    const validation = signInSchema.validate(login, {abortEarly: true});
    if(validation.error){return res.sendStatus(422)};

    try {
        
        const user = await db.collection('records').findOne({email: login.email});

        if(user && bcrypt.compareSync(login.password, user.password)){

            const session = await db.collection('tokens').findOne({userId: user._id});
            
            if(session){
                return res.send({...session, name: user.name}).status(200);
            }

            const token = uuid();
            let data = {
                token: token,
                userId: user._id
            }
            await db.collection('tokens').insertOne(data);
            console.log(data)
            return res.send({...data, name: user.name}).status(201);
            
        }else{
            return res.sendStatus(401);
        }

    } catch (error) {
        return res.sendStatus(500);
    }
}