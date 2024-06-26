import {Box, Typography,styled } from "@mui/material";
import { useContext } from "react";
import { Datacontext } from "../dataprovider";
import { Delete } from "@mui/icons-material";
import { API } from "../api";
const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const Comment =({comment,setToggle})=>{
     const {Account}=useContext(Datacontext);
     const removeComment=async ()=>{
           const response=await API.deleteComment(comment._id);
           if(response.isSuccess){
               setToggle(prevState=>!prevState)
           }
     }
    return(
        <Component>
            <Container>
               <Name>{comment.name}</Name>
               <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
               {comment.name===Account.username && <DeleteIcon onClick={()=>removeComment()}/>}
            </Container>
            <Box>
                <Typography >{comment.comments}</Typography>
            </Box>
        </Component>
    )
}

export default Comment;