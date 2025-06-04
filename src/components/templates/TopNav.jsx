import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import no_img from "/no_img.png";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="md:w-[80%] w-full md:h-[10vh] h-[8vh] relative flex items-center mx-auto md:mb-1 md:px-10 px-8 mt-[13%] md:mt-0">
      <i className="text-zinc-400 md:text-2xl text-xl ri-search-line "></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="search anything"
        className="border-none outline-none md:w-[46%] bg-transparent w-full md:mx-10 p-4 text-xl text-white "
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-2xl ri-close-fill md:right-0"
        ></i>
      )}

      <div className="z-[100] absolute md:w-[50%] w-[80%] max-h-[50vh] bg-zinc-200 top-[100%] left-[9%] overflow-auto rounded">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="flex justify-start items-center w-[100%] md:p-7 p-4 border-b-2 border-zinc-100 text-zinc-700
              font-semibold hover:text-black hover:bg-zinc-300 duration-200"
          >
            <img
              className="md:w-[10vh] md:h-[10vh] w-[7vh] h-[7vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : no_img
              }
              alt=""
            />
            <span>
              {s.original_title ||
                s.name ||
                s.original_name ||
                s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
