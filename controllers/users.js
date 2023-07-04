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
      res.status(400).send('Cannot find user')
      return 
    }

    const secret = process.env.JWT_SECRET + existingUser.password
    const payload = {email:existingUser.email, id:existingUser._id}

    const token = jwt.sign(payload, secret, {expiresIn: '15m'})

    const link = `http://localhost:5000/users/forget-password/${existingUser._id}/${token}`

      try {
          sendEmail(email,link)
          res.status(200).json({success: "Email sent successfully",link: link})
       } 
        catch(err) {
           res.status(500).send()
            console.log(err)
     }
}

const updatedPassword = async(req,res)=>{
    const {id,token} = req.params
    const user = await User.findById(id)
    const secret = process.env.JWT_SECRET + user.password

    if (user == null) {
      res.status(400).send('Cannot find user')
      return
    }

    try{
      const payload = jwt.verify(token, secret)
      console.log(payload)
      res.render('reset-password',{email:payload.email})

    }catch(err){
      console.log(err)
      res.send(err)
    }
}

const newPassword= async(req,res)=>{
    const {id} = req.params
    const {password, password2} = req.body

    const user = await User.findById(id)
    if(!user){
      res.status(400).send('Cannot find user')
            return
    }

    if(!password == password2){
      res.status(400).json({message:"password and confirm password are not same"})
      return
    }
      const hashedPassword = await bcrypt.hash(password,12)
   
    try{
      const updatedPost = await User.findByIdAndUpdate(id,{password:hashedPassword});
      res.json({message:"password updated successfully",updatedPost})
      

    }catch(err){
      console.log(err)
      res.send(err)
    }
}



module.exports = {
  getUsers,
  registerUser,
  loginUser,
  forgotPassword,
  updatedPassword,
  newPassword
}