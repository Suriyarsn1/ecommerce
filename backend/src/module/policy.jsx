import call from '../Assets/icons/call1.png'
import shipping from '../Assets/icons/shipping.png'
import shipping1 from '../Assets/icons/shippingf.png'
import return1 from '../Assets/icons/return.png'

function Policy() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div className="flex gap-2 border border-black p-3 items-center rounded-lg bg-white hover:bg-blue-300 hover:text-white transition">
        <img src={call} className="w-10 h-10" alt="Worldwide Shipping" />
        <p className="text-base sm:text-lg font-medium">Worldwide Shipping</p>
      </div>
      <div className="flex gap-2 border border-black p-3 items-center rounded-lg bg-white hover:bg-blue-300 hover:text-white transition">
        <img src={shipping} className="w-10 h-10" alt="24/7 Stellar Support" />
        <p className="text-base sm:text-lg font-medium">24/7 Stellar Support</p>
      </div>
      <div className="flex gap-2 border border-black p-3 items-center rounded-lg bg-white hover:bg-blue-300 hover:text-white transition">
        <img src={return1} className="w-10 h-10" alt="30 Days Return Policy" />
        <p className="text-base sm:text-lg font-medium">30 Days Return Policy</p>
      </div>
      <div className="flex gap-2 border border-black p-3 items-center rounded-lg bg-white hover:bg-blue-300 hover:text-white transition">
        <img src={shipping1} className="w-10 h-10" alt="Free Shipping across TN" />
        <p className="text-base sm:text-lg font-medium">Free Shipping across TN</p>
      </div>
    </div>
  )
}

export default Policy
