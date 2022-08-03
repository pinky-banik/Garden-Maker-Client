import React from 'react';
import Banner from '../Components/Home/Banner';
import BlogsHome from '../Components/Home/BlogsHome';
import ProductsHome from '../Components/Home/ProductsHome';
import Footer from '../Components/Shared/Footer';

const Home = () => {
    const date = new Date();
    // console.log(date);
    
    return (

        <div >
           <Banner/>
           <ProductsHome/>
           <BlogsHome/>
           <Footer/>
        </div>
    );
};

export default Home;