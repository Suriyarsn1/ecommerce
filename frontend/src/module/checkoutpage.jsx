import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Authcontext } from "../context/authContexts";


function Checkout() {
  // Context hooks for cart and user
  const {
    cartProduct,
    total,
    selectedItems,
    calculatedTotal,
    isLoading,
    handleremove,
    handleChangeQty,
    decrementQty,
    incrementQty,
    handleChecked
  } = useContext(CartContext);
  const { userId } = useContext(Authcontext);

  // Address/location and order form states
  const [country, setCountry] = useState([]);
  const [form, setForm] = useState({
    houseNumber: '',
    streetAddress: '',
    country: '',
    state: '',
    district: '',
    city: '',
    village: '',
    pincode: '',
    email: '',
    phoneNumber: '',
    paymentmethod: '',
  });
  const [totalAmount, setTotalAmount] = useState({});
  const [location, setLocation] = useState({
    state: [],
    district: [],
    city: [],
    village: []
  });
  const [estimatetime, setEstimatetime] = useState('');
  const [selectedcartItems, setSelectedCartItems] = useState([]);
  const navigate=useNavigate()

  // Update selected cart items and total when selection changes
  useEffect(() => {
    const Items = cartProduct.filter(item => selectedItems[item.productId._id]);
    setSelectedCartItems(Items);
    setTotalAmount({
      subTotal: total.subTotal,
      offerprice: total.offerprice,
      deliveryFee: total.deliveryFee,
      gst: total.gst,
      grandTotal: total.grandTotal
    });
    // eslint-disable-next-line
  }, [selectedItems, cartProduct, total]);

  // Estimate delivery date when address is filled
  useEffect(() => {
    const { country, state, district, city, village, pincode } = form;
    if (country && state && district && city && village && pincode) {
      const estdate = new Date();
      const devdate = new Date(estdate);
      devdate.setDate(estdate.getDate() + 5);
      setEstimatetime(devdate.toDateString());
    }
  }, [form]);

  // Calculate totals when userId or cart changes
  useEffect(() => {
    calculatedTotal(cartProduct);
  
  }, [userId, cartProduct]);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/get/countries`);
      setCountry(res.data);
    };
    fetchCountries();
  }, []);

  // Handlers for dropdowns (country/state/district/city/village)
  const handleState = async (id) => {
    const countryName = country.find(item => item.id === id);
    setForm({ ...form, country: countryName?.name || "" });
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/get/state`, { id });
    setLocation({ ...location, state: res.data, district: [], city: [] });
  };
  const handleDistrict = async (statename) => {
    setForm({ ...form, state: statename });
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/get/districts`, { statename });
    setLocation({ ...location, district: res.data, city: [] });
  };
  const handleCities = async (dname) => {
    setForm({ ...form, district: dname });
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/get/cities`, { dname });
    setLocation({ ...location, city: res.data });
  };
  const handleVillage = async (cname) => {
    setForm({ ...form, city: cname });
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/get/village`, { cname });
    setLocation({ ...location, village: res.data });
  };

  // Place order handler
  const handleSubmitOrder = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/placeorders`, {
        userId: userId,
        cartItems: selectedcartItems,
        shippingInfo: form,
        totalAmount: totalAmount,
        estimateDeliveryDate: estimatetime,
        paymentId: 'COD-123',
        paymentMethod: "COD",
      }).then((data)=>(console.log(data)))
      alert('Oder Placed Sucessfully')
      navigate('/user/orders')
      setForm('')
      // Add user feedback or redirect as needed
    } catch (err) {
      console.log(err);
    }
  };




  return (
    <section className="bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen py-8 md:py-16">
      {/* Step indicator */}
      <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Progress Bar */}
        <ol className="flex w-full max-w-2xl mx-auto mb-10 text-center text-sm font-medium text-gray-500 sm:text-base">
          <li className="flex items-center text-blue-700 font-semibold after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center">
              <svg className="me-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              </svg>
              Cart
            </span>
          </li>
          <li className="flex items-center text-blue-700 font-semibold after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="flex items-center">
              <svg className="me-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              </svg>
              Checkout
            </span>
          </li>
          <li className="flex shrink-0 items-center">
            <svg className="me-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            </svg>
            Order summary
          </li>
        </ol>

        {/* Main grid: Cart items & Order/Delivery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Cart Items List */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your Cart</h2>
            {isLoading ? (
              <p className="text-blue-500 font-semibold animate-pulse">Your Cart is Loading...</p>
            ) : !cartProduct.length ? (
              <p className="text-gray-500">Your Cart is empty</p>
            ) : (
              cartProduct.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                >
                  {/* Checkbox to select item */}
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.productId._id]}
                    onChange={(e) => handleChecked(item.productId._id, e.target.checked)}
                    className="accent-blue-500 mr-2"
                  />
                  {/* Product details and quantity controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Product image */}
                    <img className="h-20 w-20 rounded object-cover shadow" src={item.productId.shopCardImgUrl} alt={item.productId.shopCardName} />
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementQty(item.productId._id, item.quantity - 1)}
                        disabled={item.quantity < 2}
                        className="h-7 w-7 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-lg shadow transition"
                        type="button"
                      >-</button>
                      <input
                        type="text"
                        className="w-10 text-center border border-gray-200 rounded"
                        value={item.quantity}
                        onChange={(e) => handleChangeQty(item.productId._id, e.target.value)}
                      />
                      <button
                        onClick={() => incrementQty(item.productId._id, item.quantity + 1)}
                        className="h-7 w-7 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-lg shadow transition"
                        type="button"
                      >+</button>
                    </div>
                    {/* Price */}
                    <div className="text-end font-bold text-lg text-blue-700">
                      ₹{item.quantity * item.productId.shopCardPrice}
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={() => handleremove(item.productId._id)}
                      className="text-red-500 hover:underline transition"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                  {/* Product name and description */}
                  <div className="mt-2 text-gray-700">
                    <div className="font-semibold">{item.productId.shopCardName}</div>
                    <div className="text-sm">{item.productId.shopCardDec}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary & Delivery Details */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="rounded-xl shadow-lg bg-white p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{total.subTotal ? total.subTotal.toFixed(2) : "00.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>₹{total.deliveryFee ? total.deliveryFee.toFixed(2) : "00.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST:</span>
                  <span>₹{total.gst ? total.gst.toFixed(2) : "00.00"}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span>₹{total.grandTotal ? total.grandTotal.toFixed(2) : "00.00"}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details Form */}
            <div className="rounded-xl shadow-lg bg-white p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Delivery Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* House Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">House/No</label>
                  <input
                    type="text"
                    onChange={e => setForm({ ...form, houseNumber: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Ex: 20/2"
                    required
                  />
                </div>
                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">Street</label>
                  <input
                    type="text"
                    onChange={e => setForm({ ...form, streetAddress: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Street Name"
                    required
                  />
                </div>
                {/* Country dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">Country</label>
                  <select
                    onChange={e => handleState(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    required
                  >
                    <option value="">Select Country</option>
                    {country.map((c, idx) => (
                      <option key={idx} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                {/* State dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">State</label>
                  <select
                    onChange={e => handleDistrict(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    required
                  >
                    <option value="">Select State</option>
                    {location.state.map((s, idx) => (
                      <option key={idx} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                {/* District dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">District</label>
                  <select
                    onChange={e => handleCities(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    required
                  >
                    <option value="">Select District</option>
                    {location.district.map((d, idx) => ( 
                      <option key={idx} value={d.district}>{d.district}</option>
                    ))}
                  </select>
                </div>
                {/* City dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">City</label>
                  <select
                    onChange={e => handleVillage(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    required
                  >
                    <option value="">Select City</option>
                    {location.city.map((c, idx) => (
                      <option key={idx} value={c.subDistrict}>{c.subDistrict}</option>
                    ))}
                  </select>
                </div>
                {/* Village dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">Village</label>
                  <select
                    onChange={e => setForm({ ...form, village: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    required
                  >
                    <option value="">Select Village</option>
                    {location.village.map((v, idx) => (
                      <option key={idx} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">Pincode</label>
                  <input
                    type="text"
                    onChange={e => setForm({ ...form, pincode: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    placeholder="Pincode"
                    required
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">Your Email*</label>
                  <input
                    type="email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">Phone Number</label>
                  <input
                    type="text"
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">Payment Method</label>
                  <select  onChange={e => setForm({ ...form, paymentmethod: e.target.value })}>
                    <option>-Select Payment-</option>
                    <option value='Cash on Delivery'>Cash on Delivery</option>
                  </select>
                </div>
              </div>
              {/* Place Order Button */}
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="w-full mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Fade-in animation style */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}

export default Checkout;
