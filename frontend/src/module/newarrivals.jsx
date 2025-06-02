import { useEffect, useState } from "react"
import axios from 'axios'

// Fetching ProductList
function NewArrivals() {
  const [collections, setcollections] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/collection/getlist")
        setcollections(res.data)
        console.log(res.data)
      } catch (err) {
        console.error("Fetching Failed:", err)
      }
    }
    fetchProduct()
  }, [])

  return (
    <>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden border border-black shadow-xl bg-white hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <img
                src={item.img}
                className="object-cover w-full h-48 sm:h-56 md:h-64 lg:h-72 transition duration-300 ease-in-out"
                alt={item.name}
              />
              <span className="absolute p-2 bg-red-500 top-3 left-3 border rounded-lg text-xs sm:text-sm font-semibold text-white">
                {item.productlife}
              </span>
              <div className="p-3 hover:bg-slate-100 transition duration-300 ease-in-out">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">{item.name}</h1>
                <p className="text-base sm:text-lg md:text-xl font-semibold">{item.price}</p>
                <p className="font-light text-xs sm:text-sm mb-2">{item.dec}</p>
                <div className="text-right">
                  <button className="pt-2 pb-2 pl-4 pr-4 rounded-md bg-blue-400 hover:bg-blue-600 text-white text-sm sm:text-base font-medium">
                    AddCart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NewArrivals
