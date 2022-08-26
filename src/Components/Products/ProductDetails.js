import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import Slider from './Slider/Slider';
import Footer from '../Shared/Footer';
import { toast } from 'react-toastify';
import { isEmpty } from '@firebase/util';
import swal from 'sweetalert';
const ProductDetails = () => {
    // const[loading,setLoading] = useState(true);
    
    const {filter} = useParams();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    const[product,setProduct] = useState({});
    const[order,setOrder] = useState({});
    const [disabled,setDisabled] = useState(false);
    const[quantity,setQuantity] = useState(0);
    const[availableQuantity,setAvailableQuantity]= useState(0);
    // const[price,setPrice]= useState(0);
    const[orderQuantity,setOrderQuantity] = useState(0);
    const[status,setStatus] = useState('data is not loaded');
    const [operation,setOperation] = useState(false);
    const {email,displayName} = user;
    const{name,details,img} = product;
    const minOrderQuantity = parseInt(product.minOrderQuantity);
    const pricePerUnit = parseInt(product.pricePerUnit);
    const[orderedQuantity,setOrderedQuantity]=useState(0);
    useEffect(() => {
        
        // declare the data fetching function
        const fetchData = async() => {
            // setLoading(true);
        await fetch(`https://fathomless-coast-84439.herokuapp.com/orders/email/productName?email=${email}&productName=${filter}`)
          .then(res=>res.json())
          .then(data=>{
              console.log(data,"order data has loaded");
              setOrder(data);
            });
            
        await fetch(`https://fathomless-coast-84439.herokuapp.com/tools/product/${filter}`)
          .then(res=>res.json())
        .then(data=>{
            setLoading(false);
            setStatus("product data is loaded");
            console.log(data);
             setProduct(data);
             setQuantity(parseInt(data.minOrderQuantity));
             
             console.log(isEmpty(order));
             
             if(isEmpty(order) && operation=== false){
                setStatus("order data is not loaded");
                // setOrderedQuantity(parseInt(data.minOrderQuantity)); 
                setAvailableQuantity( parseInt(data.availableQuantity));
                // setLoading(false);
             }
            else{
                setStatus("order data is loaded");
                setOrderedQuantity(parseInt(order.orderQuantity)); 
                setAvailableQuantity( parseInt(data.availableQuantity) - parseInt(order.orderQuantity) );
                
                if(( parseInt(data.availableQuantity) - parseInt(order.orderQuantity) ) === 0){
                    setDisabled(true);
                    setQuantity(0);
                }
                else(
                    setDisabled(false)
                )
                // setLoading(false);
                
            }
            setLoading(false);
            // toast.success(status);
        });
       
        
        // call the function       
        }
        fetchData();
        
      }, [isEmpty(order),filter,email,parseInt(order.orderQuantity),disabled]);

   
        
    if(loading)
    {
        return <Loading/>
    }

    const handlePlusQuantity = quantity =>{
        setOperation(true);
        if(availableQuantity>quantity)
        {
            setQuantity(quantity+minOrderQuantity);
        }
        else if(quantity===availableQuantity){
            setQuantity(availableQuantity);
            toast.error("You cannot order more than available quantity");
        }
        else{
            setQuantity(availableQuantity);
            toast.error("You cannot order more than available quantity");
        }

    }
    
    const handleMinusQuantity = quantity =>{
        setOperation(true);
           if(quantity === minOrderQuantity) 
            {
            setQuantity(minOrderQuantity) ;
            toast.error("You cannot order less than minimum order quantity");
            }
            else if(quantity ===  0){
                setQuantity(0);
                toast.error("You cannot order this product because of this product is not available");
            }
            else {
            setQuantity(quantity - minOrderQuantity);
            }
    }
    console.log(orderedQuantity ,quantity);
    const handlePurchase = async() =>{
        setStatus(" new order is added");
        const ordering = orderedQuantity+quantity;
        const price =(pricePerUnit*ordering); 
        console.log(price);
        // setLoading(true);
        

        
        const order = {
            name: displayName,
            email :email,
            productName : name,
            price: price,
            orderQuantity: ordering,
            img: img,
            paymentStatus :"incomplete",
        }
        console.log(order);
        await fetch(`https://fathomless-coast-84439.herokuapp.com/orders?email=${email}&productName=${name}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
        .then(res =>res.json())
        .then(data=>{
            if(data){
                setLoading(false);
                toast.success("Added to queue");
                setDisabled(true);
                setAvailableQuantity(availableQuantity-orderQuantity);
                // localStorage.setItem('availableQuantity',availableQuantity);
                swal({
                    icon: "warning",
                    title:"Continue to purchase?",
                    text: 'You will redirected to payment option.',
                    buttons: {
                        continue: 'continue',
                        cancel: 'cancel'
                    }
                    
                }).then(option => {
                    switch (option){
                        case 'continue':
                            toast.success("you are redirected to your Orders Dashboard to further process");
                            navigate('/dashboard/myOrders');
                        case 'cancel':
                            {
                                break;
                                
                            }
                            
                            
                    }
                })
            }
            else{
                toast.error('Failed to add the Product');
                setLoading(false);
            }
        });


    }
    
    

    return (
        <div className='pt-20 bg-white '>
            <div className=''>
            <div className="max-w-screen-xl mx-auto px-6 my-16 py-16 flex flex-col justify-center items-center ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">

                        {/* left side  */}
                        <div className="order-2 md:order-1 lg:order-1 flex flex-col justify-center text-center md:text-left">
                            <h1 className="text-center md:text-left  text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none">{name}</h1>
                            <p className="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none">{details}</p>
                            <p className='pt-10'>Available Quantity :   {availableQuantity}</p>
                            <p>Minimum Order Quantity :     {minOrderQuantity}</p>
                            <p>Price Per Quantity:  {pricePerUnit}</p>
                            {/* <p>final price: {price}</p> */}
                            {/* <div className='border-2 p-5'>
                            <p className='border-b-2'>Name : {newOrder?.name}</p>
                            <p className='border-b-2'>Email : {newOrder?.email}</p>
                            <p className='border-b-2'>Product Name : {newOrder?.productName}</p>
                            <p className='border-b-2'>Order Quantity : {newOrder?.orderQuantity}</p>
                            <p className='border-b-2'>Price : {newOrder?.price}</p>
                            <p>Available Quantity : {availableQuantity}</p>

                            </div> */}
                            {/* price and quantity  */}
                            <div className="flex items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8">
                                <h1 className="text-3xl font-bold text-black poppins select-none">${(pricePerUnit * quantity).toFixed(2)}</h1>
                                {/* quantity  */}
                                <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                                    <AiOutlineMinus onClick={()=>handleMinusQuantity(quantity)}
                                        className="text-2xl btn-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                    />
                                    <span className="text-lg text-gray-700 poppins select-none">{quantity}</span>

                                    <AiOutlinePlus onClick={()=>handlePlusQuantity(quantity)}
                                        className="text-2xl btn-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                    />
                                </div>
                            </div>

                            {/* add button  */}
                            <div className="mt-8 flex items-center justify-center md:justify-start lg:justify-start">
                            <button disabled={disabled} className={availableQuantity===0 || disabled ? "flex items-center space-x-3 btn-primary btn px-6 py-3 text-accent ouline-primary poppins rounded-full outline-accent focus:ring-4 ring-accent transform transition duration-700 hover:scale-105" : "flex items-center space-x-3 btn btn-primary px-6 py-3 text-white poppins rounded-full ring-secondary focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"} onClick={handlePurchase} >
                                    <FiShoppingCart className="text-xl" />
                                    <span>{disabled ? "Added" : "Add to queue"}</span>
                                </button>
                            </div>
                           
                        </div>
                        {/* right side  */}
                        <div className="order-1 md:order-2 lg:order-2">
                        <div className="avatar ">
                        <div className=" mx-auto">
                            <img className='object-top' src={img} alt={name}  />
                        </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
            <Slider catagory={product.catagory}/>
            </div>
            <Footer/>
        </div>
    );
};

export default ProductDetails;