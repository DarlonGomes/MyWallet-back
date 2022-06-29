import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(1).required()
});

export const signInSchema = Joi.object({
    name: Joi.string().min(1).trim().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(1).required(),
    repeat_password: Joi.ref('password')
});

export const moneySchema = Joi.object({
    value: Joi.number().min(1).trim().required(),
    text: Joi.string().min(1).trim().required()
});