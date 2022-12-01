import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBlog from "../../Hooks/useBlog";
import Footer from "../Shared/Footer";
import Loading from "../Shared/Loading";
import BlogSlider from "./BlogSlider";
import blogCover from "../../assets/blogcover.webp";
import Navbar from "../Shared/Navbar";

const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const { blogId } = useParams();
  const [blogs, blogLoading] = useBlog();

  const navigate = useNavigate();

  const handleRoute = (id) => {
    navigate(`/blogDetails/${id}`);
  };

  const { img, title, date, details } = blog;

  useEffect(() => {
    fetch(`https://garden-maker-server.vercel.app/blog/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });
  }, [blog]);

  if (blogLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar/>
      <div className="pt-18 ">
      <div className="hero " style={{ backgroundImage: `url('${blogCover}')` }}>
        <div className="hero-overlay bg-opacity-80 bg-primary"></div>
        <div className="hero-content text-center py-36">
          <div className="max-w-md">
            <p className="text-white text-4xl">{title}</p>
          </div>
        </div>
      </div>
      <div className="w-3/4 mx-auto py-10">
        <img src={blogCover} alt={title} />
        <p className="text-gray-600 py-10">
          Garden tools have evolved a lot over the years, from the digging
          sticks of antiquity to today’s highly specialized tools. Unlike other
          hobbies, you don’t really need to spend a lot when it comes to
          gardening. You can start with just the sun, good soil, and seeds. But
          gardening can be a grueling task and that’s why we have tools to make
          things easier.
          <br />
          Every season brings new garden gadgets and having the basic garden
          tool groups will help you maintain your garden year after year. Check
          out this list of the best must-have garden tools for every gardener.
        </p>
        <div>
          <h1 className="text-4xl text-primary py-5">{title}</h1>
          <div className="grid grid-cols-1  sm:grid-cols-2 gap-10">
            <img
              className="max-h-96 w-full object-cover object-center"
              src={img}
              alt=""
            />
            <p>{details}</p>
          </div>
        </div>
      </div>

      <BlogSlider />
      <Footer />
    </div>
    </div>
  );
};

export default BlogDetails;
