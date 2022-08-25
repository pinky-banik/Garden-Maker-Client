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
        <div className='grid lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 mx-auto'>
                    {
                        filteredProducts?.map(product=>
                        <div key={product?._id} className="card   bg-base-100 hover:shadow-xl m-5 cursor-pointer" onClick={()=>handleProduct(product.name)} >
                        <figure className="p-5">
                          <img  src={product.img} alt={product.name} className="rounded-xl h-72 w-72 object-top object-cover " />
                        </figure>
                        <div className="items-center text-center flex justify-center ">
                          <h2 className="card-title pb-5 hover:text-accent ">{product.name}</h2>
                        </div>
                      </div>)
                    }
                </div>
    );
};

export default FilteredProducts;