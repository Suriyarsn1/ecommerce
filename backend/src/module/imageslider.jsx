import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

const ImageSlider = ({ slides }) => {







  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 0 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="image-slider" style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slider-image-wrapper relative">
            <img
              src={slide.img}
              alt={slide.title || `slide-${index}`}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 600,
                objectFit: 'cover',
                borderRadius: '12px',
                margin: '0 auto'
              }}
            />
            {/* Stylish text overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-center z-10"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                borderRadius: '12px'
              }}
            >
              <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg text-center">
                {slide.title}
              </h2>
              <p className="text-white text-base sm:text-xl md:text-2xl font-light drop-shadow text-center max-w-2xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
