import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="hero min-h-screen bg-banner bg-cover">
        <div className="hero-overlay bg-opacity-10"></div>
        <div className="hero-content text-center text-white">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello Gardeners</h1>
            <p className="mb-5 text-3xl font-bold">Best Garden Tools Supplier in Your Country</p>
            <Link to="/product-catagory/Fruit Scissors">
            <button  className="btn btn-secondary">Get Started</button></Link>
            </div>
        </div>
        </div>
    );
}; 

export default Banner;