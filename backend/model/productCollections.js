const mongoose=require('mongoose')

const CollectionSchema=new mongoose.Schema({
    collectionName:{type:String,required:true},
    collectionFor:{type:mongoose.Types.ObjectId, required:true,ref:'Menu'},
   collectionImgUrl: { type: String,required:true },
  imagePublicId: { type: String }
},{timestamps:true})

module.exports=mongoose.model('Collection',CollectionSchema,'Collectionlist')





