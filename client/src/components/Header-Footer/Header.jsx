import React, { useState, useEffect } from "react";
import Button from "../Button.jsx";
import { FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as authLogout } from "../../store/UserSlice.js";
import { clearDetails } from "../../store/FormSlice.js";

function Header() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearDetails());
    dispatch(authLogout());
    navigate("/");
  };  
  useEffect(() => {
    if (user?.token === token) {
      setIsAuthorized(true);
    }
  },);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b shadow-lg bg-[#f3e0cf]">
      <div className="w-full px-4">
        <nav className="flex items-center justify-between w-full">
          <div className="w-1/12 font-bold text-xl">
            <Link to="/">
              <FaHome />
            </Link>
          </div>

          <ul className="flex gap-4">
            {isAuthorized ? (
              <li>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 text-gray-700 inline-block px-3 py-1 duration-200 hover:bg-slate-300 rounded-full text-lg"
                >
                  Logout
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Button
                    onClick={(e) => navigate("/login")}
                    className=" text-white inline-block px-3 py-1 duration-200 hover:bg-slate-300 rounded-full text-lg"
                  >
                    Sign In
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={(e) => navigate("/signup/credentials")}
                    className=" text-white inline-block px-3 py-1 duration-200 hover:bg-slate-300 rounded-full text-lg"
                  >
                    Sign Up
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
