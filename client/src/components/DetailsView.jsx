import { useState, useEffect, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { API } from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import { Datacontext } from "../dataprovider";
import Comments from "./comments";
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Detail = () => {
  const navigate = useNavigate();
  const { Account } = useContext(Datacontext);
  const [post, setpost] = useState({});
  const { id } = useParams();
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPost(id);
      if (response.isSuccess) {
        setpost(response.data);
      }
    };

    fetchData();
  }, []);

  const DeleteBlog = async () => {
    try {
      //  console.log("hell");
      let response = await API.deletePost(post._id);

      if (response.isSuccess) {
        console.log("hell");
        navigate("/");
        // console.log("hell");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Container>
        <Image src={url} alt="blog"></Image>
        <Box style={{ float: "right" }}>
          {Account.username === post.username ? (
            <>
              <Link to={`/update/${post._id}`}>
                <EditIcon color="primary" />
              </Link>

              <DeleteIcon onClick={() => DeleteBlog()} color="error" />
            </>
          ) : (
            <></>
          )}
        </Box>
        <Heading>{post.title}</Heading>

        <Author>
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
          </Typography>
          <Typography style={{ marginLeft: "auto" }}>
            {new Date(post.createdate).toDateString()}
          </Typography>
        </Author>
        <Typography style={{ wordBreak: "break-word" }}>
          {post.description}
        </Typography>
        <Comments post={post}/>
      </Container>
    </>
  );
};

export default Detail;
