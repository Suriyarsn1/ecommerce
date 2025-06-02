import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function AdminProductlist() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [command, setCommand] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getproductlist");
        setProducts(res.data);
      } catch (err) {
        console.error("Fetching Failed:", err);
      }
    };
    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteproduct/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.log('Card Deletion Failed', err);
      }
    }
  };

  function handleUpdate(id) {
    navigate(`/admin/productlist/updateproduct/${id}`);
  }
  // Product search filter
  const filteredProducts = products.filter(item =>
    item.shopCardName.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">

      {/* Search Bar */}
      <div className="w-full max-w-xl mx-auto mb-8 flex items-center bg-white rounded-full shadow border border-blue-100 px-4 py-2">
        <FaSearch className="text-blue-400 mr-2" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-blue-900"
          placeholder="Search products by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 max-w-7xl mx-auto">
        <a href="/admin/upload/productlist">
          <button className='px-5 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-pulse'>
            Upload Products
          </button>
        </a>
        <a href="/admin/home" className="text-blue-600 underline text-sm font-semibold">Go to Admin Page</a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-blue-600 font-semibold py-10 animate-fade-in-up">
            No products found.
          </div>
        )}
        {filteredProducts.map((item, index) => (
          <div
            key={item._id || index}
            className="relative rounded-xl overflow-hidden border border-black shadow-xl bg-white hover:scale-105 hover:shadow-2xl transition-transform duration-500 animate-fade-in-up"
            style={{ minWidth: '230px', maxWidth: '280px', margin: 'auto' }}
          >
            <img
              src={item.shopCardImgUrl}
              className="object-cover w-full h-40 transition-transform duration-300 ease-in-out"
              alt={item.shopCardName}
            />
            <span className="absolute p-2 bg-red-500 top-3 left-3 border rounded-lg text-xs font-semibold text-white shadow">
              {item.shopCardType}
            </span>
            <div className="p-3 hover:bg-slate-100 transition duration-300 ease-in-out">
              <div className="mb-2" style={{ minHeight: '90px' }}>
                <h1 className="text-lg font-bold truncate">{item.shopCardName}</h1>
                <p className="text-base font-semibold text-blue-700">₹{item.shopCardPrice}</p>
                <p className="font-light text-xs truncate">{item.shopCardDec}</p>
              </div>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-700 text-white font-semibold transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold transition"
                >
                  Update
                </button>
              </div>
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

export default AdminProductlist;
