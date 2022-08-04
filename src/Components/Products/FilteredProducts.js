import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';


const FilteredProducts = () => {
    const {menuFilter} = useParams();
    // console.log(menuFilter);
    const[filteredProducts,setFilteredProducts] = useState([]);
    const[loading,setLoading] = useState(true);

    
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(`https://fathomless-coast-84439.herokuapp.com/tools/${menuFilter}`)
        .then(res=>res.json())
        .then(data=>{
          setFilteredProducts(data);
          setLoading(false);    
        });
    },[menuFilter]);

    const handleProduct = name =>{
        navigate(`/productDetails/${name}`);
    }

    // const handleFilter =async cata=>{
    // setFilter(cata);
    // navigate(`/filteredProduct/${cata}`);
    // }
    if(loading){
      return <Loading/>
    }


    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto'>
                    {
                        filteredProducts?.map(product=>
                        <div key={product?._id} className="card   bg-base-100 shadow-xl m-5">
                        <figure className="px-10 pt-10">
                          <img  src={product.img} alt={product.name} className="rounded-xl h-56 w-56 object-top object-cover " />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{product.name}</h2>
                          <p>{product.details.length > 20 ? product.details.slice(0,20)  : product.details }</p>
                          {/* <p>${product.price}</p> */}
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