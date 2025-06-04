import { useContext,useState,useEffect } from "react";
import { ProductContext } from '../context/productContext';
import { useParams,useNavigate } from "react-router-dom";

function ProductList() {
   
   const { id } = useParams();
    const { products, handleAddcart, productIds } = useContext(ProductContext);
    const [selectedProducts,setSelectedProducts]=useState([])
    const [selectedNewProducts,setSelectedNewProducts]=useState([])
    const navigate=useNavigate()
    

   
useEffect(()=>{

    function filterProducts(){
        if(!id){return}
      const pdata=products.filter(item=>item.shopCardCat===id)
           setSelectedProducts(pdata)
        
    }
filterProducts()
   },[id])

const handleSubmit=(id)=>{
     navigate(`/productdetails/${id}`)
}
    return (
        <section className="bg-gray-50 py-6 antialiased dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl px-2 sm:px-4 2xl:px-0">
                {/* Breadcrumb and Header */}
                <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    <div>
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                                        {/* Home Icon */}
                                        <svg className="me-2.5 h-3 w-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                        </svg>
                                        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">Products</a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">Electronics</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h2 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl md:text-2xl">Electronics</h2>
                    </div>
                    {/* Filters and Sort */}
                    <div className="flex flex-wrap gap-2 items-center space-x-0 sm:space-x-4">
                        <button type="button" className="flex w-full sm:w-auto items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                            {/* Filter Icon */}
                            <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                            </svg>
                            Filters
                        </button>
                        <button type="button" className="flex w-full sm:w-auto items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                            {/* Sort Icon */}
                            <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                            </svg>
                            Sort
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    {selectedProducts && selectedProducts.map((item, idx) => (
                        <div key={item._id || idx} className="relative m-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                            <a className="relative mx-3 mt-3 flex h-48 sm:h-60 overflow-hidden rounded-xl" href="#">
                                <span className="absolute p-2 bg-red-500 top-3 left-3 border rounded-lg text-xs font-semibold text-white shadow">
                                {item.shopCardType}
                                </span>
                                <img className="object-cover w-full h-full" src={item.shopCardImgUrl} alt={item.shopCardName} />
                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">25% OFF</span>
                            </a>
                            <div className="mt-4 px-5 pb-5">
                                <a href="#">
                                    <h5 className="text-base sm:text-lg md:text-xl tracking-tight text-slate-900">{item.shopCardName}</h5>
                                </a>
                                <div className="mt-2 mb-5 flex flex-wrap items-center justify-between">
                                    <p>
                                        <span className="text-lg sm:text-2xl font-bold text-slate-900">{item.shopCardPrice * 0.75}</span>
                                        <span className="text-xs sm:text-sm text-slate-900 line-through ml-2">{item.shopCardPrice}</span>
                                    </p>
                                    <div className="flex items-center">
                                   
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} aria-hidden="true" className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        ))}
                                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSubmit(item._id)}
                                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    View Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="w-full text-center">
                    <button type="button" className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                        Show more
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductList;
