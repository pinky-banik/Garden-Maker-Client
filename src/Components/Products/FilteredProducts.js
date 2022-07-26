import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const FilteredProducts = ({filter}) => {
    const {menuFilter} = useParams();
    console.log(menuFilter);
    const[filteredProducts,setFilteredProducts] = useState([]);

    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(`http://localhost:4000/tools/${menuFilter}`)
        .then(res=>res.json())
        .then(data=>setFilteredProducts(data));
    },[menuFilter]);

    const handleProduct = name =>{
        navigate(`/productDetails/${name}`);
    }

    // const handleFilter =async cata=>{
    // setFilter(cata);
    // navigate(`/filteredProduct/${cata}`);
    // }

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto'>
                    {
                        filteredProducts?.map(product=>
                        <div key={product?._id} className="card   bg-base-100 shadow-xl m-5">
                        <figure className="px-10 pt-10">
                          <img  src={product.img} alt="Shoes" className="rounded-xl h-56 w-56 object-top object-cover " />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{product.name}</h2>
                          <p>{product.details.length > 20 ? product.details.slice(0,20)  : product.details }</p>
                          <div className="card-actions">
                            <button onClick={()=>handleProduct(product.name)} className="btn btn-primary">learn more</button>
                          </div>
                        </div>
                      </div>)
                    }
                </div>
    );
};

export default FilteredProducts;