import React, { useRef, useState, useEffect } from "react";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { clearDetails } from "../../store/FormSlice.js";

function Review() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [profileImage, setProfileImage] = useState();
  const { handleSubmit, register } = useForm();

  const userData = useSelector((state) => state.formReducer);
  // console.log(userData);

  // console.log(userData);

  // const handleSubmit = async () => {
  //   // console.log("here");
  //   console.log(userData);
  //   console.log(profileImage);

  
  // };

  const submit = async (data) => {
    // console.log(userData);
    // console.log(data);  

    if(!userData.name || !userData.email || !userData.password || !userData.address || !userData.phoneNumber){
      navigate('/signup/credentials');
    }

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("address", userData.address);
    formData.append("phoneNumber", userData.phoneNumber);
    formData.append("profileImage",data.image[0]);

    const resp = await axios.post('/user/signup',formData);
    // console.log(resp);   
    dispatch(clearDetails())

    navigate('/login')
        
  };

  return (
    <div className="bg-slate-500 p-5 rounded-md drop-shadow-lg shadow-lg mb-5">
      {/* credentials */}
      <form onSubmit={handleSubmit(submit)}>
        <div className="border-b-2 border-slate-400 p-3 w-[500px] space-y-5">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">Credentials</h1>
            <Button
              onClick={(e) => navigate("/signup/credentials")}
              className="bg-red-400"
            >
              <MdEdit />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="Name: "
              className="w-full"
              value={userData.name}
              readOnly
            />
            <Input
              label="Email: "
              className="w-full"
              value={userData.email}
              readOnly
            />
          </div>
        </div>

        {/* address */}
        <div className="border-b-2 border-slate-400 p-3 w-[500px] space-y-5 mt-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">Address</h1>
            <Button
              onClick={(e) => navigate("/signup/address")}
              className="bg-red-400"
            >
              <MdEdit />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="Address: "
              className="w-full"
              value={userData.address}
              readOnly
            />
            <Input
              label="Phone Number: "
              className="w-full"
              value={userData.phoneNumber}
              readOnly
            />
          </div>
        </div>

        {/* image */}
        <div className="w-[500px] p-3">
          <Input
            label="Profile Picture (optional) : "
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
          />
        </div>
        <div className="w-[500px] flex justify-center mt-4">
          <Button type="submit" className="px-7">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Review;
