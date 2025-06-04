import React from "react";
import { Link } from "react-router-dom";
import no_img from "/no_img.png";


const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden p-4 mb-3">
      {data.length>0? data.map((d, i) => (
        <Link to={`/${d.media_type}/details/${d.id}`} key={i} className=" md:min-w-[17%] min-w-[35%] md:mr-3 mr-2 bg-zinc-900 rounded-lg overflow-hidden h-[250px] ">
          <img
            className="w-full h-[50%] object-cover"
            src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path
            }`: no_img}
            alt=""
          />
          <div className="text-white p-2 h-[50%] overflow-y-auto">
            <h1 className="font-semibold md:text-xl text-lg leading-tight">
              {d.original_title ||
                d.name ||
                d.original_name ||
                d.original_title}
            </h1>
            <p className="md:text-sm text-xs ">
              {d.overview.slice(0, 50)}...
              <span className="text-zinc-400">more</span>
            </p>{" "}
          </div>
        </Link>
      )):<h1 className="text-3xl text-white font-black text-center mt-5">Nothing to Show</h1>}
    </div>
  );
};

export default HorizontalCards;
