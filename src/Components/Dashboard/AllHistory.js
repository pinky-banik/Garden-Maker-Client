import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";

const AllHistory = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://garden-maker-server.vercel.app/history")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        console.log(data);
      });
  }, []);

  const handleDelete = (id) => {
    const url = `https://garden-maker-server.vercel.app/history/${id}`;

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
            if (data.deletedCount) {
              const remaining = orders.filter((order) => order._id !== id);
              setOrders(remaining);
              Swal.fire("Deleted!", "", "success");
            }
          });
      }
    });
  };

  return (
    <div className="text-sm">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>image</th>
              <th>name</th>
              <th>email</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Transection ID</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={order.img} alt={order.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.productName}</td>
                <td>${order.price}</td>
                <td>{order.date}</td>

                <td>{order.transectionId}</td>
                <td>
                  <button
                    onClick={() => handleDelete(order._id)}
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

export default AllHistory;
