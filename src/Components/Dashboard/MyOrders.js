import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import auth from '../../Firebase/Firebase.init';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders,setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const {email,displayName} = user;


    const navigate = useNavigate();

 
    useEffect(()=>{
        fetch(`https://fathomless-coast-84439.herokuapp.com/orders/${email}`)
        .then(res=>res.json())
        .then(data=>{
            setOrders(data);
            console.log(data);
        } 
        );
    },[email]);


    const handleDelete = id =>{
        
        const url = `https://fathomless-coast-84439.herokuapp.com/orders/${id}`;
        
        Swal.fire({
          icon: "warning",
          title: "Are you sure to delete this product?",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(url, {
              method: 'delete'
          })
          .then(res => res.json())
          .then(data => {
              if(data.deletedCount){
                  const remaining = orders.filter(order =>  order._id !== id);
                  setOrders(remaining);
                  Swal.fire("Deleted!", "", "success");
                  }
                  ;
              } );
          }
        });

    }
    const handlePayment = id =>{
        
        const url = `https://fathomless-coast-84439.herokuapp.com/orders/${id}`;
        
        Swal.fire({
          icon: "warning",
          title: "Are you sure want to pay?",
          text : "You will redirected to the payment page",
          showCancelButton: true,
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/payment/${id}`); 
          }
        });

    }





    return (
        <div className='mb-24'>
            <div className="overflow-x-scroll w-full">
            <table className="table w-full pb-20">
                {/* <!-- head --> */}
                <thead>
                <tr>
                    <th>image</th>
                    <th>Name</th>
                    <th>Product Name</th>
                    <th>Order Quantity</th>
                    <th>Price</th>
                    <th>Delete</th>
                    <th>payment</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order=>
                            <tr key={order._id}>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={order.img} alt={order.name} />
                        </div>
                        </div>
                    </div>
                    </td>
                    <td>
                    {order.name}
                    </td>
                    <td>
                    {order.productName}
                    </td>
                    <td>
                    {order.orderQuantity}
                    </td>
                    <td>
                    {order.price}
                    </td>
                    <td>
                    <button onClick={()=>handleDelete(order._id)} className="text-red-500 text-2xl"><RiDeleteBin2Fill/></button>
                    </td>
                    <td>
                        {order.paymentStatus === "incomplete" ? <button onClick={()=>handlePayment(order._id)} className='btn btn-primary btn-xs'>Pay</button> : <button className='btn btn-xs btn-disabled'>paid</button> }
                    </td>
                    
                    {/* <th>
                    <label onClick={()=> handleId(order)} htmlFor="updateModal" className="text-blue-500 text-2xl"><FiEdit/></label>
                    {
                    <UpdateProductModal data={selectedorder} openBooking={openBooking} setBookingOpen={setBookingOpen}/>
                    }
                    </th> */}
                </tr>)
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default MyOrders;