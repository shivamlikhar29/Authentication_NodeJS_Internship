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

// const users = [] //for storing users information

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

// app.get('/users', (req, res) => {
//     res.json(users)
//     console.log(process.env.EMAIL)
// })
// app.post('/users', async (req, res) => {
//     try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10)
//       const user = { name: req.body.name, email:req.body.email, password: hashedPassword }
//       users.push(user)
//       res.status(201).send("Registered Successfully")
//       console.log(users)
//     } catch {
//       res.status(500).send()
//     }
// })
// app.post('/users/login', async (req, res) => {
//     const user = users.find(user => user.email === req.body.email)
//     if (user == null) {
//       return res.status(400).send('Cannot find user')
//     }
//     try {
//       if(await bcrypt.compare(req.body.password, user.password)) {
//         res.send('Login Success')
//       } else {
//         res.send('Not Allowed')
//       }
//     } catch {
//       res.status(500).send()
//     }
// })
// app.patch('/users/forget-password', async (req, res) => {
//     const user = users.find(user => user.email === req.body.email)
//     if (user == null) {
//       return res.status(400).send('Cannot find user')
//     }
//     let newPassword = Math.floor(Math.random() * 9000) + 1000
//     try {

//         const hashedPassword = await bcrypt.hash(newPassword.toString(), 10)
//        const updatedUser =  users.map((user) => {
//             if(user.email === req.body.email) {
//                 user.password = hashedPassword
//             }
//             return user
//         })
//         users.push(updatedUser)
//         sendEmail(req.body.email,newPassword)
//         res.status(201).json({NewPassword : newPassword})
//     } 
//     catch {
//       res.status(500).send()
//     }
// })


app.use('/users',routes)
  

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
   .then(()=> app.listen(PORT,()=>console.log(`Server running on port : ${process.env.PORT}`)))
   .catch((error)=>console.log(error.message))