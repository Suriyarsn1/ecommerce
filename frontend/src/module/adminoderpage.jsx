import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { Authcontext } from "../context/authContexts";
import OrderTracking from "./odertrakingpage";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [oderloading, setoderLoading] = useState(false);
  const { token } = useContext(Authcontext);
  const [form, setForm] = useState({});
  const [editingOrder, setEditingOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const statusOptions = ['pending', 'processed', 'shipped', 'delivered', 'cancel'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setoderLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/fetch/admin/orders`);
      setOrders(res.data);
      setoderLoading(false);
    } catch (err) {
      console.error("Fetching Failed:", err);
      setoderLoading(false);
    }
  };

  const startEdit = (order) => {
    setEditingOrder(order._id);
    setForm({
      deliveryStatus: order.orderStatus,
      courierPartner: order.courierPartner || '',
      courierTrackingId: order.courierTrackingId || '',
      courierTrackingPath: order.courierTrackingPath || '',
      estimateDeliveryDate: order.estimateDeliveryDate ? order.estimateDeliveryDate.substring(0, 10) : '',
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cancelEdit = () => {
    setEditingOrder(null);
    setForm({});
  };

  const handleUpdate = async (orderId) => {
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/admin/orders/update/${orderId}`, form);
      alert('Order updated!');
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      alert('Failed to update order');
    }
    setLoading(false);
  };

  const todayDate = new Date();
  console.log(orders)

  return (
    <div className="py-8 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Admin Orders</h1>
          <p className="text-gray-500">{todayDate.toDateString()}</p>
        </div>
        {oderloading && <span className="text-blue-600 animate-pulse">Loading orders...</span>}
      </div>

      {orders.length === 0 && !oderloading && (
        <div className="text-center text-lg text-gray-500 mt-10 animate-fade-in-up">No orders found.</div>
      )}

      <div className="space-y-8">
        {orders.map(order => (
          <div key={order._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden animate-fade-in-up transition-transform duration-500 hover:scale-[1.01]">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">Order ID: <span className="font-mono">{order._id}</span></p>
                <p className="text-sm text-gray-500">User: {order.user?.name || order.shippingInfo.email}</p>
              </div>
              <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${order.orderStatus === 'delivered' ? 'green' : order.orderStatus === 'cancel' ? 'red' : 'yellow'}-100 text-${order.orderStatus === 'delivered' ? 'green' : order.orderStatus === 'cancel' ? 'red' : 'yellow'}-700`}>
                  {order.orderStatus}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg mb-2">Items</h3>
                {order.cartItems.map(item => (
                  <div key={item._id} className="flex items-center gap-4 mb-3">
                   <img src={item.productId ? item.productId.shopCardImgUrl : "/placeholder.png"} alt={item.productId ? item.productId.shopCardName : "Product"} className="w-16 h-16 object-cover rounded"/><div>
                     {item.productId && (<>
    <p className="font-medium">{item.productId.shopCardName}</p>
    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
    <p className="text-sm text-gray-500">Price: ₹{item.productId.shopCardPrice}</p>
  </>)}
                    </div>
                  </div>
                ))}
                <div className="mt-3 text-right">
                  <span className="font-semibold">Total: ₹{order.totalAmount.grandTotal}</span>
                </div>
              </div>
              {/* Shipping & Tracking */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Shipping Info</h3>
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  <div>{order.shippingInfo.houseNumber}, {order.shippingInfo.streetAddress}</div>
                  <div>{order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country} - {order.shippingInfo.pincode}</div>
                  <div>Email: {order.shippingInfo.email}</div>
                </div>
                <div className="mt-3">
                  <OrderTracking currentStatus={order.orderStatus} />
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {editingOrder === order._id ? (
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                  <select
                    name="deliveryStatus"
                    value={form.deliveryStatus}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="courierPartner"
                    placeholder="Courier Partner"
                    value={form.courierPartner}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="courierTrackingId"
                    placeholder="Tracking ID"
                    value={form.courierTrackingId}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="courierTrackingPath"
                    placeholder="Tracking Path"
                    value={form.courierTrackingPath}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    name="estimateDeliveryDate"
                    value={form.estimateDeliveryDate}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <div className="flex gap-2 col-span-full mt-2">
                    <button
                      onClick={() => handleUpdate(order._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => startEdit(order)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition animate-pulse"
                >
                  Edit Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Animation */}
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

export default AdminOrders;
