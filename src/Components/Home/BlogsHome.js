import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBlog from '../../Hooks/useBlog';
import Loading from '../Shared/Loading';

const BlogsHome = () => {
    const[blogs,blogLoading] = useBlog();

    

    const navigate = useNavigate();
    const handleRoute=id=>{
        navigate(`/blogDetails/${id}`);
    }
    if(blogLoading){
        return <Loading/>
    }

    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='my-10 text-4xl text-center'> Latest post</h1>
            <div className='flex justify-center'>
        <div className='grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-5'>
            {
                blogs.slice((blogs.length-3),blogs.length).map(blog=>
                    <div key={blog._id} className=" md:w-fit bg-base-100 p-5">
                    <div className='flex justify-center items-center'>
                    <div>
                    <div class="avatar ">
                    <div style={{backgroundImage: `url('${blog.img}')`}}  className='group w-full sm:h-72 lg:h-96 h-56 bg-cover object-center rounded-lg shadow-md  justify-center'>
                        <div className='bg-secondary w-full h-full flex justify-center items-center bg-opacity-0 hover:bg-opacity-80
                        trasition duration-500 hover:rounded-lg'>
                        <button onClick={()=>handleRoute(blog._id)} className='hidden w-36 h-12 group-hover:block btn btn-primary '>Learn more</button>
                        </div>
                       
                    {/* <img src={cata.img} alt="random imgee" className="w-full h-56 lg:h-96 object-cover object-center rounded-lg shadow-md"/>  */}
                    </div>   
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
                    
                    </div>
                    
                    
                    </div>
                    )
            }
        </div>
        </div>
        <div className='my-5 flex justify-center'>
            <button onClick={()=>navigate("/blogs")} className='btn'>Watch More</button>
        </div>

        </div>
    );
};

export default BlogsHome;