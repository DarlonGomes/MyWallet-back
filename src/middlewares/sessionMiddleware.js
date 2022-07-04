import db from "../setup/mongo.js";

export async function sessionHandler (req, res, next) {
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token) return res.sendStatus(401);

    const session = await db.collection('tokens').findOne({token});

    if(!session) return res.sendStatus(401);
    const user = await db.collection('records').findOne({_id: session.userId});

    res.locals.user = user;

    next();
}