import React from 'react';
import loader from '../../assets/gif/gardener.gif';

const Loading = () => {
    return (
        <div className='flex h-screen justify-center items-center'><img  src={loader} alt="" /></div>
    );
};

export default Loading;