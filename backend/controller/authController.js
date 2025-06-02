const express=require('express');
const app=express();
const cors=require('cors');
const jwt=require('jsonwebtoken')
const SECRET_KEY = 'your_secret_key';
const User = require('../model/usermodel')
const bcrypt=require('bcrypt')

app.use(express.json());
app.use(cors())












exports.register= async(req,res)=>{
    try{
       
    const {email,password,username}=req.body;
    const exist=await User.findOne({email})
    if(exist){return res.status(400).json({Message:'Already Exist'})}
    const hashpassword =await bcrypt.hash(password,10) 
    const registered= new User({email,username,password:hashpassword})
    await registered.save()
    
    res.status(200).json({Message:'Sucessfully Register'})
    }
    catch(err){res.status(503).json({Message:'Server error',err})

    }
}




exports.login=async(req,res)=>{
   
    try{
        const data={email,password}=req.body;

        const checkUser=await User.findOne({email})
        const verify= await bcrypt.compare(password,checkUser.password)
       if(checkUser && await bcrypt.compare(password,checkUser.password))
        {
        var token=jwt.sign({userId:checkUser._id},SECRET_KEY,{expiresIn:'1hr'}) 
       console.log(checkUser.role)
        res.status(200).json({token,checkUser:{userId:checkUser._id,username:checkUser.username,email:checkUser.email,roll:checkUser.role},})
        }
    }
    catch(err){res.status(401).json({token,message:'Invalid credentials'})}
}
