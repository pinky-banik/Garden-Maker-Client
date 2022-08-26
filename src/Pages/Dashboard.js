import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from './../Firebase/Firebase.init';
import useAdmin from '../Hooks/useAdmin';
import { AiOutlineFieldTime, AiOutlineHistory, AiOutlineHome, AiOutlineShopping } from 'react-icons/ai';
import {MdOutlineRateReview} from 'react-icons/md';
import {BsCardChecklist} from 'react-icons/bs';
import {HiOutlineUserGroup} from 'react-icons/hi';
import {BsUiChecks,BsVectorPen,BsBasket} from 'react-icons/bs';
import {RiFileEditLine,RiMessage2Line,RiShoppingBasketFill} from 'react-icons/ri';
import {FiPlusSquare} from 'react-icons/fi';



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
      var name = "false";
      console.log(typeof(name));

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
            <li className='border-b-2'><Link to="/"><AiOutlineHome className='text-primary text-xl'/>Home</Link></li>
            
            
           
            {
                admin ?
                <>
                <li className='border-b-2'><Link to="/dashboard/manageOrders"><BsCardChecklist className='text-primary text-xl'/> Manage Orders</Link></li>
                <li className='border-b-2'><Link to="/dashboard/allUsers"><HiOutlineUserGroup className='text-primary text-xl'/> All Users</Link></li>
                <li className='border-b-2'><Link to="/dashboard/allReview"><BsUiChecks className='text-primary text-xl'/>All Reviews</Link></li>
                <li><Link className='border-b-2' to="/dashboard/message"><RiMessage2Line className='text-xl'/>Messages</Link></li>
                <li className='border-b-2'><Link to="/dashboard/createBlog"><BsVectorPen className='text-primary text-xl'/>Create Blog</Link></li>
                <li className='border-b-2'><Link to="/dashboard/manageblog"><RiFileEditLine className='text-primary text-xl'/>Manage Blog</Link></li>
                <li className='border-b-2'><Link to="/dashboard"><FiPlusSquare className='text-primary text-xl'/>Add product</Link></li>
                <li className='border-b-2'><Link to="/dashboard/allProducts"><RiShoppingBasketFill className='text-primary text-xl'/>All Products</Link></li>
                <li className='border-b-2'><Link to="/dashboard/history"><AiOutlineFieldTime className='text-primary text-xl'/>Order History</Link></li>
                
                </>
                :
                <>
                <li className='border-b-2'><Link to="/dashboard/addReview"><MdOutlineRateReview className='text-primary text-xl'/> Add Review</Link></li>
                <li className='border-b-2'><Link to="/dashboard/myOrders"><AiOutlineShopping className='text-primary text-xl'/> My Orders</Link></li>
                <li className='border-b-2'><Link to="/dashboard/myhistory"><AiOutlineHistory className='text-primary text-xl'/>My History</Link></li>
                </>
            }
                
            <li className='border-b-2'><button onClick={handleSignOut} className='btn btn-primary text-white cursor-pointer'>Logout</button></li>
            </ul>
  
        </div>
        </div>
    );
};

export default Dashboard;