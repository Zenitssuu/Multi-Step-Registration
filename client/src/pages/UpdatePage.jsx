import React from "react";
import UpdateForm from "../components/Update/UpdateForm.jsx";


function UpdatePage() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-4 bg-[#ede7f6]">
      <h1 className="text-4xl font-bold">Update Form</h1>
      <UpdateForm />
    </div>
  );
}

export default UpdatePage;
