import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import {login as authLogin} from "../../store/UserSlice.js"
import { useNavigate } from "react-router-dom";


function Login() {
    const {handleSubmit,register} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data)=>{
        const formData = new FormData();
        formData.append('email',data.email);
        formData.append('password',data.password);

        const resp = await axios.post('/user/login',formData,{
          headers:{
            "Content-Type":"application/json"
          }
        });
        console.log(resp);
              
        if(resp.status === 200){
          const token = resp.data.token
          dispatch(authLogin(token));
          navigate('/dashboard');            
        }
    }

  return (
    <div className="w-full h-screen flex justify-center bg-slate-200 items-center">
      <form
        className="border flex w-[500px] items-center flex-col py-5 px-5 bg-slate-400 shadow-lg drop-shadow-lg rounded-lg"
        onSubmit={handleSubmit(submit)}
      >
        {/* email */}
        <div className="w-full flex flex-col items-center p-3 ">
          <Input
            className="w-1/2"
            label="Email: "
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
        </div>

        {/* password */}
        <div className="w-full flex flex-col items-center p-3">
          <Input
            className="w-1/2"
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
        </div>

        <div className="lg:w-full flex px-5 justify-center mt-3 gap-x-[4rem] mb-4">
          <Button type="submit" className=" bg-blue-500 px-[4rem]">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
