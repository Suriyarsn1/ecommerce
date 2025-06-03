import { useEffect, useState,useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CollectionContext } from '../context/collectionContext'
import { UtilityContext } from '../context/menuContext'
function AdminUpdateProductList() {
  const { id } = useParams()
  const {menu}=useContext(UtilityContext)
  const { collections}=useContext(CollectionContext)
  const navigate = useNavigate()
  const [updateStatus, setUpdateStatus] = useState('')
  const [shopCardImg, setShopCardImg] = useState(null)
  const [previewImg, setPreviewImg] = useState('')
  const [sizes, setSizes] = useState([])
  const [variants, setVariants] = useState([])
  const [hasSize, setHasSize] = useState(false)
  const [hasVariant, setHasVariant] = useState(false)
  const [updateProduct, setUpdateProduct] = useState({
    shopCardName: '',
    shopCardDec: '',
    shopCardPrice: '',
    shopCardType: '',
    shopCardCat: '',
    shopCardMet: '',
    shopCardMenuCat: '',
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getproductlist/${id}`)
        console.log(res.data)        
        setUpdateProduct({
          shopCardName: res.data.shopCardName || '',
          shopCardDec: res.data.shopCardDec || '',
          shopCardPrice: res.data.shopCardPrice || '',
          shopCardType: res.data.shopCardType || '',
          shopCardCat: res.data.shopCardCat || '',
          shopCardMet: res.data.shopCardMet || '',
          shopCardMenuCat: res.data.shopCardMenuCat || '',
        })
        setPreviewImg(res.data.shopCardImgUrl)
        if (res.data.sizes && res.data.sizes.length > 0) {
          setHasSize(true)
          setSizes(res.data.sizes.map(size => ({
            value: size.value || "",
            color: size.color || "#000000",
            image: null,
            imageUrl: size.image || "",
          })))
        } else {
          setHasSize(false)
          setSizes([{ value: "", color: "#000000", image: null, imageUrl: "" }])
        }
        if (res.data.variants && res.data.variants.length > 0) {
          setHasVariant(true)
          setVariants(res.data.variants.map(variant => ({
            value: variant.value || "",
            color: variant.color || "#000000",
            image: null,
            imageUrl: variant.image || "",
          })))
        } else {
          setHasVariant(false)
          setVariants([{ value: "", color: "#000000", image: null, imageUrl: "" }])
        }
      } catch (err) {
        console.error("Fetching Failed:", err)
      }
    }
    fetchProduct()
  
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setUpdateProduct({ ...updateProduct, [name]: value })
  }

  function handleFileChange(e) {
    setShopCardImg(e.target.files[0])
    setPreviewImg(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateStatus('Updating...')
    const formData = new FormData()
    formData.append('shopCardName', updateProduct.shopCardName)
    formData.append('shopCardPrice', updateProduct.shopCardPrice)
    formData.append('shopCardDec', updateProduct.shopCardDec)
    formData.append('shopCardType', updateProduct.shopCardType)
    formData.append('shopCardMet', updateProduct.shopCardMet)
    formData.append('shopCardCat', updateProduct.shopCardCat)
    formData.append('shopCardMenuCat', updateProduct.shopCardMenuCat)
    formData.append('hasSize', hasSize)
    formData.append('hasVariant', hasVariant)
    formData.append('sizes', JSON.stringify(sizes))
    formData.append('variants', JSON.stringify(variants))
    if (shopCardImg) formData.append('shopCardImgUrl', shopCardImg)
    sizes.forEach((size) => { if (size.image) formData.append('sizesImages', size.image) })
    variants.forEach((variant) => { if (variant.image) formData.append('variantsImages', variant.image) })
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/update/${id}`, formData)
      setUpdateStatus('Update Details Successfully')
      
    } catch (err) {
      setUpdateStatus('Failed to Save')
    }
  }

  const addSizeField = () => setSizes([...sizes, { value: "", color: "#000000", image: null, imageUrl: "" }])
  const removeSizeField = (idx) => { if (sizes.length > 1) setSizes(sizes.filter((_, i) => i !== idx)) }
  const addVariantField = () => setVariants([...variants, { value: "", color: "#000000", image: null, imageUrl: "" }])
  const removeVariantField = (idx) => { if (variants.length > 1) setVariants(variants.filter((_, i) => i !== idx)) }

  const handleSizeChange = (idx, field, value) => {
    const updated = [...sizes]
    if (field === "image") {
      updated[idx].image = value
      updated[idx].imageUrl = value ? URL.createObjectURL(value) : updated[idx].imageUrl
    } else {
      updated[idx][field] = value
    }
    setSizes(updated)
  }

  const handleVariantChange = (idx, field, value) => {
    const updated = [...variants]
    if (field === "image") {
      updated[idx].image = value
      updated[idx].imageUrl = value ? URL.createObjectURL(value) : updated[idx].imageUrl
    } else {
      updated[idx][field] = value
    }
    setVariants(updated)
  }

