import { useEffect, useState } from "react";
import { API } from "../api";
import { Box,Grid ,styled} from "@mui/material";
import Pos from "./pos";
import { useSearchParams,Link } from "react-router-dom";
import { AlignHorizontalCenter } from "@mui/icons-material";
const Stylebox = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const Post = () => {
  const [posts, setposts] = useState([]);
  const [searchParams]=useSearchParams();
  const category=searchParams.get('category')

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({category:category || ""});
      if (response.isSuccess) {
        console.log("check1");
        setposts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid container item lg={3} sm={4} xs={12}>
            <Link to={`detail/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
              <Pos post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Stylebox> No Blogs to display</Stylebox>
      )}
    </>
  );
};

export default Post;
