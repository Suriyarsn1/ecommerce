const Order = require('../model/oders')



exports.placeOrders = async (req, res) => {

  const {userId,
        cartItems,
         shippingInfo,
          totalAmount,
            paymentId,
              paymentMethod,}=req.body


              console.log(userId)
try{
     if (!userId || !cartItems?.length || !shippingInfo || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }



       const estimateDeliveryDate = new Date();
    estimateDeliveryDate.setDate(estimateDeliveryDate.getDate() + 5);
      
       const paymentStatus = paymentMethod === 'COD' ? 'pending' : 'paid';
       
       const order=new Order({
        
       user:userId,
        cartItems,
         shippingInfo,
          totalAmount,
           estimateDeliveryDate,
            paymentId,
              paymentMethod,
              paymentStatus,
              orderStatus:'pending',
       })
   
  const savedOrder = await order.save();
  console.log('saved')
  res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });
}catch (err) {console.error('Order placement error:', err);}

}



exports.fetchOrders = async (req, res) => {
    
      const userId = req.userId

      try{
      const oders= await Order.find({user:userId}).populate('cartItems.productId')
      console.log(oders)
      res.status(201).json(oders);
    

      }catch (err) {console.error('Order placement error:', err);}
        
      
}

exports.fetchAdminOrders = async (req, res) => {
    
      

      try{
      const adminOders= await Order.find().populate('cartItems.productId')
      res.status(201).json(adminOders);
    

      }catch (err) {console.error('Order placement error:', err);}
        
      
}


exports.updateAdminOrders = async (req, res) => {
  const { orderId } = req.params;
  const {
    deliveryStatus,
    courierPartner,
    courierTrackingPath,
    courierTrackingId,
    estimateDeliveryDate,
    cancelOrder
  } = req.body;

  try {
    // 1. Fetch the order document and populate 'user'
    let order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    let updatedFields = {};

    // 2. Update fields if present in request body
    if (deliveryStatus) {
      order.orderStatus = deliveryStatus;
      updatedFields.orderStatus = deliveryStatus;
    }
    if (courierTrackingPath) {
      order.couriertrackingPath = courierTrackingPath;
      updatedFields.couriertrackingPath = courierTrackingPath;
    }
    if (courierPartner) {
      order.courierPartner = courierPartner;
      updatedFields.courierPartner = courierPartner;
    }
    if (courierTrackingId) {
      order.courierTrackingId = courierTrackingId;
      updatedFields.courierTrackingId = courierTrackingId;
    }
    if (estimateDeliveryDate) {
      order.estimateDeliveryDate = new Date(estimateDeliveryDate);
      updatedFields.estimateDeliveryDate = order.estimateDeliveryDate;
    }
    if (cancelOrder) {
      order.orderStatus = 'cancelled';
      updatedFields.orderStatus = 'cancelled';
    }

    // 3. Save the updated order
    await order.save();

    // Optionally send notification here
    // await sendOrderUpdateNotification(order.user, order, updatedFields);

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};
