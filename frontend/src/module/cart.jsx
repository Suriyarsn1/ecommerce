import { Authcontext } from '../context/authContexts'
import { useContext } from "react"
import { CartContext } from '../context/CartContext'

// Cartlist component: Displays the user's shopping cart
function Cartlist() {
    // Get auth token and cart context values
    const { token } = useContext(Authcontext)
    const { cartProduct, total, isLoading, handleremove, handleChangeQty, decrementQty, incrementQty, handleChecked } = useContext(CartContext)
console.log(cartProduct)
    return (
        <>
            {/* Main container with padding and flex wrap for responsiveness */}
            <div className='p-5 flex flex-wrap'>
                <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        {/* Cart page heading */}
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                        {/* Cart and summary layout */}
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            {/* Cart items list */}
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {/* Show loading, empty, or cart items */}
                                    {isLoading ? (
                                        <p>Your Cart is Loading</p>
                                    ) : !cartProduct.length ? (
                                        <p>Your Cart is empty</p>
                                    ) : cartProduct.map((item, index) => (
                                        // Individual cart item card
                                        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                            {/* Checkbox to select item */}
                                            <input
                                                type='checkbox'
                                                onChange={(e) => handleChecked(item.productId._id, e.target.checked)}
                                            />

                                            {/* Product details and quantity controls */}
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                {/* Product image */}
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <img className="h-20 w-20 dark:hidden" src={item.productId.shopCardImgUrl} alt="product" />
                                                </a>
                                                {/* Size Control */}
                                                 <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        <label>Size:</label>
                                                    <select name="" id="" >
                                                        <option>{item.size}</option>
                                                        {item.productId.sizes&&item.productId.sizes.length>0?item.productId.sizes.map((size,idx)=>(
                                                            <option key={idx} value={size.value}>{size.value}</option>
                                                        )):''}
                                                        
                                                    </select>
                                                    </div>
                                                    {/* Item price */}
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">
                                                            ₹{item.quantity * item.productId.shopCardPrice}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Quantity controls */}
                                                <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        {/* Decrement quantity button */}
                                                        <button
                                                            onClick={() => decrementQty(item.productId._id, item.quantity - 1)}
                                                            disabled={item.quantity < 2}
                                                            type="button"
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                        >
                                                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        {/* Quantity input */}
                                                        <input
                                                            type="text"
                                                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                                            value={item.quantity}
                                                            onChange={(e) => handleChangeQty(item.productId._id, e.target.value)}
                                                        />
                                                        {/* Increment quantity button */}
                                                        <button
                                                            onClick={() => incrementQty(item.productId._id, item.quantity + 1)}
                                                            type="button"
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                        >
                                                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    {/* Item price */}
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">
                                                            ₹{item.quantity * item.productId.shopCardPrice}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Product name, description, and actions */}
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <div className='flex flex-col'>
                                                        <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.productId.shopCardName}</a>
                                                        <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.productId.shopCardDec}</a>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        {/* Add to Favorites button (not implemented) */}
                                                        <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                            </svg>
                                                            Add to Favorites
                                                        </button>
                                                        {/* Remove item button */}
                                                        <button
                                                            onClick={() => handleremove(item.productId._id)}
                                                            type="button"
                                                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                        >
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order summary section */}
                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                        ₹{total.subTotal ? total.subTotal.toFixed(2) : "00.00"}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>

                                        {/* Proceed to checkout button */}
                                        <a href="/user/checkout">
                                            <button className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black border border-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Proceed to Checkout
                                            </button>
                                        </a>

                                        {/* Continue shopping link */}
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                                Continue Shopping
                                                <svg className="h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Cartlist
