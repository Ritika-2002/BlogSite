import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./style.css";

export default function BlogCard({
  title,
  description,
  subject,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="main_card"
        // sx={{
        //   width: "80%",
        //   height:"21rem",
        //   margin: "auto",
        //   mt: 2,
        //   padding: 2,
        //   // boxShadow: "5px 5px 10px #ccc",
        //   // ":hover:": {
        //   //   boxShadow: "10px 10px 20px #ccc",
        //   // },
        // }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar style={{
              backgroundImage:"linear-gradient(to right top, #008b74, #00a381, #00bc8d, #00d597, #09ee9f)"}} aria-label="recipe">
              {username}
            </Avatar>
          }
          title={username}
          subheader={time}
        />
        <div className="row">
          <div className="column">
          <CardContent>
              <Typography variant="h6" color="text.secondary" style={{marginTop:"-2rem"}}>
                Title : {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description : {description}
              </Typography>
              <Typography className="sub" style={{marginTop:"10px" }}>
                {subject}
              </Typography>
            </CardContent>
          </div>
          <div className="column">
          <div className="imgcol">
              <CardMedia
                component="img"
                className="img1"
                image={image}
                alt="Paella dish"
              />
            </div>
           
          </div>
        </div>
      </div>
      <hr className="line" />
    </>
  );
}
