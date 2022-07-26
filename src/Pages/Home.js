import React from 'react';
import Banner from '../Components/Home/Banner';
import ProductsHome from '../Components/Home/ProductsHome';

const Home = () => {
    const date = new Date();
    console.log(date);
    
    return (

        <div >
           <Banner/>
           <ProductsHome/>
        </div>
    );
};

export default Home;