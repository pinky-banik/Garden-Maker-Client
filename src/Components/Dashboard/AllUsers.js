import React, { useEffect, useState } from "react";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  // const [selectedTool,setSelectedTool] = useState({});
  // const [openBooking, setBookingOpen] = useState(false);

  useEffect(() => {
    fetch("https://garden-maker-server.vercel.app/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    setLoading(false);
  }, [users]);

  if (loading) {
    return <Loading />;
  }

  // const handleId =async tool=>{
  //   setSelectedTool(tool);
  //   setBookingOpen(true)
  //   }

  const handleDelete = (id) => {
    const url = `https://garden-maker-server.vercel.app/user/${id}`;
    Swal.fire({
      icon: "warning",
      title: "Are you sure to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(url, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("User deleted Successfully");
            } else {
              toast.error("User deleting unsuccessful");
            }
          });
      }
    });
  };

  const handleMakeAdmin = (email) => {
    fetch(`https://garden-maker-server.vercel.app/user/admin/${email}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>image</th>
              <th>Name</th>
              <th>email</th>
              <th>Make Admin</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.img} alt={user.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => handleMakeAdmin(user.email)}
                      className="btn btn-xs btn-secondary"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button className="btn btn-xs btn-disabled">Admin</button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 text-2xl"
                  >
                    <RiDeleteBin2Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
