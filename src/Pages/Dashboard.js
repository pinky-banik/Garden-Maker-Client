import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from './../Firebase/Firebase.init';
import useAdmin from '../Hooks/useAdmin';
import { AiOutlineHome } from 'react-icons/ai';

const Dashboard = ({setSidebar}) => {
    setSidebar(false);
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    const navigate = useNavigate();

    const handleSignOut = () =>{
        signOut(auth);
        // localStorage.removeItem('accessToken');
        navigate('/');
      };

    return (
        <div className="drawer drawer-mobile pt-14">
        <input id="dashboard" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col h-screen bg-gray-100">
            {/* <!-- Page content here --> */}
            <div className='p-10'>
            <Outlet/>
            </div>
            
        
        </div> 
        <div className="drawer-side">
            <label htmlFor="dashboard" className="drawer-overlay"></label> 
            <ul className="menu p-4 pt-5 overflow-y-auto w-80 bg-base-100 text-base-content ">
            {/* <!-- Sidebar content here --> */}
            <li className='border-b-2'><Link to="/"><AiOutlineHome/>Home</Link></li>
            <li className='border-b-2'><Link to="/dashboard/addReview">Add Review</Link></li>
            
           
            {
                admin &&
                <>
                <li className='border-b-2'><Link to="/dashboard/allUsers">All Users</Link></li>
                <li className='border-b-2'><Link to="/dashboard/allReview">All Reviews</Link></li>
                <li className='border-b-2'><Link to="/dashboard/createBlog">Create Blog</Link></li>
                <li className='border-b-2'><Link to="/dashboard/manageblog">Manage Blog</Link></li>
                <li className='border-b-2'><Link to="/dashboard">Add product</Link></li>
                <li className='border-b-2'><Link to="/dashboard/allProducts">All Products</Link></li>
                </>
            }
                
            <li className='border-b-2'><button onClick={handleSignOut} className='btn btn-primary text-white cursor-pointer'>Logout</button></li>
            </ul>
  
        </div>
        </div>
    );
};

export default Dashboard;