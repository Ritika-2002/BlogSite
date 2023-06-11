import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./styling.css"
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  //SEARCH API REQUIRED
  const SearchHandle = async(event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8080/get-search/${key}`);
      result = await result.json();
      if (result) {
        setBlogs(result);
      }
    } else {
      getAllBlogs();
    }
  }

  return (
    <div>

      <input className="find" type="text" id="searchSub"placeholder="Search" onChange={SearchHandle} />
      <button className="find-btn">Search</button>

      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            subject={blog?.subject}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;
