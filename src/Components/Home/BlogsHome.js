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
        <div>
            <h1 className='my-10 text-4xl text-center'> Latest post</h1>
            <div className='flex justify-center'>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
            {
                blogs.slice((blogs.length-3),blogs.length).map(blog=>
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
        <div className='my-5 flex justify-center'>
            <button onClick={()=>navigate("/blogs")} className='btn'>Watch More</button>
        </div>

        </div>
    );
};

export default BlogsHome;