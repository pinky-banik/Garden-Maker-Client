import React from 'react';
import Banner from '../Components/Home/Banner';
import BlogsHome from '../Components/Home/BlogsHome';
import Business from '../Components/Home/Business';
import ProductsHome from '../Components/Home/ProductsHome';
import Speciality from '../Components/Home/Speciality';
import Footer from '../Components/Shared/Footer';

const Home = () => {
    const date = new Date();
    // console.log(date);
    
    return (

        <div >
           <Banner/>
           <Speciality/>
           <ProductsHome/>
           <Business/>
           <BlogsHome/>
           <Footer/>
        </div>
    );
};

export default Home;