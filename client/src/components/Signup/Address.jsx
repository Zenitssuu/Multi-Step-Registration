import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setAddress,setPhoneNumber} from "../../store/FormSlice.js"

function Credentials() {
  //take user input from feild and send it to redux state
  // addrress and phone number

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.formReducer)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      address: user.address,
      phoneNumber: user.phoneNumber,
    },
  });

  const submit = (data) => {
    const { address, phoneNumber } = data;
    dispatch(setAddress(address));
    dispatch(setPhoneNumber(phoneNumber));
    navigate("/signup/review");
  };

  return (
    <div className="w-full flex justify-center items-center bg-slate-200 ">
      <form
        className="flex items-center flex-col py-2 px-5 bg-slate-400 shadow-lg drop-shadow-lg rounded-lg"
        onSubmit={handleSubmit(submit)}
      >
        {/* name */}
        <div className="w-full flex flex-col items-center p-3">
          <Input
            className="w-1/2"
            label="Address: "
            type="text"
            placeholder="Enter your address"
            {...register("address",
               { required: true }
              )}
          />
        </div>

        {/* Phone Number */}
        <div className="w-full flex flex-col items-center p-3">
          <Input
            className="w-1/2"
            label="Phone Number: "
            type="text"
            placeholder="Enter your mobile number"
            {...register("phoneNumber",
               { required: true }
              )}
          />
        </div>

        <div className="lg:w-full flex px-5 justify-center mt-3 gap-x-[4rem] mb-4">
          <Button
          onClick={e => navigate('/signup/credentials')}
          className="bg-blue-500 px-[4rem]">
            Prev
          </Button>

          <Button type="submit" className=" bg-blue-500 px-[4rem]">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Credentials;
