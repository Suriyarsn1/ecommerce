const express=require('express');
const app=express();
const cors=require('cors');
const path =require('path')
const mongoose=require('mongoose')
const roots=require('./roots/root')
const dotenv =require ('dotenv');

dotenv.config();



app.use(express.json());
app.use(cors())
app.use('/productlist/uploads',express.static(path.join(__dirname,'/productlist/uploads')))



    
app.use('/api',roots)    
    
mongoose.connect(
    process.env.MONGODB_URL
).then(()=>{console.log('db Connected')}).catch((err)=>{console.log('not connected',err)})

app.listen(5000,()=>console.log(`Server has started`))