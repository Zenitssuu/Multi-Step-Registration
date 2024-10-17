import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import axios from "axios";
import { setData as setUserData } from "../../store/UserSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function UpdateForm() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: user.data.name,
      address: user.data.address,
      phoneNumber: user.data.phoneNumber,
    },
  });

  //   console.log(user);

  const submit = async (data) => {
    // console.log(data);
    setIsUpdating(true);
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.address) formData.append("address", data.address);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    if (data.password) formData.append("password", data.password);
    if (data.image[0]) formData.append("profileImage", data.image[0]);

    const resp = await axios.put("/user/updateUser", formData, {
      headers: {
        // "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    // console.log(resp);

    if (resp.status === 201 || resp.status === 200) {
      toast.success("updated sucessfully!!");
      const userData = resp.data.user;
      const newDataObj = {};
      for (let key in userData) {
        if (typeof data[key] === "string") newDataObj[key] = data[key];
      }
      dispatch(setUserData(newDataObj));
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    }

    else{
      toast.error("something went wrong!! Try again")
    }
    setIsUpdating(false);
  };

  return (
    <div className="w-[600px]">
      <form
        className="border flex items-center flex-col py-2 px-5 bg-slate-400 shadow-lg drop-shadow-lg rounded-lg"
        onSubmit={handleSubmit(submit)}
      >
        {/* name */}
        <div className="w-full flex flex-col items-center p-3">
          <Input
            className="w-1/2"
            label="Name: "
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
        </div>
        {/* password */}
        <div className="w-full flex flex-col items-center p-3">
          <Input
            className="w-1/2"
            label="New Password: "
            type="password"
            placeholder="Enter your new password"
            {...register("password")}
          />
        </div>

        {/* address */}
        <div className="w-full flex flex-col items-center p-3">
          <Input
            className="w-1/2"
            label="Address: "
            type="text"
            placeholder="Enter your Address"
            {...register("address")}
          />
        </div>

        {/* phone Number */}
        <div className="w-full flex flex-col items-center p-3 ">
          <Input
            className="w-1/2"
            label="Phone Number: "
            type="text"
            placeholder="Enter your number"
            {...register("phoneNumber")}
          />
        </div>

        {/* image */}
        <div className="w-full p-3">
          <Input
            label="Profile Picture (optional) : "
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
          />
        </div>

        <div className="lg:w-full flex px-5 justify-center mt-3 gap-x-[4rem] mb-4">
          <Button type="submit" className=" bg-green-500 px-[4rem]">
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
