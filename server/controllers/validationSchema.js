import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    // email: Joi.string().min(6).required().email(),
    // password: Joi.string().min(6).required(),
    password: Joi.string().min(8).max(25),
});
