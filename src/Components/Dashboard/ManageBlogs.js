import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import {RiDeleteBin2Fill} from  'react-icons/ri';
import {FiEdit} from 'react-icons/fi';
import UpdateBlogModal from './UpdateBlogModal';
import {AiFillEye} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const ManageBlogs = () => {
    const [loading,setLoading] = useState(true);
    const[blogs,setBlogs] = useState([]);
    const [selectedBlog,setSelectedBlog] = useState({});
    const [openBooking, setBookingOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:4000/blog")
        .then(res=>res.json())
        .then(data=>setBlogs(data));
        setLoading(false);
    },[blogs]);


    if(loading){
        return <Loading/>
    }
    
    
    const handleId =async blog=>{
      setSelectedBlog(blog);
      setBookingOpen(true)
      }

    const handleDelete = async id =>{
      await fetch(`http://localhost:4000/blog/${id}`,{
        method:'DELETE',
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.deletedCount > 0){
          toast.success("Blog deleted Successfully");
        }
        else{
          toast.error("Blog deleting unsuccessful");
        }
      })
    }

    const handleWatch=id =>{
        navigate(`/blogDetails/${id}`);

    }
    

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                    <tr>
                        <th>index</th>
                        <th>img</th>
                        <th>title</th>
                        <th>Date</th>
                        <th>watch</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map((blog,index)=>
                                <tr key={blog._id}>
                                    <td>{index+1}</td>
                        <td>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={blog.img} alt={blog.title} />
                            </div>
                            </div>
                        </div>
                        </td>
                        <td>
                        {blog.title.slice(0,15)}...
                        </td>
                        <td>
                        {blog.date}
                        </td>
                        <td>
                            <button onClick={()=>handleWatch(blog._id)} className='text-2xl text-blue-500'><AiFillEye /></button>
                        </td>
                        <td>
                        <label onClick={()=> handleId(blog)} htmlFor="updateModal" className="text-blue-500 text-2xl"><FiEdit/></label>
                        {
                        <UpdateBlogModal data={selectedBlog} openBooking={openBooking} setBookingOpen={setBookingOpen}/>
                        }
                        </td>
                        <td>
                        <button onClick={()=>handleDelete(blog._id)} className="text-red-500 text-2xl"><RiDeleteBin2Fill/></button>
                        </td>
                    </tr>)
                        }
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default ManageBlogs;