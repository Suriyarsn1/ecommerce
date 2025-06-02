const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
  value: String,
  color: String, 
  image: String,
});
const VariantSchema = new mongoose.Schema({
  value: String,
  color: String, 
  image: String,
});
// Main Product Schema
const ProductSchema = new mongoose.Schema({
    shopCardName: { type: String, required: true },
     hasSize: Boolean,
  sizes: [SizeSchema],
  hasVariant: Boolean,
  variants: [VariantSchema],
    shopCardImgUrl: { type: String, required: true },
    shopCardDec: { type: String, required: true },
    shopCardPrice: { type: Number, required: true },
    shopCardMenuCat:{ type: String, required: true },
    shopCardType: { type: String, required: true },
    shopCardCat:  { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Collection' },
    shopCardMet: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema, 'commonproductlist');
