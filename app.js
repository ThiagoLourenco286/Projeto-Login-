require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./src/routers/userRouter');
const adminRouter = require('./src/routers/adminRouter');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginn').then(res => {
    console.log('Banco conectado')
}).catch(error => {
    console.log(error)
})

app.use('/', userRouter)

app.use('/admin', adminRouter)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'templates'))

app.listen(process.env.PORT, () => {
    console.log('Server Runnig')
})