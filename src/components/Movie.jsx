import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./templates/Cards";
import no_img from "/no_img.png";

const Movie = () => {
  document.title = "Cinevra | Movies";
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movies, setmovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const GetSearches = async () => {
      try {
        const { data } = await axios.get(`/search/multi?query=${query}`);
        setSearches(data.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (query.length > 0) GetSearches();
  }, [query]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Getmovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0.0) {
        // settrending(data.results);
        setmovies((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const refreshHandler = () => {
    if (movies.length === 0) {
      Getmovies();
    } else {
      setpage(1);
      setmovies([]);
      Getmovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movies.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full flex md:flex-row flex-col items-center justify-between  px-[2%]">
        <h1 className="text-2xl text-zinc-400 font-semibold md:w-auto w-full md:mt-0 mt-5 md:p-0 p-3">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line md:mr-1 mr-5"
          ></i>
          Movies{" "}
          <small className="ml-1 text-sm text-zinc-500">({category})</small>
        </h1>

        {/* Mobile search input */}
        {isMobile ? (
          <div className="w-full px-4 pt-2 pb-4 bg-zinc-900 relative md:hidden">
            {/* Search input */}
            <div className="flex items-center w-full h-[7vh]">
              <i className="text-zinc-400 text-xl ri-search-line"></i>
              <input
                type="text"
                placeholder="search anything"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-none outline-none bg-transparent text-white text-lg px-4 w-full"
              />
              {query.length > 0 && (
                <i
                  className="text-zinc-400 text-xl ri-close-fill absolute right-4 cursor-pointer"
                  onClick={() => setQuery("")}
                ></i>
              )}
            </div>
            <div className="w-[60%]">
              <Dropdown
                title="Category"
                options={["popular", "top_rated", "upcoming", "now_playing"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>

            {/* Search results list */}
            {query.length > 0 && (
              <div className="z-[100] absolute w-[90%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto rounded shadow-xl">
                {searches.map((s, i) => (
                  <Link
                    to={`/${s.media_type}/details/${s.id}`}
                    key={i}
                    className="flex justify-start items-center w-full p-4 border-b border-zinc-100 text-zinc-700 font-semibold hover:text-black hover:bg-zinc-300 duration-200"
                  >
                    <img
                      className="w-[7vh] h-[7vh] object-cover rounded mr-5 shadow-md"
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
            )}
          </div>
        ) : (
          <div className="flex items-center w-[80%]">
            <TopNav />
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        )}
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={Getmovies}
        hasMore={hasMore}
        loader={<h1>loading</h1>}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
