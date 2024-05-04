// import logo from './logo.svg';
import {BrowserRouter,Routes,Route,Outlet, Navigate} from 'react-router-dom'
import './App.css';
import Login from './components/login.jsx'
import Dataprovider from './dataprovider.jsx';
import Home from './components/home.jsx';
import React from 'react';
import Header from './components/header.jsx';
import { useState } from 'react';
import Createpost from './components/createpost.jsx';
import Detail from './components/DetailsView.jsx';
import Update from './components/update.jsx';
import About from './components/about.jsx';
import Contact from './components/contact.jsx';
const PrivateRoute=({isAuthenticated})=>{
    return isAuthenticated ? (
      <>
        <Outlet />
        <Header />
      </>
    ) : (
      <Navigate replace to="/login" />
    );
}
function App() {
  const [isAuthenticated,isUserAuthenticated]=useState(false);
  return (
    <Dataprovider>
      <BrowserRouter>
        <div className="App" style={{ marginTop: "64px" }}>
          <Routes>
            <Route
              path="/login"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/create" element={<Createpost />} />
            <Route
              path="/detail/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/detail/:id" element={<Detail />} />
            </Route>
            <Route
              path="/update/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/update/:id" element={<Update />} />
            </Route>
            {/* <Route
              path="/delete/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/delete/:id" element={<></>} />
            </Route> */}
            <Route
              path="/about"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/about" element={<About />} />
            </Route>
            <Route
              path="/contact"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/contact" element={<Contact/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Dataprovider>
  );
}

export default App;
