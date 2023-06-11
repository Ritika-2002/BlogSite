import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import "./Login.css";
import { red} from "@mui/material/colors";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
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
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="column">
          <img src="https://kunzleigh.com/wp-content/uploads/2020/06/Working_from_Home_Graphic_Girl.png" />
        </div>
        <div className="column">
          <form onSubmit={handleSubmit}>
            <Box
              // maxWidth={450}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={5}
              // boxShadow="10px 10px 20px #ccc"
              padding={3}
              borderRadius={5}
            >
              <Typography
                variant="h4"
                sx={{ textTransform: "uppercase" }}
                padding={3}
                textAlign="center"
                fontSize="2.5rem"
              >
                Login
              </Typography>

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
                className="submit_btn"
                type="submit"
                style={{backgroundColor:"#F4CA13"}}
                sx={{ borderRadius: 3, marginTop: 3 }}
                variant="contained"
                 // blueGrey={900}
              >
                Submit
              </Button>
              <Button
                className="submit_btn"
                onClick={() => navigate("/register")}
                style={{color:"#008B74"}}
                sx={{ borderRadius: 3, marginTop: 3 }}
              >
                Not a user ? Please Register
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
