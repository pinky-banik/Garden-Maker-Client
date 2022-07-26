import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { catagory } from '../Components/Shared/Catagory';
import FilteredProducts from '../Components/Products/FilteredProducts';

const Products = () => {
    const[filter,setFilter] = useState(catagory[0]);
    
    const navigate = useNavigate();
    
  
    const handleFilter =async cata=>{
    setFilter(cata);
    navigate(`/product-catagory/${cata}`);
    }

    return (
        <div className='pt-20'>
            <div className='mx-5 lg:flex'>
                <div className='menu'>
                <ul className="menu bg-base-100 w-56">
                    {
                        catagory.map(cata=>
                        <li className={filter === cata.name ? 'bg-primary text-white' :''} key={cata.id}>
                            <button onClick={()=>handleFilter(cata.name)}>{cata.name}</button></li>
                        )
                    }
                </ul>
                </div>
                <div className='mx-auto'>
                    <FilteredProducts filter={filter}/>
                </div>
            </div>
        </div>
    );
};

export default Products;