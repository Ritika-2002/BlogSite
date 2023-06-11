import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import "./styling.css";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    subject:"",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        subject:inputs.subject,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"70%"}
          // border={3}
          // borderRadius={10}
          padding={2}
          margin="auto"
          boxShadow={"5px 5px 10px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="20px"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={2}
            color="black"
          >
          Let's write it
          </Typography>
          <InputLabel
            sx={{  mt: 1, fontSize: "20px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            placeholder="title"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{  mt: 1, fontSize: "20px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            placeholder="write your context"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{   mt: 1, fontSize: "20px", fontWeight: "bold" }}
          >
            Subject
          </InputLabel>
          <TextField
            name="subject"
            value={inputs.subject}
            placeholder="subject"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{  mt: 1, fontSize: "20px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            placeholder="paste the url of the image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" variant="h5" className="create_btn" style={{color:"white"}}>
            PUBLISH
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
