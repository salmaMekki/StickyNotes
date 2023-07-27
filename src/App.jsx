import "./App.css";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode'
import Notfound from "./Components/Notfound/Notfound";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const navigate=useNavigate()
  let[userData,setUserData]=useState(null)
  function saveUserData(){
    let encodedToken=localStorage.getItem('userToken')
    let decodedToken=jwtDecode(encodedToken)
    setUserData(decodedToken)
    console.log(decodedToken);
  }
  useEffect(() => {
    if(localStorage.getItem('userToken')!=null)
    {
      saveUserData();
    }
  }, [])
  function logout(){
    localStorage.removeItem('userToken');
    setUserData(null)
    navigate('/about')

  }
  function ProtectedRoute(props){
    if(localStorage.getItem('userToken')==null){
    return  <Navigate to={'/login'}/>
    }else{
     return props.children;
    }
  }
  
  return (
    <div className="App">
<Navbar userData={userData} logout={logout}/>
<Routes>
      <Route path="/" element={<About />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route path="login" element={<Login savaUserData={saveUserData}/>}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      <Route path="*" element={<Notfound/>}></Route>
    </Routes>
    </div>
    
  );
}

export default App;
