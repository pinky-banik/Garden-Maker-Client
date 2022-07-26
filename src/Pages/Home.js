import React from 'react';
import Banner from '../Components/Home/Banner';
import BlogsHome from '../Components/Home/BlogsHome';
import ProductsHome from '../Components/Home/ProductsHome';

const Home = () => {
    const date = new Date();
    console.log(date);
    
    return (

        <div >
           <Banner/>
           <ProductsHome/>
           <BlogsHome/>
        </div>
    );
};

export default Home;