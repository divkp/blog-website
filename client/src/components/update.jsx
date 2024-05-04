import {
  Box,
  FormControl,
  styled,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Datacontext } from "../dataprovider";
import { API } from "../api";
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Container = styled(Box)`
  margin: 50px 100px;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin-top: 0px 30px;
  font-size: 18px;
`;

const StyledTextarea = styled(TextareaAutosize)`
  margin-top: 50px;
  width: 100%;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const Initialpost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdate: new Date(),
};

const Update= () => {
  const {id}=useParams();
  const [post, setpost] = useState(Initialpost);
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const [file, setfile] = useState("");

  const { Account } = useContext(Datacontext);
  const location = useLocation();
  const navigate = useNavigate();
   useEffect(() => {
     const fetchData = async () => {
       const response = await API.getPost(id);
       if (response.isSuccess) {
         setpost(response.data);
       }
     };

     fetchData();
   }, []);
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        console.log("hello");
        const response = await API.uploadImage(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = Account.username;
  }, [file]);

  const handlechange = (e) => {
    setpost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async () => {
   
    try {
        //  console.log("hell");
      let response = await API.updatePost(post);
      console.log("hell");
      if (response.isSuccess) {
        navigate(`/detail/${id}`);
        console.log('hell')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Container>
        <Image src={url} alt="Banner"></Image>
        <StyledFormControl>
          <label htmlFor="fileinput">
            {" "}
            <Add color="action" fontSize="large" />
          </label>
          <input
            type="file"
            id="fileinput"
            style={{ display: "none" }}
            onChange={(e) => {
              setfile(e.target.files[0]);
            }}
          ></input>
          <StyledInputBase
            placeholder="Title"
            value={post.title}
            onChange={(e) => {
              handlechange(e);
            }}
            name="title"
          ></StyledInputBase>
          <Button variant="contained" onClick={() => updateBlogPost()}>
            Update
          </Button>
        </StyledFormControl>
        <StyledTextarea
          minRows={5}
          placeholder="Tell your story..."
          onChange={(e) => {
            handlechange(e);
          }}
          name="description"
          value={post.description}
        ></StyledTextarea>
      </Container>
    </div>
  );
};

export default Update;
