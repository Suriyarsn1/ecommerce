import ImageSlider from './imageslider'
import Slide1 from '../Assets/title_img1.jpg'
import Slide2 from '../Assets/title_img2.jpg'
import Slide3 from '../Assets/title_img3.jpg'
import Productlist from './homeCollectionlist'
import Newarrivals from './newarrivals'
import Offerbox from './offerbox'
import Partysession from './partysession'
import Policy from './policy'
import Navbar from './navebar'
import HomeMenu1 from './homemenu1'
import HomeMenu2 from './homemenu2'
import Footer from './footer'
import NewArrivals from './newarrivals'



const slides = [
  {
    img: Slide1,
    title: "Welcome to Summer!",
    subtitle: "Discover the latest trends and enjoy exclusive offers."
  },
  {
    img: Slide2,
    title: "Flash Sale",
    subtitle: "Up to 50% off on select items. Limited time only!"
  },
  {
    img: Slide3,
    title: "New Arrivals",
    subtitle: "Check out our fresh collection for the season."
  }
];




function Home() {
    return (
        <>
            <div>
                <HomeMenu1 />
            </div>
            <div className="my-4 sm:my-6 md:my-8">
                <ImageSlider slides={slides} />
            </div>
            <div>
                <HomeMenu2 />
            </div>
            <div className="my-6 sm:my-8 md:my-12">
                <Productlist />
            </div>
            <section className="px-2 sm:px-4 md:px-8 py-4 sm:py-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-center mt-16 sm:mt-20 md:mt-28 mb-3">
                    New Arrivals
                </h1>
                <div className="mt-4">
                    <NewArrivals/>
                </div>
            </section>
            <section className="my-6 sm:my-8 md:my-12">
                <Offerbox />
            </section>
            <section className="mt-8 sm:mt-12 px-2 sm:px-4 md:px-8">
                <div className="mb-5">
                    <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-medium mb-3">
                        Make a fashion statement every season
                    </h1>
                    <p className="text-gray-400 text-center text-lg sm:text-xl md:text-2xl">
                        Shop for the occasion you need!
                    </p>
                </div>
                <Partysession />
            </section>
            <div className="mt-8 sm:mt-10">
                <Policy />
            </div>
            <Footer />
        </>
    );
}

export default Home;
