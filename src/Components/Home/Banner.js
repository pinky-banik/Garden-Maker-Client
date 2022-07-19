import React from 'react';

const Banner = () => {
    return (
        <div class="hero min-h-[36rem] bg-banner bg-cover">
        <div class="hero-overlay bg-opacity-50"></div>
        <div class="hero-content text-center text-white">
            <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Hello Gardeners</h1>
            <p class="mb-5 text-3xl font-bold">Best Garden Tools Supplier in Your Country</p>
            <button to="/products" class="btn btn-secondary">Get Started</button>
            </div>
        </div>
        </div>
    );
};

export default Banner;