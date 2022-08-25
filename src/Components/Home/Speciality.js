import React from 'react';
import { speciality } from './../Shared/companyDetails';

const Speciality = () => {
    return (
        <div className=' py-10 bg-gray-100'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center w-5/6 mx-auto '>
                {
                    speciality.map(sp=>
                        <div key={sp.id} className="flex justify-center items-center p-5">
                            <div>
                            <img className='mx-auto my-5' src={sp.img} alt="" />
                            <h1 className='text-lg w-3/4 mx-auto text-accent py-3'>{sp.name}</h1>
                            <p className='text-gray-500 text-sm'>{sp.details}</p>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Speciality;