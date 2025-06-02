import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { Authcontext } from "../context/authContexts";
import OrderTracking from "./odertrakingpage";

function UserOrders() {

  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);


  const { token } = useContext(Authcontext);

 
  const todayDate = new Date();

  // Fetch orders 
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/fetch/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res.data)
        setOrders(res.data[0]);
      } catch (err) {
        console.error("Fetching Failed:", err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token]);


  return (
    <div className="py-10 px-2 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto bg-gray-50 min-h-screen">
    
      <div className="flex flex-col items-start space-y-2 mb-8 animate-fade-in-up">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white">
          Order Summary
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
          {todayDate.toDateString()}
        </p>
      </div>

     
      {loading ? (
        <div className="text-center py-10 text-lg text-blue-500 animate-pulse">Loading your orders...</div>
      ) : !orders ? (
        <div className="text-center py-10 text-lg text-gray-500">Not yet Order</div>
      ) : (
        <div className="flex flex-col xl:flex-row items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 animate-fade-in-up">
          {/* Cart Items Section */}
          <div className="flex flex-col w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col bg-white dark:bg-gray-800 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-xl shadow-lg">
              <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-4">Customer’s Cart</p>
              {orders.cartItems && orders.cartItems.length > 0 ? (
                orders.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center md:space-x-6 xl:space-x-8 w-full border-b pb-6 last:border-b-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img className="w-full rounded-lg shadow-md" src={item.productId?item.productId.shopCardImgUrl:''} alt={item.productId.shopCardName} />
                    </div>
                    {/* Product Details */}
                    <div className="flex flex-col md:flex-row justify-between items-start w-full">
                      <div className="w-full flex flex-col space-y-2 mb-4 md:mb-0">
                        <h3 className="text-xl xl:text-2xl font-semibold text-gray-800 dark:text-white">
                          {item.productId?item.productId.shopCardName:''}
                        </h3>
                        {/* Example static info, replace with real data if available */}
                        <div className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <span>Style: Italic Minimal Design</span>
                          <span>Size: Small</span>
                          <span>Color: Light Blue</span>
                        </div>
                      </div>
                      {/* Price, Qty, Subtotal */}
                      <div className="flex flex-col md:flex-row md:space-x-8 items-start md:items-center w-full md:w-auto">
                        <p className="text-base xl:text-lg text-gray-800 dark:text-white">{item.productId.shopCardPrice}</p>
                        <p className="text-base xl:text-lg text-gray-800 dark:text-white">{item.quantity}</p>
                        <p className="text-base xl:text-lg font-semibold text-gray-800 dark:text-white">
                          ₹{(item.productId.shopCardPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 py-4">No items in cart.</div>
              )}
            </div>

            {/* Summary & Shipping */}
            <div className="flex flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              {/* Summary */}
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Summary</h3>
                <div className="flex flex-col space-y-4 border-b pb-4">
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800 dark:text-white">Subtotal</span>
                    <span className="text-base text-gray-600 dark:text-gray-300">
                      ₹{orders.totalAmount?.subTotal?.toFixed(2) || "00.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800 dark:text-white">Discount</span>
                    <span className="text-base text-gray-600 dark:text-gray-300">
                      ₹{orders.totalAmount?.offerPrice?.toFixed(2) || "00.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-800 dark:text-white">Shipping</span>
                    <span className="text-base text-gray-600 dark:text-gray-300">
                      ₹{orders.totalAmount?.deliveryFee?.toFixed(2) || "00.00"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-base font-semibold text-gray-800 dark:text-white">Total</span>
                  <span className="text-base font-semibold text-gray-600 dark:text-gray-300">
                    ₹{orders.totalAmount?.grandTotal?.toFixed(2) || "00.00"}
                  </span>
                </div>
              </div>
              {/* Shipping */}
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Shipping</h3>
                <div className="flex items-center space-x-4">
                  <img className="w-8 h-8" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {orders.paymentMethod === 'COD' ? 'Cash On Delivery' : 'Courier Name'}
                      <br />
                      <span className="font-normal text-sm">
                        Estimate Delivery: {orders.estimateDeliveryDate ? new Date(orders.estimateDeliveryDate).toDateString() : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                {/* Courier Tracking Button (if not COD) */}
                {!orders.paymentMethod === 'COD' && (
                  <div className="w-full flex justify-center">
                    <button className="bg-gray-800 hover:bg-black text-white py-2 px-8 rounded-lg transition">
                      Courier Tracking
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer & Address */}
          <div className="bg-white dark:bg-gray-800 w-full xl:w-96 flex flex-col px-4 py-6 md:p-6 xl:p-8 rounded-xl shadow-md space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Customer</h3>
            <div className="flex flex-col space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                <img className="w-6 h-6" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email" />
                <span className="text-sm text-gray-800 dark:text-white">{orders.shippingInfo?.email}</span>
              </div>
              {/* Address */}
              <div className="flex flex-col space-y-2">
                <p className="text-base font-semibold text-gray-800 dark:text-white">Shipping Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{orders.shippingInfo?.houseNumber}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{orders.shippingInfo?.streetAddress}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{orders.shippingInfo?.village}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{orders.shippingInfo?.city}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{orders.shippingInfo?.state}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {orders.shippingInfo?.country}-{orders.shippingInfo?.pincode}
                </p>
              </div>
              {/* Order Tracking Stepper */}
              <OrderTracking currentStatus={orders.orderStatus} />
            </div>
          </div>
        </div>
      )}

      {/* Fade-in animation style */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

export default UserOrders;