// Menu and Collection filter


const [filterCollection,setfilterCollection]=useState([])
const [isActiveMenu, setActiveMenu] = useState(null);
const [clickedMenu,setClickedMenu]=useState(null)

useEffect(() => {
  if (menu && updateProduct.shopCardMenuCat) {
    const foundMenu = menu.find(
      item =>
        item.menuCat === 'Categeroy 2' &&
        item._id === updateProduct.shopCardMenuCat
    );
    setActiveMenu(foundMenu.menuTitle || null);
  }
}, [menu, updateProduct.shopCardMenuCat]);


  function handleCollection(menuId){
   if(collections&&menuId){
    const filterCollectionsData=collections.filter((item) => item.collectionFor === menuId)
    setfilterCollection(filterCollectionsData)
    const clickMenuData=menu.find(item=>item._id===menuId)
    // isActiveMenu((prve)=>({...prve,menuTitle:clickMenuData.menuTitle}))
   }
    }

console.log(isActiveMenu)





  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 p-4">
      <div className="w-full max-w-2xl bg-white/80 rounded-3xl shadow-2xl p-8 animate-fade-in-up border border-blue-100">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue-800">Update Product</h1>
        <form id="admin-update-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Product Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="shopCardName" className="block mb-1 font-medium text-blue-700">Product Name:</label>
              <input
                type="text"
                id="shopCardName"
                name="shopCardName"
                value={updateProduct.shopCardName}
                onChange={handleChange}
                className="w-full p-2 border border-blue-100 rounded-lg outline-none font-thin bg-blue-50 focus:ring-2 focus:ring-blue-100 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="shopCardPrice" className="block mb-1 font-medium text-blue-700">Price:</label>
              <input
                type="number"
                id="shopCardPrice"
                name="shopCardPrice"
                value={updateProduct.shopCardPrice}
                onChange={handleChange}
                className="w-full p-2 border border-blue-100 rounded-lg outline-none font-thin bg-blue-50 focus:ring-2 focus:ring-blue-100 transition"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="shopCardDec" className="block mb-1 font-medium text-blue-700">Description:</label>
              <textarea
                id="shopCardDec"
                name="shopCardDec"
                value={updateProduct.shopCardDec}
                onChange={handleChange}
                className="w-full p-2 border border-blue-100 rounded-lg outline-none font-thin bg-blue-50 focus:ring-2 focus:ring-blue-100 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="shopCardType" className="block mb-1 font-medium text-blue-700">Product (New/Old):</label>
              <select
                id="shopCardType"
                name="shopCardType"
                value={updateProduct.shopCardType}
                onChange={handleChange}
                className="w-full p-2 border border-blue-100 rounded-lg bg-blue-50"
                required
              >
                <option value="">Select Type</option>
                <option value="New">New</option>
                <option value="Old">Old</option>
              </select>
            </div>
            <div>
              <label htmlFor="shopCardMet" className="block mb-1 font-medium text-blue-700">Product Material:</label>
              <select
                id="shopCardMet"
                name="shopCardMet"
                value={updateProduct.shopCardMet}
                onChange={handleChange}
                className="w-full p-2 border border-blue-100 rounded-lg bg-blue-50"
                required
              >
                <option value="">Select Material</option>
                <option value="Pant">Pant</option>
                <option value="Shirt">Shirt</option>
                <option value="Saree">Saree</option>
                <option value="KidsCloths">KidsCloth</option>
              </select>
            </div>
            <div>
              <label htmlFor="shopCardCat" className="block mb-1 font-medium text-blue-700">Under Menu Collection:</label>
              <select
               value
                id="shopCardCat"
                name="shopCardCat"
                onChange={(e)=>handleCollection(e.target.value)}
                className="w-full p-2 border border-blue-100 rounded-lg bg-blue-50"
                required
              >
               {} <option>{isActiveMenu&&isActiveMenu}</option>
                   {menu&&
                    menu.filter((item) =>( item.menuCat === 'Categeroy 2')).map((item,idx)=>(
                      <option key={idx} value={item._id}>{item.menuTitle}</option>
                    ))} 
              </select>
            </div>
             <div>
              <label htmlFor="shopCardCat" className="block mb-1 font-medium text-blue-700">Under Collection:</label>
              <select
                id="shopCardCat"
                name="shopCardCat"
                // value={collections&&
                //     collections.filter((item)=>item._id===updateProduct.shopCardCat)}
                onChange={handleChange}
                className="w-full p-2 border border-blue-100 rounded-lg bg-blue-50"
                required
              >
               {} <option value="">Select Category</option>
                   {filterCollection&&
                    filterCollection.map((item,idx) =>(
                      <option key={idx} value={item._id}>{item.collectionTypeName}</option>))}  
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-blue-700">Selected Product Image:</label>
              {previewImg && (
                <img
                  src={previewImg}
                  alt="Product Preview"
                  className="mb-2 w-full h-40 object-cover rounded-xl border border-blue-100 shadow"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-blue-100 rounded-lg bg-blue-50"
              />
            </div>
          </div>

          {/* Sizes */}
          {hasSize && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <label className="block font-semibold text-blue-700 mb-2">Sizes:</label>
              {sizes.map((size, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Size ${idx + 1}`}
                    value={size.value}
                    onChange={e => handleSizeChange(idx, "value", e.target.value)}
                    className="border border-blue-100 rounded px-2 py-1 bg-white"
                  />
                  <input
                    type="color"
                    value={size.color}
                    onChange={e => handleSizeChange(idx, "color", e.target.value)}
                    className="w-8 h-8 border rounded"
                  />
                  {size.imageUrl && (
                    <img
                      src={size.imageUrl}
                      alt="Size preview"
                      className="w-10 h-10 object-cover rounded border border-blue-100"
                      style={{ minWidth: 40, minHeight: 40 }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleSizeChange(idx, "image", e.target.files[0])}
                    className="border border-blue-100 rounded px-2 py-1 bg-white"
                  />
                  {idx === sizes.length - 1 && (
                    <button type="button" onClick={addSizeField} className="text-blue-500 text-2xl font-bold px-2 hover:bg-blue-100 rounded">+</button>
                  )}
                  {sizes.length > 1 && (
                    <button type="button" onClick={() => removeSizeField(idx)} className="text-red-400 text-2xl font-bold px-2 hover:bg-red-100 rounded">−</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Variants */}
          {hasVariant && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <label className="block font-semibold text-blue-700 mb-2">Variants:</label>
              {variants.map((variant, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Variant ${idx + 1}`}
                    value={variant.value}
                    onChange={e => handleVariantChange(idx, "value", e.target.value)}
                    className="border border-blue-100 rounded px-2 py-1 bg-white"
                  />
                  <input
                    type="color"
                    value={variant.color}
                    onChange={e => handleVariantChange(idx, "color", e.target.value)}
                    className="w-8 h-8 border rounded"
                  />
                  {variant.imageUrl && (
                    <img
                      src={variant.imageUrl}
                      alt="Variant preview"
                      className="w-10 h-10 object-cover rounded border border-blue-100"
                      style={{ minWidth: 40, minHeight: 40 }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleVariantChange(idx, "image", e.target.files[0])}
                    className="border border-blue-100 rounded px-2 py-1 bg-white"
                  />
                  {idx === variants.length - 1 && (
                    <button type="button" onClick={addVariantField} className="text-blue-500 text-2xl font-bold px-2 hover:bg-blue-100 rounded">+</button>
                  )}
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariantField(idx)} className="text-red-400 text-2xl font-bold px-2 hover:bg-red-100 rounded">−</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Submit button and status */}
          <button
            className="bg-blue-200 hover:bg-blue-400 text-blue-800 font-semibold py-2 rounded-full transition"
            type="submit"
          >
            {updateStatus === 'Updating...' ? 'Updating...' : 'Update'}
          </button>
          {updateStatus && (
            <p className={`text-center mt-2 ${updateStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
              {updateStatus}
            </p>
          )}
        </form>
        <a className="block mt-6 text-blue-600 underline text-center" href="/admin">
          Go to Admin Page
        </a>
      </div>
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
  )
}

export default AdminUpdateProductList
