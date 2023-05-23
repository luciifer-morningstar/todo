import Joi from "joi";
import { emailValidator, phoneValidator } from "../helpers/custom.validation";

export const login = {
    body: {
        email: Joi.string().trim(true).required(),
        password: Joi.string().trim(true).required(),
    }
};

export const register = {
        body: {
            user_name: Joi.string().trim(true).required(),
            email:Joi.string().trim(true).required(),
            password: Joi.string().trim(true).required()            
        }
}