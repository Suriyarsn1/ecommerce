const express=require('express');
const app=express();
const cors=require('cors');
const path =require('path')
const mongoose=require('mongoose')
const roots=require('../roots/root')
const dotenv =require ('dotenv');
const serverless = require("serverless-http"); 

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: "GET,PATCH,PUT,DELETE,POST,HEAD"
};

app.use(express.json());
app.use(cors(corsOptions))
app.use('/productlist/uploads',express.static(path.join(__dirname,'/productlist/uploads')))



    
app.use('/api',roots)    
    
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('MongoDB Connected')).catch(()=>console.log('MongoDB not Connected'))
app.listen('5000',()=>console.log('Serever Strated'))



module.exports.handler = serverless(app);