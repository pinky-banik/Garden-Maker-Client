import React from 'react';
import Banner from '../Components/Home/Banner';
import BlogsHome from '../Components/Home/BlogsHome';
import Business from '../Components/Home/Business';
import ProductsHome from '../Components/Home/ProductsHome';
import Speciality from '../Components/Home/Speciality';
import Testimonials from '../Components/Home/Testimonials';
import Footer from '../Components/Shared/Footer';
import Navbar from '../Components/Shared/Navbar';

const Home = () => {
    
    return (

        <div >
           <Navbar/>
           <Banner/>
           <Speciality/>
           <ProductsHome/>
           <Business/>
           <BlogsHome/>
           <Testimonials/>
           <Footer/>
        </div>
    );
};

export default Home;