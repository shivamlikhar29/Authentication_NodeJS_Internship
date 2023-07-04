const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config({path:'./.env'})
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const sendEmail = require("./nodemailer")
const ejs = require('ejs')
const routes = require('./routes/routes')

app.set('view engine', 'ejs');
app.use(express.json())

app.use('/users',routes)
  

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
   .then(()=> app.listen(PORT,()=>console.log(`Server running on port : ${process.env.PORT}`)))
   .catch((error)=>console.log(error.message))
