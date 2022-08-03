import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Swiper core and required modules
import SwiperCore, {
    Keyboard, Navigation, Pagination
} from 'swiper';
import "swiper/css";
// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);


const BlogSlider = () => {
    const[blogs,setBlogs] = useState([]);
    // console.log(blogs);

    
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(`http://localhost:4000/blog`)
        .then(res=>res.json())
        .then(data=>{
          setBlogs(data);   
        });
    },[blogs]);

    const handleRoute = id =>{
        navigate(`/blogDetails/${id}`);
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'smooth'
          });
    }
    return (
        <div className='p-10 px-5 lg:w-3/4 mx-auto'>
            <Swiper  breakpoints={{
    // when window width is >= 640px
    640: {
      width: 640,
      slidesPerView: 1,
    },
    // when window width is >= 768px
    768: {
      width: 768,
      slidesPerView: 2,
    },
  }}
  spaceBetween={30} keyboard={{
            "enabled": true
        }} pagination={{
            "clickable": true,
        }} navigation={true} className="mySwiper">
            {blogs.map((item,index) => (
                <SwiperSlide key={index}>
                    <div className="avatar">
                                <div className=" mx-auto">
                                    <img className='object-top' src={item.img} alt={item.name} onClick={()=>handleRoute(item._id)} />
                                </div>
                                </div> 
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    )
}

export default BlogSlider;