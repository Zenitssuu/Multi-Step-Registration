import React from "react";
import { Link} from "react-router-dom";
import image from "../assets/ils2.jpeg"

function UnAuhtorizedPage() {
  return (
    <div className="h-screen bg-[#f5f5f5] flex justify-center gap-x-5">      
      <main className="flex flex-col items-center justify-center py-20 space-y-6">
        <h1 className="text-6xl font-bold text-center">
         Multi Step Registration
        </h1>
        <Link
        to="signup/credentials"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-full">
          Start Process
        </Link>
      </main>
      <div className="flex justify-center py-10">
        <img
          src={image}
          alt="Illustration"
          className="w-[500px] h-[600px] hover:shadow-lg hover:scale-105 duration-200 rounded-lg"
          width="400"
          height="500"
          style={{ aspectRatio: "500/500", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default UnAuhtorizedPage;
