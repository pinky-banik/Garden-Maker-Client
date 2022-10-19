import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/error.jpg';

const Error = () => {
  return (
    <div className='flex-col flex justify-center items-center h-screen bg-white'>
      <img className='w-[44rem]' src={error} alt="error" />
      <Link to="/"><button className='btn btn-primary text-white font-bold'>Go To Home</button></Link>
    </div>
  );
};

export default Error;