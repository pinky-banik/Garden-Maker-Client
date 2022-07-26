import React, { useEffect, useState } from 'react';
import Loading from '../Components/Shared/Loading';

const useBlog = () => {
    const[blogs,setBlogs] = useState([]);
    const[blogLoading,setBlogLoading] = useState(false);


    useEffect(()=>{
        fetch("http://localhost:4000/blog")
        .then(res=>res.json())
        .then(data=>{
            setBlogs(data)
            setBlogLoading(false);
        });

    },[blogs])
    return [blogs,blogLoading];
};

export default useBlog;