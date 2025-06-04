import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from '../context/productContext';


function ProductDetail() {
  const { id } = useParams();
  const { products ,handleAddcart } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    setIsLoading(true);
    if (products && id) {
      const pData = products.find(item => item._id === id);
      setSelectedProduct(pData || null);
      setIsLoading(false);
    }
  }, [id, products]);

  // Quantity handlers
  const handleDecrement = () => setQuantity(Math.max(1, quantity - 1));
  const handleIncrement = () => setQuantity(quantity + 1);

  // Add to cart handler
  const handleAddToCart = async (id) => {
    if(!id){return}
    handleAddcart(id,quantity,selectedSize)
    if (!selectedProduct) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 10000); // Reset after 10 seconds
  };

  if (isLoading) {
    return <div className="max-w-6xl mx-auto p-4 md:p-8 text-center animate-pulse">Loading...</div>;
  }

  if (!selectedProduct) {
    return <div className="max-w-6xl mx-auto p-4 md:p-8 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Product Detail Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up transform transition-all hover:shadow-xl">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-center mb-4">
              <img
                src={selectedProduct.shopCardImgUrl}
                alt={selectedProduct.shopCardName}
                className="w-full max-h-96 object-contain transition-all duration-300 hover:scale-105"
              />
            </div>
            {selectedProduct.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {selectedProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    onClick={() => {}}
                    className={`h-20 w-20 object-cover cursor-pointer border transition-all hover:border-blue-300 hover:scale-105`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{selectedProduct.shopCardName || 'NA'}</h1>
            <p className="text-gray-600">{selectedProduct.shopCardDec || 'NA'}</p>
            <div className="flex items-center">
              <span className="text-2xl font-bold">₹{selectedProduct.shopCardPrice || 'NA'}</span>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-2 border rounded transition-all hover:border-blue-400"
              >
                <option value="">Select Size</option>
                {selectedProduct.sizes?.length > 0 ? (
                  selectedProduct.sizes.map((size, idx) => (
                    <option key={idx} value={size.value}>{size.value}</option>
                  ))
                ) : (
                  <option value="">NA</option>
                )}
              </select>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full p-2 border rounded transition-all hover:border-blue-400"
              >
                <option value="">Select Color</option>
                {selectedProduct.colors?.length > 0 ? (
                  selectedProduct.colors.map((color, idx) => (
                    <option key={idx} value={color}>{color}</option>
                  ))
                ) : (
                  <option value="">NA</option>
                )}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 border rounded-l hover:bg-gray-100 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="px-4 py-1 border-t border-b w-16 text-center"
                />
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 border rounded-r hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={()=>handleAddToCart(selectedProduct._id)}
                disabled={addedToCart}
                className={`w-full py-2 rounded font-semibold transition ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {addedToCart ? 'Added ✓' : 'Add to Cart'}
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;
