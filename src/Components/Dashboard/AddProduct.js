import React, { useState } from 'react';
import Loading from '../Shared/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { catagory } from '../Shared/Catagory';


const AddProduct = () => {
    const [loading,setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgStorageKey ='e45298c57c6b915f179ec8d9543b8284';
    if(loading){
        return <Loading/>
    }
    
    

    const onSubmit = async data => {
        setLoading(true);
        const image= data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        let img;
        const formData = new  FormData(); //this thing is coming from uploading a file.. mozila cdn docs
        formData.append('image',image);
        await fetch(url,{
            method:'POST',
            body: formData,
        })
        .then(res=>res.json())
        .then(result=>{
             if(result.success){
                img = result.data.url;
                // send to your database 
            }        
        });
        const tools = {
            name: data.name,
            pricePerUnit: data.pricePerUnit,
            minOrderQuantity :data.minOrderQuantity,
            availableQuantity : data.availableQuantity,
            details: data.details,
            catagory: data.catagory,
            img: img
        }
        await fetch('https://fathomless-coast-84439.herokuapp.com/tools', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(tools)
        })
        .then(res =>res.json())
        .then(inserted =>{
            if(inserted.insertedId){
                toast.success('Product added successfully');
                reset();
                setLoading(false);
            }
            else{
                toast.error('Failed to add the Product');
            }
        });
        
    }
    
    
    return (
        <div className='flex justify-center items-center pb-20'>
            <div>
            <h2 className="text-2xl text-primary">Add a New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.name.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">$Price per unit</span>
                    </label>
                    <input
                        type="number"
                        placeholder="price per unit"
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        {...register("pricePerUnit", {
                            required: {
                                value: true,
                                message: 'Price per unit is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.pricePerUnit?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.pricePerUnit.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Minimum Order Quantity</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Minimum Order Quantity"
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        {...register("minOrderQuantity", {
                            required: {
                                value: true,
                                message: 'minimum order quanitity is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.minOrderQuantity?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.minOrderQuantity.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Available Quanitity</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Available Quantity"
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        {...register("availableQuantity", {
                            required: {
                                value: true,
                                message: 'Available quanitity is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.availableQuantity.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="details"
                        className="input input-bordered w-full max-w-xs focus:outline-none  h-20"
                        {...register("details", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                    

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Catagory</span>
                    </label>
                    <select {...register('catagory')} className="select input-bordered w-full max-w-xs focus:outline-none">
                        {
                            catagory.map((cata,index) => <option
                                key={index}
                                value={cata.name}
                            >{cata.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input
                                type="file"
                                className="p-3 border-2 bg-white rounded-xl w-full max-w-xs focus:outline-none text-sm text-gray-500
                                file:mr-5 file:py-3 file:px-5
                                file:rounded-full
                                file:text-md file:font-semibold  file:bg-accent file:text-primary fil file:bg-opacity-40 file:border-accent
                                hover:file:cursor-pointer"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label>
                        </div>

                <input className='btn btn-primary w-full max-w-xs text-white' type="submit" value="Add" />
            </form>
            </div>
        </div>
    );
};

export default AddProduct;