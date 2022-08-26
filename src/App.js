import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import {Routes,Route}  from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Shared/Navbar';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Login from './Pages/login';
import Register from './Pages/register';
import AddProduct from './Components/Dashboard/AddProduct';
import AllProduct from './Components/Dashboard/AllProduct';
import Products from './Pages/Products';
import ProductDetails from './Components/Products/ProductDetails';
import AllUsers from './Components/Dashboard/AllUsers';
import RequireAuth from './RequireAuth/RequireAuth';
import RequireAdmin from './RequireAuth/RequireAdmin';
import AddReview from './Components/Dashboard/AddReview';
import AllReview from './Components/Dashboard/AllReview';
import CreateBlog from './Components/Dashboard/CreateBlog';
import ManageBlogs from './Components/Dashboard/ManageBlogs';
import Blogs from './Pages/Blogs';
import BlogDetails from './Components/Blog/BlogDetails';
import MyOrders from './Components/Dashboard/MyOrders';
import ManageOrders from './Components/Dashboard/ManageOrders';
import Payment from './Components/Dashboard/Payment';
import AllHistory from './Components/Dashboard/AllHistory';
import MyHistory from './Components/Dashboard/MyHistory';
function App() {
  const[sidebar,setSidebar] =useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1300
    });
    AOS.refresh();
  }, [])
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/product-catagory/:menuFilter' element={<Products/>}/>
        <Route path='/productDetails/:filter' element={<RequireAuth><ProductDetails/></RequireAuth>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/payment/:paymentId' element={<RequireAuth><Payment/></RequireAuth>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/blogDetails/:blogId' element={<BlogDetails/>}/>
        <Route path="/dashboard" element={<RequireAuth><Dashboard setSidebar={setSidebar}/></RequireAuth>} >
          <Route index element={<AddProduct/>}></Route>
          <Route path="myOrders" element={<MyOrders/>}></Route>
          <Route path="manageOrders" element={<RequireAdmin><ManageOrders/></RequireAdmin>}></Route>
          <Route path="addReview" element={<AddReview/>}></Route>
          <Route path="addProduct" element={<RequireAdmin><AddProduct/></RequireAdmin>}></Route>
          <Route path="allProducts" element={<RequireAdmin><AllProduct/></RequireAdmin>}></Route>
          <Route path="allUsers" element={<RequireAdmin><AllUsers/></RequireAdmin>}></Route>
          <Route path="allReview" element={<RequireAdmin><AllReview/></RequireAdmin>}></Route>
          <Route path="createBlog" element={<RequireAdmin><CreateBlog/></RequireAdmin>}></Route>
          <Route path="manageBlog" element={<RequireAdmin><ManageBlogs/></RequireAdmin>}></Route>
          <Route path="history" element={<RequireAdmin><AllHistory/></RequireAdmin>}></Route>
          <Route path="myhistory" element={<RequireAdmin><MyHistory/></RequireAdmin>}></Route>
          
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
