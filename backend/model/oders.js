const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    shopCardCat: String,
    shopCardDec: String,
    shopCardImgUrl: String,
    shopCardMet: String,
    shopCardName: String,
    shopCardPrice: Number,
    shopCardType: String,
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
}, { _id: false }); 

const shippingInfoSchema = new mongoose.Schema({
    houseNumber: String,
    streetAddress: String,
    country: String,
    state: String,
    district: String,
    city: String,
    village: String,
    pincode: String,
    email: String,
    phoneNumber: String,
}, { _id: false });

const totalAmountSchema = new mongoose.Schema({
    subTotal: { type: Number, default: 0 },
    offerPrice: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    gst: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 }
}, { _id: false });

const courierTrackingPathSchema = new mongoose.Schema({
    status: String,
    location: String,
    timestamp: Date
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    cartItems: [cartItemSchema],
    shippingInfo: shippingInfoSchema,
    paymentMethod: String,
    totalAmount: totalAmountSchema,
    paymentId: String,
    estimateDeliveryDate: { type: Date },
    courierPartner: { type: String },
    courierTrackingId: { type: String },
    trackingNumber: { type: String },
    courierTrackingPath: [courierTrackingPathSchema],
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    orderStatus: { type: String, enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    isConfirmed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema, 'orders');
