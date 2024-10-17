import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setName, setPassword } from "../../store/FormSlice.js";

function Credentials() {
  //take user input from feild and send it to redux state
  //email, name, passowrd( re-type password for checking)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.formReducer);
  // console.log(userData);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  const submit = (data) => {
    const { name, email, password} = data;
    dispatch(setName(name));
    dispatch(setEmail(email));
    dispatch(setPassword(password));
    // dispatch(setImage(image))
    navigate("/signup/address");
  };

  return (
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
          {...register("name", { required: true })}
        />
      </div>

      {/* email */}
      <div className="w-full flex flex-col items-center p-3 ">
        <Input
          className="w-1/2"
          label="Email: "
          type="text"
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
        <Button
         type="submit" className="bg-gray-500 px-[4rem]">
          Prev
        </Button>

        <Button type="submit" className=" bg-blue-500 px-[4rem]">
          Next
        </Button>
      </div>
    </form>
  );
}

export default Credentials;
