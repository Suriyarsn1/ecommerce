const express=require('express');
const app=express();
const cors=require('cors');
const path =require('path')
const mongoose=require('mongoose')
const roots=require('./roots/root')
const dotenv =require ('dotenv');

dotenv.config();

const corseOptions={
    origin:process.env.CLIENT_URL,
    methods:"GET,PATCH,PUT,DELETE,POST,HEAD,DELETE"
}

app.use(express.json());
app.use(cors(corseOptions))
app.use('/productlist/uploads',express.static(path.join(__dirname,'/productlist/uploads')))



    
app.use('/api',roots)    
    
mongoose.connect(
    process.env.MONGODB_URL
).then(()=>{console.log('db Connected')}).catch((err)=>{console.log('not connected',err)})

app.listen(5000,()=>console.log(`Server has started`))