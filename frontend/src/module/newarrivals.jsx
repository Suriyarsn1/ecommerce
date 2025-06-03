import { useEffect, useState,useContext } from "react"
import axios from 'axios'
import { ProductContext } from "../context/productContext"

// Fetching ProductList
function NewArrivals() {
  const [collections, setcollections] = useState([])
  const {products}=useContext(ProductContext)
  console.log(products)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/collection/getlist`)
        setcollections(res.data)
      } catch (err) {
        console.error("Fetching Failed:", err)
      }
    }
    fetchProduct()
  }, [])

  const handleSubmit=(id)=>
  {
    // navigalte(`/productlist/${id}`) 
  }

  return (
    <>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">New Arrivals</h2>
        <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden border border-black shadow-xl bg-white hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
              onClick={()=>handleSubmit(item._id)}
            >
              <img
                src={item.shopCardImgUrl}
                className="object-cover w-full sm:h-56 md:h-64 lg:h-72 transition duration-300 ease-in-out"
                alt={item.name}
              />
              <span className="absolute p-2 bg-red-500 top-3 left-3 border rounded-lg text-xs font-semibold text-white shadow">
              {item.shopCardType}
            </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NewArrivals
