const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../nodemailer')

const getUsers = async (req, res) => {
  res.status(200).json(await User.find())
}

const registerUser = async (req, res) => {

    const { name, email, password} = req.body

    try{
        const existingUser = await User.findOne({email})
        console.log(name,email,password)

        if(existingUser) return res.status(400).json({message:"User already exist."})
      
        const hashedPassword = await bcrypt.hash(password,12)

        const result = await User.create({ name:name, email:email, password:hashedPassword })

        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"})
        
        res.status(200).json({message:"Registered Successfully", result:result,token})

    }catch(error){
        res.status(500).json(error)
        console.log(error)
    }
}


const loginUser = async (req, res) => {
  const { email, password} = req.body

  try{
    const existingUser = await User.findOne({email})

    if(!existingUser) return res.status(404).json({message:"User doesn't exist."})

    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

    if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"})

    const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"})

    res.status(200).json({message:"Login Successfully", result:existingUser,token})

}catch(error){
    res.status(500).json({message:"Something went wrong"})
}
}

const forgotPassword = async (req, res) => {

  const {email} = req.body
  
  const existingUser = await User.findOne({email})

    if (existingUser == null) {
      return res.status(400).send('Cannot find user')
    }
    
    let newPassword = Math.floor(Math.random() * 9000) + 1000
    try {

        const hashedPassword = await bcrypt.hash(newPassword.toString(), 10)

        
        const updatedPassword = await User.findOneAndUpdate({email}, existingUser.password = hashedPassword, {
          new: true
        });
        res.status(201).json({NewPassword : newPassword})
        sendEmail(req.body.email,newPassword)
      } 
    catch(err) {
      res.status(500).send()
      console.log(err)
    }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  forgotPassword  
}