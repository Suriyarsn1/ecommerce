import { useContext } from "react";
import { ProductContext } from '../context/productContext';
import { CollectionContext } from "../context/collectionContext";
import { useNavigate } from "react-router-dom";

function CollectionList() {
  const { productIds } = useContext(ProductContext);
  const { collections, isActiveCollection } = useContext(CollectionContext);
  const navigate=useNavigate()


  function handleProducts(productId){
  
    navigate(`/productlist/${productId}`)
}

  return (
    <div className="container flex mx-auto px-4 py-8">
      <div className="flex flex-row flex-wrap gap-6 justify-center">
        {isActiveCollection && isActiveCollection.map((item) => (
          <article
            key={item._id} onClick={()=>handleProducts(item._id)}
            className="cursor-pointer
              group relative isolate flex flex-col justify-end 
              overflow-hidden rounded-2xl px-6 pb-8 pt-40 
              w-full sm:w-80 md:w-96 shadow-lg bg-white 
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-2xl
            "
          >
            <img
              src={item.collectionImgUrl}
              alt={item.collectionName}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900 via-gray-300/10" />
            <h3 className="z-10 mt-3 text-2xl sm:text-3xl font-bold text-black">
              {item.collectionName}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CollectionList;
