function Footer() {
  return (
    <div className="footerimg p-4 sm:p-8 md:p-10 mt-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      {/* Newsletter Section */}
      <div className="p-2 mt-5 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 mt-12 sm:mt-20">
          Sign Up For Newsletter
        </h1>
        <p className="text-white text-sm sm:text-base">
          Subscribe to the weekly newsletter for all the latest updates
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-3 gap-2">
          <input
            className="outline-none bg-transparent border border-white p-2 rounded w-full sm:w-[350px] md:w-[500px] text-white placeholder-white"
            type="email"
            placeholder="Enter your email"
          />
          <button className="bg-white text-gray-900 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-white mt-8 rounded-2xl mx-auto flex flex-col md:flex-row justify-between items-start p-4 sm:p-8 gap-6 shadow-lg max-w-6xl">
        {/* Left: Brand & Contact */}
        <div className="w-full md:w-1/2">
          <div className="mt-3 mb-6">
            <h1 className="title_name text-2xl mb-4">Fashion Clothos</h1>
            <p className="font-thin italic text-gray-700 text-sm sm:text-base">
              'Glamour Galleries is your go-to destination for stylish and versatile fashion. From trendy designs to timeless classics, we curate a diverse collection that inspires confidence and creativity. With a focus on quality and customer satisfaction, we're here to help you stay fashionable and fabulous'
            </p>
          </div>
          <div className="mt-6">
            <table className="text-sm sm:text-base">
              <tbody>
                <tr>
                  <td className="pr-4 font-extralight">For Return Queries</td>
                  <td className="font-extralight">: +91 12345 67890</td>
                </tr>
                <tr>
                  <td className="pr-4 font-extralight">For Order Queries</td>
                  <td className="font-extralight">: +91 12345 67890</td>
                </tr>
                <tr>
                  <td className="pr-4 font-extralight">For Delivery Queries</td>
                  <td className="font-extralight">: +91 12345 67890</td>
                </tr>
                <tr>
                  <td className="pr-4 font-extralight">Write To Us</td>
                  <td className="font-extralight">: support@fashionclothos.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Links */}
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="text-xl font-semibold mb-2">Shop For</div>
            <div className="font-extralight flex flex-col gap-2">
              <p>Men's Wears</p>
              <p>Women's Wears</p>
              <p>Kids</p>
              <p>New Arrivals</p>
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold mb-2">Quick Links</div>
            <div className="font-extralight flex flex-col gap-2">
              <p>About Us</p>
              <p>Privacy Policy</p>
              <p>Return Policy</p>
              <p>T&C's</p>
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold mb-2">Follow Us On</div>
            <div className="font-extralight flex flex-col gap-2">
              <p>Twitter</p>
              <p>Facebook</p>
              <p>Instagram</p>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center text-white text-xs sm:text-sm mt-6 opacity-70">
        &copy; {new Date().getFullYear()} Fashion Clothos. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
