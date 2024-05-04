import { Typography,Box,styled } from "@mui/material";

const Image=styled(Box)`
background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
center/55% repeat-x #000;

width:100%;
height:50vh;
justify-content:center;
Align-items:center;
display:flex;
flex-direction:column;

`

const Heading=styled(Typography)`
color:#FFFFFF;
font-size:70px;
line-height:1;
`

const Subheading = styled(Typography)`
  color: #ffffff;
  font-size: 20px;
  
`
const Banner=()=>{

    return(
     <Image>
        <Heading>BLOG</Heading>
        <Subheading>Quill Space</Subheading>
     </Image>
    )
}

export default Banner;