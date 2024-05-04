import { useContext, useState } from "react";
import { Box, Button, TextField, styled, Typography } from "@mui/material";
import { API } from "../api";
import { Datacontext } from "../dataprovider";
import { useNavigate } from "react-router-dom";


const Component = styled(Box)`
  width: 350px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Error=styled(Typography)`
  font-size:10px;
  font-weight:600;
  line-height:0;
  font-color: #ff6161;
  margin-top:10px;
`
const Login = ({isUserAuthenticated}) => {
  const sign = {
    name: "",
    username: "",
    password: "",
  };

  const log = {
    username: "",
    password: "",
  };
  const [account, setaccount] = useState("login");
  const [signup, setsignup] = useState(sign);
  const [login, setlogin] = useState(log);
  const [error,seterror]=useState('');
  const {setAccount}=useContext(Datacontext);
  const navigate=useNavigate();
  
  // const sc=account==='signup'?setaccount('login') : setaccount('signup');
  const setsignupvalues = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });

  };
  const setloginvalues = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  // const togglesignup=()=>{
  //   account==='signup'? setaccount('login'):setaccount('signup');
  // }
  const onsignup = async () => {
    console.log("h1");
    let response = await API.usersignup(signup);
    if(response.isSuccess){
      seterror('');
        setsignup(sign);
        setaccount('login');
    }
    else{
       seterror('something went wrong');
    }
  }
    const onlog =async () => {
    console.log("h1");
    let response = await API.userlogin(login);
    if(response.isSuccess){
        seterror('');
        sessionStorage.setItem("accesstoken",`Bearer ${response.data.accesstoken}`);
        sessionStorage.setItem("refreshtoken",`Bearer ${response.data.refreshtoken}`);

        setAccount({
          username: response.data.username,
          name: response.data.name,
        });
        // setlogin(log);
        // setaccount('login');
        isUserAuthenticated(true);
        navigate('/');
    }
    else{
       seterror('something went wrong');
    }
  }

  return (
    <Component>
      <Box>
        <Image
          src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png"
          alt="login"
        ></Image>
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => {
                setloginvalues(e);
              }}
              name="username"
              label="Enter username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => {
                setloginvalues(e);
              }}
              name="password"
              label="Enter password"
            />
            <Button variant="contained" style={{ backgroundColor: "orange" }}
            onClick={onlog}>
              Login
            </Button>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <Button
              onClick={() => {
                setaccount("signup");
              }}
              style={{
                boxShadow: "2px 2px 2px 2px rgb(0 0 0/ 0.3)",
                color: "orange",
              }}
            >
              Create an account
            </Button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => {
                setsignupvalues(e);
              }}
              name="name"
              label="Enter name"
            />
            <TextField
              variant="standard"
              onChange={(e) => {
                setsignupvalues(e);
              }}
              name="username"
              label="Enter username"
            />
            <TextField
              variant="standard"
              name="password"
              onChange={(e) => {
                setsignupvalues(e);
              }}
              label="Enter password"
            />
            {error && <Error>{error}</Error>}
            <Button
              onClick={onsignup}
              variant="contained"
              style={{ backgroundColor: "orange" }}
            >
              Signup
            </Button>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <Button
              onClick={() => {
                setaccount("login");
              }}
            >
              Already have an account
            </Button>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
