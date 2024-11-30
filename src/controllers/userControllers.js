const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidate, registerValidate } = require('./validate');


const userControllers = {
    register: async function (req, res, next) {

        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error.message) }

        const selectiUser = await User.findOne({ email: req.body.email })
        if (selectiUser) {
            return res.status(400).send('Usuario ja cadastrado')
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        })

        try {
            const savedUser = await user.save()
            res.redirect('/login')
            next()
        } catch (error) {
            res.status(400).send(error)
        }
    },

    login: async function (req, res) {

        try {

            const { error } = loginValidate(req.body)
            if (error) { return res.status(400).send(error.message) }

            const selectiUser = await User.findOne({ email: req.body.email })
            if (!selectiUser) {
                return res.status(400).send('Email ou senha incorreto')
            }

            const passwordAndEmailMath = bcrypt.compare(req.body.password, selectiUser.password)
            if (!passwordAndEmailMath) {
                return res.status(400).send('Email ou senha incorreto')
            }

            const token = jwt.sign({ _id: selectiUser._id }, process.env.TOKEN_SECRET)

            res.header("authoriztion-token", token)
            res.send('Usuario Logado')
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = userControllers