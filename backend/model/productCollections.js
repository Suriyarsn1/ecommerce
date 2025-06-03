const mongoose=require('mongoose')

const CollectionSchema=new mongoose.Schema({
    collectionImgUrl:{type:String,required:true},
    collectionName:{type:String,required:true},
    collectionFor:{type:mongoose.Types.ObjectId, required:true,ref:'Menu'},
},{timestamps:true})

module.exports=mongoose.model('Collection',CollectionSchema,'Collectionlist')





