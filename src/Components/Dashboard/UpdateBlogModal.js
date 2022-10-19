import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { catagory as catagorys } from "../Shared/Catagory";
import Loading from "./../Shared/Loading";

const UpdateBlogModal = ({ data, openBooking, setBookingOpen }) => {
  const [loading, setLoading] = useState(false);

  const { _id, img, details, title, date } = data;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const imgStorageKey = "e45298c57c6b915f179ec8d9543b8284";

  // if(loading){
  //     alert('loading.....');
  // }
  const onSubmit = async (data) => {
    setLoading(true);
    let imgUrl;
    const image = data.image[0];
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    const formData = new FormData(); //this thing is coming from uploading a file.. mozila cdn docs
    formData.append("image", image);
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          imgUrl = result.data.url;
          // send to your database
        }
      });
    const updatedBlog = {
      title: data.title || title,
      details: data.details || details,
      date: data.date || date,
      img: imgUrl || img,
    };
    await fetch(`https://fathomless-coast-84439.herokuapp.com/blog/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Blog Updated Successfully");
          setLoading(false);
          reset();
          setBookingOpen(false);
        } else {
          toast.error("Blog Updating Unsuccessful");
        }
      });
  };

  return (
    <div>
      {openBooking && (
        <div>
          <input type="checkbox" id="updateModal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle mt-16">
            <div className="modal-box">
              <label
                htmlFor="updateModal"
                className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="flex justify-center items-center">
                <div>
                  <h2 className="text-2xl text-primary">Update This Blog</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Update Title</span>
                      </label>
                      <input
                        type="text"
                        placeholder={title}
                        className="input input-bordered w-full max-w-xs focus:outline-none"
                        {...register("name")}
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Update Date ({date})</span>
                      </label>
                      <input
                        type="date"
                        placeholder={date}
                        className="input input-bordered w-full max-w-xs focus:outline-none p-3"
                        {...register("date")}
                      />
                    </div>

                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Update Details</span>
                      </label>
                      <textarea
                        type="text"
                        placeholder={details}
                        className="input input-bordered w-full max-w-xs focus:outline-none overflow-y-scroll h-56"
                        {...register("details")}
                      />
                    </div>

                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Update Photo</span>
                      </label>
                      <div className="avatar">
                        <div className="mask mask-squircle w-24 h-24 mx-auto">
                          <img src={img} alt={title} />
                        </div>
                      </div>
                      <input
                        type="file"
                        className="p-3 border-2 rounded-xl w-full max-w-xs focus:outline-none"
                        {...register("image")}
                      />
                    </div>
                    <div>
                      <input
                        htmlFor="updateModal"
                        className="btn btn-primary w-full max-w-xs my-3 text-white"
                        type="submit"
                        value="Update"
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBlogModal;
