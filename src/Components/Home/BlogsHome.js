import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBlog from '../../Hooks/useBlog';
import Loading from '../Shared/Loading';
import {BiTimeFive,BiPlayCircle} from 'react-icons/bi';

const BlogsHome = () => {
    const[blogs,blogLoading] = useBlog();

    

    const navigate = useNavigate();
    const handleRoute=id=>{
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
        <div className='w-11/12 mx-auto pb-10 '>
            <h1 className='text-center text-2xl lg:text-4xl  font-bold mt-20 uppercase'> Latest post</h1>
            <div className='border border-accent round-2xl w-28 mx-auto my-5'></div>
            <div className='flex justify-center'>
        <div className='grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-5'>
            {
                blogs.slice((blogs.length-3),blogs.length).map(blog=>
                    <div key={blog._id} className=" md:w-fit bg-base-100 p-5">
                    {/* <div className='flex justify-center items-center'>
                    <div>
                    <div className="avatar ">
                    <div style={{backgroundImage: `url('${blog.img}')`}}  className='group w-full sm:h-72 lg:h-96 h-56 bg-cover object-center rounded-lg shadow-md  justify-center'>
                        <div className='bg-secondary w-full h-full flex justify-center items-center bg-opacity-0 hover:bg-opacity-80
                        trasition duration-500 hover:rounded-lg'>
                        <button onClick={()=>handleRoute(blog._id)} className='hidden w-36 h-12 group-hover:block btn btn-primary '>Learn more</button>
                        </div>
                       
                    {/* <img src={cata.img} alt="random imgee" className="w-full h-56 lg:h-96 object-cover object-center rounded-lg shadow-md"/>  */}
                    {/* </div>   
                    </div>
                    <div className="py-3">
                        <h2 className="card-title">
                        {blog.title}
                        </h2>
                        <p>{blog.details}</p>
                        <div className="card-actions justify-start my-5">
                        <div >{blog.date}</div> 
                        </div>
                    </div>
                    
                    </div>
                    
                    </div> */} 
                    
                    <div className="max-w-sm overflow-hidden ">
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
                        
                        <p className="text-gray-700 text-base line-clamp-3">
                        {blog.details}
                        </p>
                    </div>
                    <div className="pb-2 text-gray-400 flex justify-start w-full text-sm">
                        <button className='flex items-center '>
                            <BiTimeFive className='mr-1 text-xl'/> {blog.date}
                        </button>
                        <div className='mx-10'>|</div>
                        <button className='flex justify-center items-center' onClick={()=>handleRoute(blog._id)}>
                            <BiPlayCircle className='mr-1 text-xl'/> Read More
                        </button>
                        
                    </div>
                    </div>
                    </div>
                    )
            }
        </div>
        </div>
        <div className='my-5 flex justify-center'>
            <button onClick={()=>navigate("/blogs")} className='btn btn-primary'>Watch More</button>
        </div>
        
        </div>
    );
};

export default BlogsHome;