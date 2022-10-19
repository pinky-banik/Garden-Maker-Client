import React, { useState } from "react";
import Moment from "moment";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";
import image from "../../assets/bg.jpg";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const imgStorageKey = "e45298c57c6b915f179ec8d9543b8284";
  if (loading) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.image[0];
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    let img;
    const formData = new FormData(); //this thing is coming from uploading a file.. mozila cdn docs
    formData.append("image", image);
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          img = result.data.url;
          // send to your database
        }
      });
    const formattedDate = Moment().format("YYYY-MM-DD");
    const tools = {
      title: data.title,
      details: data.details,
      img: img,
      date: formattedDate,
    };
    await fetch("https://fathomless-coast-84439.herokuapp.com/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(tools),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Blog create successfully");
          reset();
          setLoading(false);
        } else {
          toast.error("Failed to create the blog");
        }
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="text-2xl text-primary">Create A new Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs focus:outline-none"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is Required",
                },
              })}
            />
            <label className="label">
              {errors.title?.type === "required" && (
                <span className="label-text-alt text-red-500 ">
                  {errors.title.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <textarea
              type="text"
              placeholder="details"
              className="input input-bordered w-full max-w-xs focus:outline-none  h-56"
              {...register("details", {
                required: {
                  value: true,
                  message: "Name is Required",
                },
              })}
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="p-3 border-2 rounded-xl w-full max-w-xs focus:outline-none"
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is Required",
                },
              })}
            />
            <label className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.image.message}
                </span>
              )}
            </label>
          </div>

          <input
            className="btn btn-primary w-full max-w-xs text-white"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    </div>
  );
};
export default CreateBlog;
