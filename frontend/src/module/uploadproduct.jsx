import { useState, useContext } from "react";
import axios from 'axios';
import { Authcontext } from "../context/authContexts";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../context/collectionContext";
import { UtilityContext } from "../context/menuContext";

function UploadProductlist() {

  const { menu } = useContext(UtilityContext);
 
  const navigate = useNavigate();


  const [hasSize, setHasSize] = useState(null); 
  const [sizes, setSizes] = useState([{ value: "", color: "#000000", image: null }]);

  const [hasVariant, setHasVariant] = useState(null);
  const [variants, setVariants] = useState([{ value: "", color: "#000000", image: null }]);





  const [shopCardName, setshopCardName] = useState('');
  const [shopCardPrice, setshopCardPrice] = useState('');
  const [shopCardDec, setshopCardDec] = useState('');
  const [shopCardType, setshopCardType] = useState('');
  const [shopCardMet, setshopCardMet] = useState('');
  const [shopCardCat, setshopCardCat] = useState('');
  const [mainImageFile, setmainImageFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const { collections } = useContext(CollectionContext)
  const [shopCardMenuCat,setshopCardMenuCat]=useState('')
  const [activeCollection,setActiveCollection]=useState('')
 console.log(activeCollection)
  // Handle form submission for uploading product
  const handlesubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('Uploading...');

    // Prepare form data for API
    const formData = new FormData();
    formData.append('shopCardName', shopCardName);
    formData.append('shopCardPrice', shopCardPrice);
    formData.append('shopCardDec', shopCardDec);
    formData.append('shopCardType', shopCardType);
    formData.append('shopCardMet', shopCardMet);
    formData.append('shopCardCat', shopCardCat);
    formData.append('mainImageFile', mainImageFile);
    formData.append('shopCardMenuCat', shopCardMenuCat);
    formData.append('hasSize', hasSize);
    formData.append('sizes', JSON.stringify(sizes.map(({ value, color }) => ({ value, color }))));
 
    sizes.forEach((size, idx) => {
      if (size.image) formData.append('sizesImages', size.image);
    });

    formData.append('hasVariant', hasVariant);
    formData.append('variants', JSON.stringify(variants.map(({ value, color }) => ({ value, color }))));
  
    variants.forEach((variant, idx) => {
      if (variant.image) formData.append('variantsImages', variant.image);
    });


    // // Handlers for dynamic fields
    // const handleSizeChange = (idx, field, val) => {
    //   const updated = [...sizes];
    //   updated[idx][field] = val;
    //   setSizes(updated);
    // };
    // const addSizeField = () => setSizes([...sizes, { value: "", color: "#000000", image: null }]);

    // const handleVariantChange = (idx, field, val) => {
    //   const updated = [...variants];
    //   updated[idx][field] = val;
    //   setVariants(updated);
    // };
    // const addVariantField = () => setVariants([...variants, { value: "", color: "#000000", image: null }]);



    try {
      // Send POST request to upload product
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, formData);
      setUploadStatus(response.data.message || "Upload successful!");
      // Optionally reset form fields
      setmainImageFile(null);
      setshopCardName('');
      setshopCardPrice('');
      setshopCardDec('');
      setshopCardType('');
      setshopCardMet('');
      setshopCardCat('');
      
      setTimeout(() => navigate('/admin/home/upload/productlist'), 1200);
    } catch (err) {
      console.log(err);
      setUploadStatus('Failed to Save');
    }
  };


  const removeSizeField = (idx) => {
    setSizes(sizes => sizes.length > 1 ? sizes.filter((_, i) => i !== idx) : sizes);
  };



  function handleCollection(menuId){
    
    setshopCardMenuCat(menuId)
    setActiveCollection(collections.filter((item) => item.collectionFor === menuId))
    

  }

  return (
   
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up transition-all">
  
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Upload Product</h1>
        
        <form onSubmit={handlesubmit} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
           
            <div className="flex flex-col gap-3 flex-1">
              
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Product Name:</label>
                <input
                  type="text"
                  value={shopCardName}
                  onChange={(e) => setshopCardName(e.target.value)}
                  name="name"
                  placeholder="Enter title of the Product..."
                  className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
                  required
                />
              </div>
              {/* Product Price */}
              <div>
                <label htmlFor="price" className="block mb-1 font-medium">Price:</label>
                <input
                  type="number"
                  value={shopCardPrice}
                  onChange={(e) => setshopCardPrice(e.target.value)}
                  name="price"
                  placeholder="Enter Price of the Product..."
                  className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
                  required
                />
              </div>
              {/* Product Description */}
              <div>
                <label htmlFor="decription" className="block mb-1 font-medium">Description:</label>
                <textarea
                  value={shopCardDec}
                  onChange={(e) => setshopCardDec(e.target.value)}
                  name="decription"
                  placeholder="Enter few words about Product..."
                  className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
                  required
                />
              </div>
            </div>


            {/* Right column: Type, Material, Category */}
            <div className="flex flex-col gap-3 flex-1">
              {/* Product Type */}
              <div>
                <label htmlFor="type" className="block mb-1 font-medium">Product (New/Old):</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={shopCardType}
                  onChange={(e) => setshopCardType(e.target.value)}
                  name="type"
                  required
                >
                  <option value="">-Select Product Condition-</option>
                  <option value="New">New</option>
                  <option value="Old">Old</option>
                </select>
              </div>
              {/* Product Material */}
              <div>
                <label htmlFor="met" className="block mb-1 font-medium">Material Original Name:</label>
                <input
                  onChange={(e) => setshopCardMet(e.target.value)}
                  name="met"
                  className="w-full p-2 border border-gray-300 rounded-lg font-thin outline-none"
                  placeholder="Pant, Shirt, Saree, Jacket..."
                  type="text"
                  value={shopCardMet}
                  required
                />
              </div>

              <div>
                <label htmlFor="cat" className="block mb-1 font-medium">Under Which Collection Menu:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={shopCardMenuCat}
                  onChange={(e) => handleCollection(e.target.value)}
                  name="cat"
                  required
                >
                  <option value="">-Select Product for-</option>
                  {/* Dynamically populate from menu context */}
                  {menu &&
                    menu.filter((item)=>item.menuCat==='Categeroy 2').map((item,index)=>(
                      <option key={index} value={item._id}>{item.menuTitle}</option>
                    ))}
                </select>
              </div>
               
              {/* Product For (Category) */}
              <div>
                <label htmlFor="cat" className="block mb-1 font-medium">Under Which Collection:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={shopCardCat}
                  onChange={(e) => setshopCardCat(e.target.value)}
                  name="cat"
                  required
                >
                  <option value="">-Select Product for-</option>
                  {/* Dynamically populate from menu context */}
                  {activeCollection &&
                    activeCollection.map((item, index) => (
                      <option key={index} value={item._id}>{item.collectionTypeName}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {/* Image upload input */}
          <div>


            <div className="space-y-6">
              {/* Ask about sizes */}
              <div>
                <label className="font-semibold">Does this product have sizes?</label>
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    className={`px-4 py-1 rounded ${hasSize === true ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}
                    onClick={() => setHasSize(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-1 rounded ${hasSize === false ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}
                    onClick={() => setHasSize(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>


            {/* Size fields */}
            {hasSize && (
              <div className="space-y-4">
                <label className="block font-semibold">Sizes:</label>
                {sizes.map((size, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Size ${idx + 1}`}
                      value={size.value}
                      onChange={e => {
                        const updated = [...sizes];
                        updated[idx].value = e.target.value;
                        setSizes(updated);
                      }}
                      className="border rounded px-2 py-1"
                    />
                    {/* Color Picker */}
                    <input
                      type="color"
                      value={size.color}
                      onChange={e => {
                        const updated = [...sizes];
                        updated[idx].color = e.target.value;
                        setSizes(updated);
                      }}
                      className="w-8 h-8 border rounded"
                      title="Choose size color"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const updated = [...sizes];
                        updated[idx].image = e.target.files[0];
                        setSizes(updated);
                      }}
                      className="border rounded px-2 py-1"
                    />
                    {idx === sizes.length - 1 && (
                      <button type="button" onClick={() => setSizes([...sizes, { value: "", color: "#000000", image: null }])} className="text-blue-500 text-2xl font-bold px-2 hover:bg-blue-100 rounded">+</button>
                    )}
                    {/* Add (-) button if more than one field */}
                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeField(idx)}
                        className="text-red-500 text-2xl font-bold px-2 hover:bg-red-100 rounded"
                        title="Remove this size"
                      >−</button>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Ask about variants */}
            <div>
              <label className="font-semibold">Does this product have variants?</label>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  className={`px-4 py-1 rounded ${hasVariant === true ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}
                  onClick={() => setHasVariant(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`px-4 py-1 rounded ${hasVariant === false ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}
                  onClick={() => setHasVariant(false)}
                >
                  No
                </button>
              </div>
            </div>
            {/* Variant fields */}
            {hasVariant && (
              <div className="space-y-4">
                <label className="block font-semibold">Variants:</label>
                {variants.map((variant, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Variant ${idx + 1}`}
                      value={variant.value}
                      onChange={e => {
                        const updated = [...variants];
                        updated[idx].value = e.target.value;
                        setVariants(updated);
                      }}
                      className="border rounded px-2 py-1"
                    />
                    {/* Color Picker */}
                    <input
                      type="color"
                      value={variant.color}
                      onChange={e => {
                        const updated = [...variants];
                        updated[idx].color = e.target.value;
                        setVariants(updated);
                      }}
                      className="w-8 h-8 border rounded"
                      title="Choose variant color"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const updated = [...variants];
                        updated[idx].image = e.target.files[0];
                        setVariants(updated);
                      }}
                      className="border rounded px-2 py-1"
                    />
                    {idx === variants.length - 1 && (
                      <button type="button" onClick={() => setVariants([...variants, { value: "", color: "#000000", image: null }])} className="text-blue-500 text-2xl font-bold px-2 hover:bg-blue-100 rounded">+</button>
                    )}
                    {/* Add (-) button if more than one field */}
                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeField(idx)}
                        className="text-red-500 text-2xl font-bold px-2 hover:bg-red-100 rounded"
                        title="Remove this size"
                      >−</button>
                    )}

                  </div>
                ))}
              </div>
            )}




            <label className="block mb-1 font-medium">Product Image:</label>
            <input
              type="file"
              onChange={(e) => setmainImageFile(e.target.files[0])}
              name="shopCardImgUrl"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {/* Upload button with SVG animation */}
          <button type="submit" className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition shadow-lg">
            <svg height="20" width="20" viewBox="0 0 24 24" fill="none" className="mr-1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
            </svg>
            <span>Upload</span>
          </button>
          {/* Upload status message */}
          {uploadStatus && (
            <p className={`text-center mt-2 ${uploadStatus.includes("success") ? "text-green-600" : "text-blue-600"}`}>
              {uploadStatus}
            </p>
          )}
        </form>
        {/* Link to admin page */}
        <a className="block mt-6 text-blue-600 underline text-center" href="/admin/home">
          Go to Admin Page
        </a>
      </div>
      {/* Animation style for fade-in-up */}
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

export default UploadProductlist;
