import React from "react";
import { Link } from "react-router-dom";
import no_img from "/no_img.png";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap gap-4 w-full pl-3 pr-3 bg-[#1F1E24] mt-2 ">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative md:w-[28vh] w-[13vh] md:h-auto h-[20vh] md:mb-1 "
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] md:h-[40vh] h-[17vh] w-full rounded-lg object-cover"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : no_img
            }
            alt=""
          />
          <h1 className="md:text-xl text-[2.5vw] text-zinc-200 md:mt-2 mt-[1vw] font-semibold leading-tight line-clamp-2">
            {c.original_title || c.name || c.original_name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className="absolute right-[-5%] bottom-[28%] text-white font-semibold bg-yellow-600 md:w-[6vh] md:h-[6vh] w-[4vw] h-[4vw] flex justify-center items-center md:text-xl text-[2.5vw] rounded-full">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;