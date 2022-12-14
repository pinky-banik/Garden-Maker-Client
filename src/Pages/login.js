import React, { useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from './../Firebase/Firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import gardener from '../assets/gif/gardener.gif'
import Loading from '../Components/Shared/Loading';
import useToken from '../Hooks/useToken';
import Navbar from '../Components/Shared/Navbar';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [token] = useToken(user|| gUser);

    useEffect( () =>{
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);

    if (loading || gLoading) {
        return <Loading/>
    }

    if(error || gError){
        signInError= <p className='text-red-500'><small>{error?.message || gError?.message }</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }

    return (
        <div>
            <Navbar/>
        <div className='hero min-h-screen bg-base-200 py-20'> 
        <div className="hero-content flex-col lg:flex-row-reverse">

        <div className='flex w-full justify-center items-center'><img  src={gardener} alt="gardener" /></div>

        
        <div className='flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-primary text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered border-prima w-full max-w-xs focus:outline-none"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs focus:outline-none"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>

                        {signInError}
                        <input className='btn w-full max-w-xs text-white btn-primary' type="submit" value="Login" />
                    </form>
                     <Link to="/register"><p className='btn-animate text-center text-sm font-semibold text-gray-600 cursor-pointer'>New to Doctors Portal? <span className='text-accent'>Create New account</span></p></Link>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline btn-primary"
                    >Continue with Google</button>
                </div>
            </div>
        </div >
         
        </div>
            
        </div>
        </div>
    );
};

export default Login;