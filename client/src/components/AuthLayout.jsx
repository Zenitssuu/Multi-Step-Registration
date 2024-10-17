import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children }) {
  //fetching the user from redux and token from localstorage,
  //if both are same then user is authorized
  // else unuthorized
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const token = localStorage.getItem("token");

  // console.log(user);
  
  useEffect(() => {
    if (user?.token === token) {
      setIsAuthorized(true);
    } else {
      navigate("signup/credentials");
    }
    setLoading(false);
  }, [setIsAuthorized, navigate]);

  
  return loading ? (
    <div className="w-full h-screen text-4xl flex items-center justify-center">
      Loading...
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
