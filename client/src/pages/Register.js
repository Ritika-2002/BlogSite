import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import './Login.css';
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="column">
          <img src="https://canopy.io/wp-content/themes/loupe/assets/img/Resources/Implementation/implementation_hero_image@2x.png"/>
        </div>
        <div className="column">
        <form onSubmit={handleSubmit}>
        <Box
              maxWidth={400}
              color={"#845EC2"}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={7}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          // borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
                type="submit"
                style={{backgroundColor:"#845EC2"}}
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
              <Button
                style={{color:"#845EC2"}}
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registerd ? Please Login
          </Button>
        </Box>
      </form>
        </div>
      </div>
       
    </>
  );
};

export default Register;
