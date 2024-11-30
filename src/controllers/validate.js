const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schame = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(100),
    })

    return schame.validate(data)
}

const loginValidate = (data) => {

    const schame = Joi.object({
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(100),
    })

    return schame.validate(data)
}

module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;