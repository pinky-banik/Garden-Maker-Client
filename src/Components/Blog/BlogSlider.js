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
import { BiTimeFive, BiPlayCircle } from 'react-icons/bi';

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);


const BlogSlider = () => {
    const[blogs,setBlogs] = useState([]);
    // console.log(blogs);
    const {blogId} = useParams();
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(`https://fathomless-coast-84439.herokuapp.com/blog`)
        .then(res=>res.json())
        .then(data=>{
          setBlogs(data.filter(item=>item._id !==blogId));   
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
        <div className='p-10 px-5  mx-auto'>
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
    1080: {
      width: 1080,
      slidesPerView: 3,
    },
  }}
  
  spaceBetween={30} keyboard={{
            "enabled": true
        }} pagination={{
            "clickable": true,
        }}
         loop={true}
         navigation={true}
          className="mySwiper">
            {blogs.map((blog,index) => (
                <SwiperSlide key={index} >
                    {/* <div className="avatar">
                                <div className=" mx-auto">
                                    <img className='object-top' src={item.img} alt={item.name} onClick={()=>handleRoute(item._id)} />
                                </div>
                                </div>  */}
                    <div className="max-w-sm overflow-hidden text-start cursor-pointer bg-gray-100 p-5" onClick={()=>handleRoute(blog._id)} >
                    <div>
                    <div>
                    <div style={{backgroundImage: `url('${blog.img}')`}}  className='group w-full h-72 bg-cover bg-center   justify-center'>
                        <div className='bg-secondary w-full h-full flex justify-center items-center bg-opacity-0 hover:bg-opacity-80
                        trasition duration-500 '>
                        <button onClick={()=>handleRoute(blog._id)} className='hidden w-36 h-12 group-hover:block btn btn-primary '>Learn more</button>
                        </div>
                     </div>   
                    </div>
                    </div>
                    <div className="py-4">
                        <div className="font-bold text-xl mb-2 pb-5 text-primary">
                            {blog.title}
                        </div>
                        
                        <p className="text-gray-700 text-base line-clamp-5">
                        {blog.details}
                        </p>
                    </div>
                    <div className="pb-2 text-gray-400 flex justify-start w-full text-sm">
                        <button className='flex items-center '>
                            <BiTimeFive className='mr-1 text-xl'/> {blog.date}
                        </button>
                        <div className='mx-10'>|</div>
                        <button className='flex justify-center items-center'>
                            <BiPlayCircle className='mr-1 text-xl'/> Read More
                        </button>
                        
                    </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    )
}

export default BlogSlider;