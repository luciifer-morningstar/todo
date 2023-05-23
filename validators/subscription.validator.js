const Joi = require('joi').extend(require('@joi/date'));

export const create = {
    body: {
        serviceName: Joi.string().trim(true).required(), 
        serviceLink: Joi.string().trim(true).required(), 
        monthlyFee: Joi.number().required(), 
        startDate: Joi.date().format('YYYY-MM-DD').utc().required()
    }
};

export const update = {
        body: {
            serviceName: Joi.string().trim(true).required(), 
            serviceLink: Joi.string().trim(true).required(), 
            monthlyFee: Joi.number().required(), 
            startDate: Joi.date().format('YYYY-MM-DD').utc().required()
        }
}