const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
  size:String,
  color:String,
  quantity: { type: Number, default: 1, min: 1 },
}, { timestamps: true });

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'User' },
  items: [cartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema, 'cart');