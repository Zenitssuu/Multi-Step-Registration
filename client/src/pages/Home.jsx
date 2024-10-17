import React,{useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/ils2.jpeg";
import UnAuthorizedPage from "./UnAuthorizedPage.jsx";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard.jsx";

function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  
  // console.log(token);
  // console.log(user.token);

  useEffect(() => {
    if(token && user?.token && token===user?.token){
      navigate('/dashboard')
    }

  },[navigate,setIsAuthorized])

  if(!isAuthorized){
    return <UnAuthorizedPage /> 
  } 
}

export default Home;
