import React from 'react';
import { BiPlayCircle, BiTimeFive } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';
import Loading from '../Components/Shared/Loading';
import useBlog from '../Hooks/useBlog';

const Blogs = () => {
    const[blogs,blogLoading] = useBlog();

    

    const navigate = useNavigate();
    const handleRoute = id =>{
        navigate(`/blogDetails/${id}`);
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'smooth'
          });
    }
    if(blogLoading){
        return <Loading/>
    }
    return (
      <div className='bg-white'>
        <div class="hero bg-banner" >
            <div class="hero-overlay bg-opacity-80 bg-primary"></div>
                <div class="hero-content text-center py-36">
                    
                    <div class="max-w-md">
                    <p className='text-white text-4xl'>Blog</p>
                    
                    </div>
                </div>
                </div>
          <div className='flex justify-center pt-20'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5 xl:grid-cols-3'>
                {
                    blogs.map(blog=>
                        <div class="max-w-sm overflow-hidden text-start cursor-pointer bg-gray-100 p-5" onClick={()=>handleRoute(blog._id)} >
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
                    <div class="py-4">
                        <div class="font-bold text-xl mb-2 pb-5 text-primary">
                            {blog.title}
                        </div>
                        
                        <p class="text-gray-700 text-base">
                        {blog.details}
                        </p>
                    </div>
                    <div class="pb-2 text-gray-400 flex justify-start w-full text-sm">
                        <button className='flex items-center '>
                            <BiTimeFive className='mr-1 text-xl'/> {blog.date}
                        </button>
                        <div className='mx-10'>|</div>
                        <button className='flex justify-center items-center'>
                            <BiPlayCircle className='mr-1 text-xl'/> Read More
                        </button>
                        
                    </div>
                    </div>
                        )
                }
            </div>
        </div>
        <Footer/>
      </div>
    );
};

export default Blogs;