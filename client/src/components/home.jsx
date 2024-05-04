import React from "react";
import Banner from "./Banner.jsx";
import Categories from "./categories.jsx";
import Post from "./post.jsx"
import { Grid } from "@mui/material";
// import post from "../../../server/postmodel.js";
const Home = () => {
    return (
      <>
        <Banner />
        <Grid container>
          <Grid item lg={2} sm={2} xs={12}>
            <Categories />
          </Grid>
          <Grid container item lg={10} sm={10} xs={12}>
            <Post />
          </Grid>
        </Grid>
      </>
    );
}

export default Home;