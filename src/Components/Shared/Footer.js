import React from 'react';
import footer from '../../assets/footer.png';

const Footer = () => {
    return (
        <div>
            <div className='border border-accent round-2xl w-3/5  mx-auto my-16'></div>
            <div >
                <div class="hero " style={{backgroundImage: `url('${footer}')`}}>
                <div class="hero-content text-center pb-56">
                    
                    <div class="max-w-md">
                    <p className='text-accent'>Any Question?</p>
                    <h1 class="mb-5 text-2xl font-bold text-primary">You can contact with us anytime</h1>
                    <button class="btn-accent py-2 text-white rounded uppercase text-sm px-5">contact us</button>
                    </div>
                </div>
                </div>
            </div>
        <footer  className='text-center bg-[#364F42] text-white p-5 '>
            <h1 className='text-center text-3xl'>Garden Maker</h1>
            <div className='border border-accent round-2xl w-28 mx-auto my-5'></div>
            <div className="footer p-10 lg:flex justify-around">
        <div>
            <span className=" text-lg font-bold">Services</span> 
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
        </div> 
        <div>
            <span className=" text-lg font-bold">Company</span> 
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
        </div> 
        <div>
            <span className=" text-lg font-bold">Legal</span> 
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
        </div>
        </div>
        <div>
            <p className='text-sm font-bold'>© Copyright 2022 All Rights Reserved</p>
        </div>
        </footer>
        </div>
    );
};

export default Footer;