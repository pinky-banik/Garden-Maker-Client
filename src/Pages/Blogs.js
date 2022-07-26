import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Shared/Loading';
import useBlog from '../Hooks/useBlog';

const Blogs = () => {
    const[blogs,blogLoading] = useBlog();

    

    const navigate = useNavigate();
    const handleRoute=id=>{
        navigate(`/blogDetails/${id}`);
    }
    if(blogLoading){
        return <Loading/>
    }
    return (
        <div className='flex justify-center pt-20'>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                {
                    blogs.map(blog=>
                        <div class="card w-96 bg-base-100 shadow-xl">
                        <figure>
                            <img src={blog.img} alt={blog.title} />   
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">
                            {blog.title}
                            </h2>
                            <p>{blog.details}</p>
                            <div class="card-actions justify-start my-5">
                            <div >{blog.date}</div> 
                            <div className='mx-10' ><button onClick={()=>handleRoute(blog._id)} className='btn'>Read more</button></div>
                            </div>
                        </div>
                        </div>
                        )
                }
            </div>
        </div>
    );
};

export default Blogs;