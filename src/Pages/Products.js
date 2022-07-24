import React,{useState,useEffect} from 'react';
import { catagory } from '../Components/Dashboard/AddProduct';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const[filter,setFilter] = useState(catagory[0]);
    const[filteredProducts,setFilteredProducts] = useState([]);


    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(`http://localhost:4000/tools/${filter}`)
        .then(res=>res.json())
        .then(data=>setFilteredProducts(data));
    },[filter]);

    const handleProduct = name =>{
        navigate(`/productDetails/${name}`);
    }

    return (
        <div className='pt-20'>
            <div className='md:flex md:w-60 w-full mx-5'>
                <div className='menu'>
                <ul className="menu bg-base-100 w-56">
                    {
                        catagory.map(cata=>
                        <li key={cata}><button onClick={()=>setFilter(cata)}>{cata}</button></li>
                        )
                    }
                </ul>
                </div>
                <div className='products'>
                    {
                        filteredProducts?.map(product=>
                        <div key={product?._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                          <img src={product.img} alt="Shoes" className="rounded-xl" />
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

            </div>
        </div>
    );
};

export default Products;