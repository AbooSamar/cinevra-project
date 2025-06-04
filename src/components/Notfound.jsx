import React from "react";
import notfound from "/404.png";

const Notfound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <img className="h-[50%] w-[40%] " src={notfound} alt="" />
    </div>
  );
};

export default Notfound;
