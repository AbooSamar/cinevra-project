import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
 
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-full md:h-[50vh] h-[35vh] flex flex-col md:justify-end md:p-[3%] pl-5 items-start"
    >
      <h1 className="text-white font-black md:text-4xl text-2xl  md:w-[60%] w-[80%] md:mt-0 mt-5">
        {data.original_title ||
          data.name ||
          data.original_name ||
          data.original_title}
      </h1>
      <p className="text-white w-[60%] mt-2 text-xs md:text-base">
        {data.overview.slice(0, 190)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>

      <p className="text-blue-100 md:text-sm mt-1 text-xs">
        <i className="ri-megaphone-fill text-blue-300"></i>
        {data.release_date || "No Information"}
        <i className="ri-film-fill text-blue-300 ml-2"></i>
        {data.media_type.toUpperCase()}
      </p>

      <Link to={`/${data.media_type}/details/${data.id}/trailer`}  className="bg-[#6556CD] md:p-3 p-2 mt-2 rounded text-white hover:bg-[#6569CD] ">
        Watch Trailer
      </Link>


     
    </div>
  );
};

export default Header;
