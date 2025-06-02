 import summerBg from '../Assets/offerimage.jpeg';    // Replace with your actual image paths
// import flashBg from '../Assets/flash_offer.jpg';

function Offerbox() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 min-h-[300px]">

      <div
        className="relative rounded-2xl overflow-hidden p-0 flex items-center group animate-fade-in-up"
        style={{
          minHeight: '300px',
        }}
      >
       
        <img
          src=""
          alt="Summer Sale"
          className="absolute inset-0 w-full h-full object-cover z-0 scale-110 group-hover:scale-125 transition-transform duration-700"
          style={{ filter: 'brightness(0.7)' }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/70 via-gray-300/60 to-emerald-400/60 z-10" />
        {/* Content */}
        <div className="relative z-20 p-6 animate-fade-in-up">
          <p className="text-red-500 text-sm sm:text-base mb-2 drop-shadow">Get 25% off on all your favourite picks.</p>
          <h1 className="text-3xl sm:text-4xl font-extralight mb-2 text-white drop-shadow-lg">SUMMER SALE</h1>
          <p className="mb-4 text-sm sm:text-base text-white drop-shadow">Coupon Code: SUMMER25</p>
          <button className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-5 rounded-md text-sm sm:text-base transition shadow-lg hover:scale-105">
            Shop now
          </button>
        </div>
      </div>

    
      <div
        className="relative rounded-2xl overflow-hidden p-0 flex items-center group animate-fade-in-up"
        style={{
          minHeight: '300px',
          animationDelay: '0.2s'
        }}
      >
    
        <img
          src={summerBg }
          alt="Flash Sale"
          className="absolute inset-0 w-full h-full z-0 scale-110 group-hover:scale-125 transition-transform duration-700"
          style={{ filter: 'brightness(0.7)' }}
        />
     
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/70 via-orange-300/60 to-orange-400/60 z-10" />
        {/* Content */}
        <div className="relative z-20 p-6 animate-fade-in-up">
          <p className="text-red-500 text-sm sm:text-base mb-2 drop-shadow">Get up to 50% on our top picks</p>
          <h1 className="text-3xl sm:text-4xl font-extralight mb-2 text-white drop-shadow-lg">FLASH SALE ALERT</h1>
          <p className="mb-4 text-sm sm:text-base text-white drop-shadow">Limited time offer.</p>
          <button className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-5 rounded-md text-sm sm:text-base transition shadow-lg hover:scale-105">
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Offerbox;
