import React from 'react';
import business from '../../assets/business.jpg';
import {AiOutlineFlag,AiOutlineFundProjectionScreen}  from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsHandThumbsUp } from 'react-icons/bs';
import { render } from '@testing-library/react';

const Business = () => {
    return (
        <div>
            <div className='py-20 bg-cover bg-center'  style={{backgroundImage: `url('${business}')`}}>
                <div className='text-center'>
                <h1 className='uppercase pt-5 text-4xl text-primary font-bold'>Millions Busines trust Us</h1>
                <p className='uppercase'>Try to understand users expectation</p>
                </div>
                <div className='border border-accent round-2xl w-28 mx-auto my-5'></div>
                <div className='w-full grid sm:grid-cols-4 grid-cols-2 px-10 py-5 text-center'>
                    <div className='text-center py-10'>
                        <h1><AiOutlineFlag className='text-5xl my-2  mx-auto text-accent'/></h1>
                        <div className='border border-accent round-2xl w-7 mx-auto mb-5'></div>
                        <h1 className='md:text-4xl text-2xl font-bold'>72</h1>
                        <p className='text-accent'>countries</p>
                    </div>
                    <div className='text-center py-10'>
                        <h1><AiOutlineFundProjectionScreen className='text-5xl my-2  mx-auto text-accent'/></h1>
                        <div className='border border-accent round-2xl w-7 mx-auto mb-5'></div>
                        <h1 className='md:text-4xl text-2xl font-bold '>535+</h1>
                        <p className='text-accent'>Complete Projects</p>
                    </div>
                    <div className='text-center py-10'>
                        <h1><HiOutlineUserGroup className='text-5xl my-2  mx-auto text-accent'/></h1>
                        <div className='border border-accent round-2xl w-7 mx-auto mb-5'></div>
                        <h1 className='md:text-4xl text-2xl font-bold'>273+</h1>
                        <p className='text-accent'>Happy Clients</p>
                    </div>
                    <div className='text-center py-10'>
                        <h1><BsHandThumbsUp className='text-5xl my-2  mx-auto text-accent'/></h1>
                        <div className='border border-accent round-2xl w-7 mx-auto mb-5'></div>
                        <h1 className='md:text-4xl text-2xl font-bold'>432+</h1>
                        <p className='text-accent'>FeedBacks</p>
                    </div>
                </div>
                
                <div>
                <div className='w-5/6 p-5 xl:flex justify-between mx-auto shadow-lg  bg-white rounded-lg '>
                    <div>
                        <h1 className=' text-2xl text-accent lg:w-3/4 py-3'>Have any Question about us or get a products requests?</h1>
                        <p>Don't hesitate to contact us</p>
                    </div>
                    <div className='flex justify-center items-center py-5'>
                        <button className='btn btn-accent mx-5'>Request For Quote</button>
                        <button className='btn btn-primary'>Contact Us</button>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default Business;