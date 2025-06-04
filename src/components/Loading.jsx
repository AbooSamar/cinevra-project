import React from "react";
import Loader from "/loader.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <img className="md:h-[30%] " src={Loader} alt="" />
    </div>
  );
};

export default Loading;
