import { Box,Button,TextareaAutosize ,styled} from "@mui/material";
import { useState,useContext, useEffect } from "react";
import { Datacontext } from "../dataprovider";
import { API } from "../api";
import Comment from "./comment";
const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px !important;
  width: 100%;
  margin: 0 20px;
`;

const initialValue = {
  name: '',
  postId: '',
  date: new Date(),
  comments: ''
};
export const Comments=({post})=>{
    const { Account } = useContext(Datacontext);
    const [comment,setcomment]=useState(initialValue);
    const [comments,setComments]=useState([]);
    // as to re render to display new added comment we need to change state so need a new state
    const [toggle,setToggle]=useState(false);
    const handlechange=(e)=>{
        setcomment({
            ...comment,
            name: Account.username,
            postId: post._id,
            comments: e.target.value,
        }
        )
    }

    useEffect(()=>{
      const getdata=async ()=>{
        
          const response=await API.getAllComments(post._id);
          if(response.isSuccess){
            setComments(response.data);
           
          }
      }
      if(post._id){
      getdata();
      }
    },[post,toggle])

    const AddComment=async (e)=>{
      let response=await API.Addcomment(comment);
      if(response.isSuccess){
         console.log("xx")
         setcomment(initialValue);
      }
      setToggle(prevState => !prevState);
    }
    return(
       <Box>
         <Container>

           <Image src="https://static.thenounproject.com/png/12017-200.png" alt="dp"/>
           <StyledTextArea 
            minRows={5}
            placeholder="what's on your mind ?"
            value={comment.comments}
            onChange={(e)=>handlechange(e)}
           />
           <Button variant="contained" size="medium" style={{height:40}}
           onClick={(e)=>AddComment(e)} >Post</Button>

         </Container>
         <Box>
          {
            comments && comments.length>0 && comments.map((comment)=>
               <Comment comment={comment} setToggle={setToggle}/>
            )
          }

         </Box>
       </Box>
    )
}

export default Comments;