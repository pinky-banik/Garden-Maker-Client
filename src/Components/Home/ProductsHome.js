import React, { useState } from 'react';
import { catagory } from './../Shared/Catagory';
import { useNavigate } from 'react-router-dom';

const ProductsHome = () => {
    const [route,setRoute] = useState('');

    const navigate = useNavigate();
     
    const handleRoute =async name =>{
        setRoute(name);
        navigate(`/product-catagory/${name}`);
        
    }
    

    
    return (
        <div className="">
            <h1 className='text-center text-2xl lg:text-4xl  font-bold mt-20 uppercase'>Read more about out garden tools.</h1>
            <div className='border border-accent round-2xl w-36 mx-auto my-5'></div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5 p-20 lg:w-5/6  mx-auto'>
            {
                catagory.map((cata,index)=>
                <div key={index} className="wrapper antialiased text-gray-900 ">
                <div>
                
                    <div style={{backgroundImage: `url('${cata.img}')`}}  className='group w-full h-56 lg:h-96 bg-cover object-center rounded-lg shadow-md  justify-center'>
                        <div className='bg-secondary w-full h-full flex justify-center items-center bg-opacity-0 hover:bg-opacity-80
                        trasition duration-500 hover:rounded-lg'>
                        <button onClick={()=>handleRoute(cata.name)} className='hidden w-36 h-12 group-hover:block btn btn-primary '>Learn more</button>
                        </div>
                       
                    {/* <img src={cata.img} alt="random imgee" className="w-full h-56 lg:h-96 object-cover object-center rounded-lg shadow-md"/>  */}
                    </div>   
                    
                 <div className="relative px-4 -mt-16 text-center ">
                   <div className="bg-white p-6 rounded-lg shadow-lg">
                    
                    <h4 className="mt-1 text-xl font-semibold uppercase leading-tight text-primary">{cata.name}</h4>
                    <div className='border w-16 rounded-2xl mx-auto border-secondary mt-3 mb-5'></div>
                    <p className='text-gray-500'>{cata.details}</p>
                  </div>  
                  </div>
                 </div>
                  
                </div>
                )
            }
            </div>
        </div>
    );
};

export default ProductsHome;