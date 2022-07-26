import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

    const [product,setProduct] = useState('');
    const {filter} = useParams();


    const {img,name,details,price} = product;

    useEffect(()=>{
        fetch(`http://localhost:4000/tools/product/${filter}`)
        .then(res=>res.json())
        .then(data=>setProduct(data));
    },[]);

    return (
        <div className='pt-20'>
            <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{details}</p>
                <p>{price}</p>
                <div className="card-actions">
                <button className="btn btn-primary">Purchase</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ProductDetails;