import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from './../../Firebase/Firebase.init';

const AddReview = () => {
    const [user] = useAuthState(auth);
    // console.log(user.photoURL);
    const [loading,setLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

   
        

        const onSubmit = async data =>{

            const review ={
                name: user.displayName,
                email: user.email,
                rating: data.rating,
                review: data.review,
                img: user.photoURL,
            }
            fetch("http://localhost:4000/review",{
            method :'POST',
            headers :{
                'content-type' :'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(res=>res.json())
        .then(inserted =>{
            if(inserted.insertedId){
                toast.success('Review added successfully');
                reset();
                setLoading(false);
            }
            else{
                toast.error('Failed to add the Review');
            }
        });
        }

    return (
        <div className='flex justify-center items-center p-10  rounded min-h-screen py-10'>
            <div>
            <h2 className="text-2xl text-primary">Add a Review</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={user.photoURL} />
                            </div>
                            </div>
                            <input 
                            value={user?.photoURL}
                                type="text"
                                className="p-3 hidden border-2 rounded-xl w-full max-w-xs focus:outline-none"
                            />
                        </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input
                        type="text"
                        value={user.displayName}
                        placeholder="Product Name"
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        disabled
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.name.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        placeholder="Your email"
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        disabled
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.name.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Rating</span>
                    </label>
                    <input
                        type="number"
                        min="1" max="5"
                        placeholder="Rating"
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        {...register("rating", {
                            required: {
                                value: true,
                                message: 'rating is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.name.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Your review</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="Share your experience with us"
                        className="input input-bordered w-full max-w-xs focus:outline-none  h-20"
                        {...register("review", {
                            required: {
                                value: true,
                                message: 'Review is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>
                <input className='btn btn-primary w-full max-w-xs text-white my-3' type="submit" value="Add a Review" />
            </form>
            </div>
        </div>
    );
};

export default AddReview;