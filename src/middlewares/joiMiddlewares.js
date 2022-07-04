import { signInSchema, signUpSchema } from "../setup/joiMiddleware.js";
import { currencySchema, editCurrencySchema } from "../setup/joiMiddleware.js";
export function userValidationSchemas (req,res, next){
    const data = res.locals.cleanData
    if(data.name){
        const validation = signUpSchema.validate(data, {abortEarly : true});
        if(validation.error){return res.sendStatus(422)};
    }
    else{
        const validation = signInSchema.validate(data, {abortEarly : true});
        if(validation.error){return res.sendStatus(422)};
    }

    next();
}

export function currencyValidationSchemas (req,res,next){

    const currency = res.locals.cleanData;

    if(currency.id){
        const validation = editCurrencySchema.validate(currency);
        if(validation.error) return res.sendStatus(422);
    }else{
        const validation = currencySchema.validate(currency, {abortEarly: true});
        if(validation.error) return res.sendStatus(422);
    }

    next();
}
 