import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Swiper core and required modules
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper";
import "swiper/css";
// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../Shared/Loading";
import "./Slider.css";

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

const Slider = ({ catagory }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderProducts, setSliderProducts] = useState([]);
  const { filter } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fathomless-coast-84439.herokuapp.com/tools/${catagory}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredProducts(data);
        setSliderProducts(data.filter((item) => item.name !== filter));
        setLoading(false);
      });
  }, [catagory, sliderProducts, filter]);

  const handleProduct = (name) => {
    navigate(`/productDetails/${name}`);
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-10 px-5  mx-auto">
      <Swiper
        // loop={true}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 3,
          },
          1080: {
            width: 1080,
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {sliderProducts?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="avatar">
              <div className=" mx-auto">
                <img
                  className="object-top btn btn-primary"
                  src={item.img}
                  alt={item.name}
                  onClick={() => handleProduct(item.name)}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
