import React, { useState, useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../assets/user.png";
import axios from "axios";
import { setData as setUserData } from "../store/UserSlice.js";
import { MdOutlineEmail } from "react-icons/md";
import Button from "./Button.jsx";
import { MdModeEdit } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const userData = useSelector((state) => state.userReducer.user);
  // console.log(userData);
  const navigate = useNavigate()  
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    // console.log("Called");

    const resp = await axios.get("/user/getUser", {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    // console.log(resp);
    const data = resp.data.user;
    // dispatch(setData(data));
    // setData(data);

    const newDataObj = {};

    for (let key in data) {
      if (typeof data[key] === "string") newDataObj[key] = data[key];
    }

    dispatch(setUserData(newDataObj));
    setData(newDataObj);
  };

  useEffect(() => {
    fetchUserData();
    setLoading(false);
  }, []);

  return loading ? (
    <h1 className="text-2xl font-bold text-center h-screen">Loading...</h1>
  ) : (
    <div className="min-h-screen px-3 flex flex-col items-center">
      <div className=" mt-4 w-full h-fit bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-b-lg flex justify-center py-5">
        <div className="max-h-[400px] w-[300px] drop-shadow-lg my-auto hover:scale-105 duration-200 cursor-pointer overflow-hidden">
          <img
            className="w-full rounded-lg object-contain max-h-[300px]"
            src={data?.profilePicture || image}
            alt="profile pic"
            
          />
          <h1 className="mt-2 text-center font-bold text-2xl text-white">
            {data?.name || "username"}
          </h1>
        </div>
      </div>
      <div className="mt-3 w-full flex justify-end px-5 cursor-pointer">
        <Button
        onClick={e => navigate("/update")}
        className="bg-red-400">
          <MdModeEdit />
        </Button>
      </div>
      <div className="w-full flex gap-5 mt-2 justify-center ">
        {/* eamil */}
        <div className="border border-slate-300 flex items-center gap-3 p-2 hover:scale-105 duration-200 cursor-pointer">
          <span className="text-xl">
            <MdOutlineEmail />
          </span>
          <span className="text-xl font-semibold">{data?.email}</span>
        </div>
        {/* phone number */}
        <div className="border border-slate-300 flex items-center gap-3 p-2 hover:scale-105 duration-200 cursor-pointer">
          <span className="text-xl">
            <IoMdContact />
          </span>
          <span className="text-xl font-semibold">{data?.phoneNumber}</span>
        </div>

        {/* address */}
      </div>
      <div className="w-3/4 mt-5">
        <div className="border border-slate-300 flex items-center gap-3 p-2 hover:scale-105 duration-200 cursor-pointer">
          <span className="text-xl">
            <MdLocationPin />
          </span>
          <span className="text-xl font-semibold">{data?.address}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
