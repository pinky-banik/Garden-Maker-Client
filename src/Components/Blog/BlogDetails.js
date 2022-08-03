import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useBlog from '../../Hooks/useBlog';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import BlogSlider from './BlogSlider';

const BlogDetails = () => {
    const[blog,setBlog] = useState([]);
    const {blogId} = useParams();
    const[blogs,blogLoading] = useBlog();


    

    const navigate = useNavigate();

    const handleRoute=id=>{
        navigate(`/blogDetails/${id}`);
    }


    const {img,title,date,details} = blog;

    useEffect(()=>{
        fetch(`http://localhost:4000/blog/${blogId}`)
        .then(res=>res.json())
        .then(data=>setBlog(data));
    },[blog])
    if(blogLoading){
        return <Loading/>
    }

    return (
        <div className='pt-20 '>
            <div className="card w-96 bg-base-100 shadow-xl my-5">
            <figure className="avatar"><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{details}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
            <BlogSlider />
            <Footer/>
        </div>
    );
};

export default BlogDetails;