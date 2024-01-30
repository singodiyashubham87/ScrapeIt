import React from "react";
import { Link } from "react-router-dom";

function Errorpage() {
  return (
    <>
      <div className="lg:h-screen flex flex-col items-center justify-center bg-pri md:h-screen">
        <div className="text-center text-sec align-middle pt-10 font-bold text-6xl">
          Error 404!!!
        </div>
        <p className=" text-2xl text-sec">page not found</p>
        <p className="  bg-skyblue text-void px-5 py-2 text-xl rounded-md hover:bg-darkb transition duration-300 ease-linear hover:text-sec mt-7">
          <Link to="/"> GO BACK</Link>
        </p>
      </div>
    </>
  );
}

export default Errorpage;
