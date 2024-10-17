import React from "react";
import { Outlet } from "react-router-dom";

function Signup() {
  return (
    <div>
      <main className="w-full min-h-screen flex flex-col gap-5 bg-slate-200 items-center">
      <h1 className="text-4xl mt-7 font-semibold">Singup Process</h1> 
        <Outlet />
      </main>
      
    </div>
  );
}

export default Signup;
