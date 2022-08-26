import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from './../Firebase/Firebase.init';
import Loading from './../Components/Shared/Loading';
import Footer from '../Components/Shared/Footer';

const Contact = () => {
    const [user] = useAuthState(auth);
    const [loading,setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit,reset } = useForm();


    const onSubmit =async data => {
        setLoading(true);
        const review ={
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            number: data.number,
            message: data.message,
            img: user.photoURL,
        }
        fetch("https://fathomless-coast-84439.herokuapp.com/message",{
        method :'POST',
        headers :{
            'content-type' :'application/json'
        },
        body: JSON.stringify(review)
    })
    .then(res=>res.json())
    .then(inserted =>{
        if(inserted.insertedId){
            toast.success('Message sent successfully');
            reset();
            setLoading(false);
        }
        else{
            toast.error('Failed to sending the message');
        }

    });
    reset();
    }
    if(loading){
        return <Loading/>
    }
    return (
        <div id="contact" className=' py-5 bg-[#eee]'>
            <div className="hero bg-banner" >
            <div className="hero-overlay bg-opacity-80 bg-primary"></div>
                <div className="hero-content text-center py-36">
                    
                    <div className="max-w-md">
                    <p className='text-white text-4xl'>Contact Us</p>
                    
                    </div>
                </div>
                </div>
            <h1 className='mt-5 uppercase md:text-4xl text-2xl font-bold font-sans leading-tight text-center py-20'>Let us  Know</h1>
            <div className='py-5 md:w-3/4 lg:w-1/2 mx-auto p-10'>
                <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex'>
                    <div className="form-control w-full mr-3 ">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="my-2 p-5 rounded w-full  focus:outline-none"
                            {...register("firstName")}
                            required
                        />
                        
                    </div>
                    <div className="form-control w-full ">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="my-2 p-5 rounded w-full  focus:outline-none"
                            {...register("lastName")} required
                        />
                        
                    </div>

                    </div>
                    <div className='flex'>
                    <div className="form-control w-full mr-3">
                        
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="my-2 p-5 rounded w-full  focus:outline-none"
                            {...register("email")} required
                        />
                        
                    </div>
                    <div className="form-control w-full">
                        
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="my-2 p-5 rounded w-full focus:outline-none"
                            {...register("number")} required
                        />
                    </div>
                    </div>
                    <div className="form-control w-full">
                        <textarea
                            type="text"
                            placeholder="Your Message"
                            className="my-2 p-5 rounded focus:outline-none "
                            {...register("message")} required
                        />
                    </div>
                    <div className='flex justify-center'>
                    <input className='my-2 btn-primary btn  text-white' type="submit" value="Send message" />
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;