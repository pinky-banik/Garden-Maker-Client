import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const[blog,setBlog] = useState([]);
    const {blogId} = useParams();

    const {img,title,date,details} = blog;

    useEffect(()=>{
        fetch(`http://localhost:4000/blog/${blogId}`)
        .then(res=>res.json())
        .then(data=>setBlog(data));
    },[blog])

    return (
        <div className='pt-20 '>
            <div class="card w-96 bg-base-100 shadow-xl my-5">
            <figure class="avatar"><img src={img} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">{title}</h2>
                <p>{details}</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
        
        </div>
    );
};

export default BlogDetails;