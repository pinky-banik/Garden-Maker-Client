import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Slider from './Slider/Slider';
import swal from 'sweetalert';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';
import Loading from '../Shared/Loading';

const ProductDetails = () => {

    const [product,setProduct] = useState({});
    // console.log(product);
    const {filter} = useParams();
     const [quantity,setQuantity] = useState(1);
    const [disabled,setDisabled] = useState(false)
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const[loading,setLoading] = useState(false);
    const [availableQuantity,setAvailableQuantity] = useState(0);
    const[orderQuantity,setOrderQuantity] = useState(0);
    const[price,setPrice] = useState(0);
    const [order,setOrder]= useState({});
    const [newOrder,setNewOrder] = useState({});
    const [orderingQuantity,SetOrderingQuantity] = useState(0);
    const [status,setStatus] = useState("Data is not loaded yet");

    

    const {email,photoURl,displayName} = user;
    const {img,name,details} = product;
    const available = parseInt(product.availableQuantity);
    const alreadyOrdered = parseInt(order.orderQuantity);
    


    

    useEffect(()=>{
        
        fetch(`https://fathomless-coast-84439.herokuapp.com/tools/product/${filter}`)
        .then(res=>res.json())
        .then(data=>{
            setStatus("product data is loaded");
            console.log(data);
             setProduct(data);
             setQuantity(parseInt(data.minOrderQuantity));
             setAvailableQuantity( parseInt(data.availableQuantity));
             fetch(`https://fathomless-coast-84439.herokuapp.com/orders/email/productName?email=${email}&productName=${filter}`)
             .then(res=>res.json())
             .then(result=>{
                setStatus("order data is loaded");
                 console.log(result);
                 setOrder(result);
                 setOrderQuantity(parseInt(result?.orderQuantity) + minOrderQuantity);   
                //  setAvailableQuantity(availableQuantity-orderQuantity);
                
             });
             setStatus(`order data is loading ${order.name}`)
             if(order.name === undefined){
                setStatus("order data is not loaded");
                setOrderQuantity(minOrderQuantity);
                
             }
             if(availableQuantity>orderQuantity){
                setAvailableQuantity(availableQuantity-orderQuantity +minOrderQuantity);
             }
             else if (availableQuantity===orderQuantity){
                setAvailableQuantity(0);
             }
             
            

        });
    },[orderQuantity]);
    console.log(availableQuantity);


        
    // if(loading)
    // {
    //     return <Loading/>
    // }

    const handlePlusQuantity = quantity =>{
        
        if(quantity >=availableQuantity) {
            
            setQuantity((availableQuantity/minOrderQuantity)*minOrderQuantity) ;
            toast.error("You cannot order more than available Quantity");
            
        }
        else{
            setDisabled(false);
            setQuantity(quantity +minOrderQuantity);
            setStatus("quantity decreased");
        }      
    }
    console.log(quantity);

    const handleMinusQuantity = () =>{
        setStatus("quantity increased");
            if(quantity === minOrderQuantity) 
            {
            setQuantity(minOrderQuantity) ;
            toast.error("You cannot order less than minimum order Quantity");
            }
            else {
            setDisabled(false);
            setQuantity(quantity - minOrderQuantity);
            
            }   
                   
    }

    const handlePurchase = async() =>{
        setStatus(" new order is added");
        setOrderQuantity(orderQuantity+quantity);
        setPrice(pricePerUnit*orderQuantity); 
        console.log(price);
        // setLoading(true);
        

        
        const order = {
            name: displayName,
            email :email,
            productName : name,
            price: pricePerUnit*orderQuantity,
            orderQuantity: orderQuantity,
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
        <div className='pt-20 '>
            <div className=''>
            <div className="max-w-screen-xl mx-auto px-6 my-16 py-16 flex flex-col justify-center items-center">
                <h1 className='mx-auto'>{status}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">

                        {/* left side  */}
                        <div className="order-2 md:order-1 lg:order-1 flex flex-col justify-center text-center md:text-left">
                            <h1 className="text-center md:text-left  text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none">{name}</h1>
                            <p className="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none">{details}</p>
                            <p>Main Available :{available}</p>
                            <p>Available Quantity :{availableQuantity}</p>
                            <p>Minimum Order Quantity : {minOrderQuantity}</p>
                            <p>Price Per Quantity: {pricePerUnit}</p>
                            <p>Already Ordered :{alreadyOrdered}</p>
                            <p>Next Order Quantity:{alreadyOrdered}  +{minOrderQuantity}={orderQuantity}</p>
                            <p>final price: {price}</p>
                            <div className='border-2 p-5'>
                            <p className='border-b-2'>Name : {newOrder?.name}</p>
                            <p className='border-b-2'>Email : {newOrder?.email}</p>
                            <p className='border-b-2'>Product Name : {newOrder?.productName}</p>
                            <p className='border-b-2'>Order Quantity : {newOrder?.orderQuantity}</p>
                            <p className='border-b-2'>Price : {newOrder?.price}</p>
                            <p>Available Quantity : {availableQuantity}</p>

                            </div>
                            {/* price and quantity  */}
                            <div className="flex items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8">
                                <h1 className="text-3xl font-bold text-black poppins select-none">${(pricePerUnit * quantity).toFixed(2)}</h1>
                                {/* quantity  */}
                                <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                                    <AiOutlineMinus onClick={() => handleMinusQuantity(quantity)}
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
                            <button disabled={disabled} className={disabled ? "flex items-center space-x-3 btn-primary btn px-6 py-3 text-accent ouline-primary poppins rounded-full outline-accent focus:ring-4 ring-accent transform transition duration-700 hover:scale-105" : "flex items-center space-x-3 btn btn-primary px-6 py-3 text-white poppins rounded-full ring-secondary focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"} onClick={handlePurchase} >
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