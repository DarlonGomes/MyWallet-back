import Joi from "joi";

export const signInSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(1).required()
});

export const signUpSchema = Joi.object({
    name: Joi.string().min(1).trim().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(1).required(),
    repeat_password: Joi.ref('password')
});

export const currencySchema = Joi.object({
    value: Joi.number().required(),
    text: Joi.string().min(1).trim().required()
});

export const editCurrencySchema = Joi.object({
    value: Joi.number(),
    text: Joi.string().min(1).trim(),
    id: Joi.string().required()
})