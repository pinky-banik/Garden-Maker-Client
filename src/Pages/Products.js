import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { catagory } from '../Components/Shared/Catagory';
import FilteredProducts from '../Components/Products/FilteredProducts';
import Footer from '../Components/Shared/Footer';

const Products = () => {
    const[filter,setFilter] = useState(catagory[0]);
    
    const navigate = useNavigate();
    
  
    const handleFilter =async cata=>{
    setFilter(cata);
    navigate(`/product-catagory/${cata}`);
    }

    return (
        <div className='bg-white'>
            <div className='pt-20 '>
            <div className='mx-5 lg:flex lg:min-h-screen'>
                <div className='menu mt-7'>
                <ul className="menu bg-base-100 w-56 ">
                    <li><button className='btn-disabled bg-primary text-white' >Products</button></li>
                    {
                        catagory.map(cata=>
                        <>
                        <li className={filter === cata.name ? 'bg-accent text-white' :'bg-gray-100 border-b'} key={cata.id}>
                            <button onClick={()=>handleFilter(cata.name)}>{cata.name}</button></li>
                        </>
                            
                        )
                    }
                </ul>
                </div>
                <div className='mx-auto'>
                    <FilteredProducts/>
                </div>
            </div>
            
        </div>
        <Footer/>
        </div>
    );
};

export default Products;