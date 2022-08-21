import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import Moment from 'moment';
const CheckoutForm = ({order}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCardError] = useState('');
    const [success,setSuccess] = useState('');
    const [clientSecret,setClientSecret ] = useState('');
    const [disabled,setDisabled] = useState(false);
    const [transectionId,setTransectionId] = useState('');
    const [processing,setProcessing] = useState(false);

    const {_id,price,name,email,productName,orderQuantity} = order;
    console.log(price);

    useEffect(() => {
        fetch('https://fathomless-coast-84439.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [price])



    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
    
        if (error) {
            console.log('[error]', error);
            setCardError(error.message || '');
            setSuccess('');
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true) ;
        //confirm card payment

        const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: name,
                  email :email,
                },
              },
            },
          );
          if(intentError){
            setCardError(intentError?.message);
            setProcessing(true);

          }else{
            setCardError('');
            setTransectionId(paymentIntent.id);
            setSuccess(' Congrates! Your payment is completed');
            setDisabled(true);
            toast.success("Payment Successfull");
            console.log(paymentIntent);
            
            //store payment data on database
            const formattedDate = Moment().format('YYYY-MM-DD');
            const payment = {
                name : name,
                email : email,
                productName : productName,
                price : price,
                orderQuantity : orderQuantity,
                transectionId : paymentIntent.transectionId,
                date: formattedDate,

            }
            fetch(`https://fathomless-coast-84439.herokuapp.com/orders/${_id}`,{
                method:'PATCH',
                headers : {
                    'content-type' : 'application/json',
                },
                body : JSON.stringify(payment)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setProcessing(false);
            })
          }
    }    
    return (
        <div>
            <form  onSubmit={handleSubmit}>
        <div className=' rounded py-5 focus:outline-none bg-gray-100 p-2 my-2'>
        <CardElement className='focus:outline-none'
            options={{
            style: {
                base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
                },
                invalid: {
                color: '#9e2146',
                },
            },
            }}
        />
        </div>
      <div className='flex justify-between py-2 items-center font-bold'>
        <h1>Your Service Charge will be <span className='text-primary'>${price}</span></h1>
      <button className='btn btn-primary mt-2' type="submit" disabled={!stripe || !clientSecret ||disabled}>
        Pay
      </button>
      </div>
    </form>
     { cardError && <p className='w-96 mx-auto text-red-500'>{cardError}</p>}
     { success && <p className='w-96 mx-auto text-green-500'>{success}</p>}
     {
        transectionId && <p className='w-96 mx-auto text-blue-500'> Transection id : {transectionId}</p>
     }
    </div>
    );
};

export default CheckoutForm;


/***
 * install stripe react stripe js
 * open stripe account on stripe website
 * get publishable key pk__
 * create elements wrapper using publishable key
 * create checkout form using card element, useStripe, useElements
 * get card elements indo (credit card info)
 * -----------
 * get credit card info /error + display card error (if any)
 * get client secret from backend via payment intent post api
 * store clientsecret on the client side
 */