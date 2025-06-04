import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* visible in mobile only start*/}
      <div className="md:hidden fixed flex justify-between items-center px-8 w-full h-[8vh] py-5">
        <h1 className="text-3xl font-bold">
          <span className="font-sans tracking-widest text-[#9396e1] ">
            CINEVRA
          </span>
        </h1>

        {!isOpen && (
          /* Mobile Menu Button  - Only shown when sidebar is closed */
          <button
            onClick={() => setIsOpen(true)}
            className="text-white focus:outline-none"
          >
            <i className="ri-menu-fold-3-fill text-3xl"></i>
          </button>
        )}
      </div>{" "}
      {/* visible in mobile only end here*/}
      {/* SideNav Content */}
      <div
        className={`fixed md:static w-[80%] md:w-[20%] h-full border-r-2 border-zinc-400 p-5 md:p-10 bg-[#1a1a1a] z-40 transition-all duration-300 ${
          isOpen ? "right-0" : "-right-full md:right-0"
        }`}
      >
        {/* Header with Close Button on the right */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-white font-bold">
            <i className="text-[#9396e1] ri-movie-ai-fill mr-2"></i>
            <span className="font-sans tracking-widest text-[#9396e1]">
              CINEVRA
            </span>
          </h1>

          {/* Close Button (X) - Only shown on mobile when sidebar is open */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white p-2 focus:outline-none"
          >
            <i className="ri-menu-unfold-3-fill text-3xl"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col text-zinc-400 text-lg md:text-xl gap-2">
          <h1 className="text-white font-semibold text-lg md:text-xl mb-3">
            New Feeds
          </h1>
          <Link
            to="trending"
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#6556CD] hover:text-white px-3 py-2 rounded-md duration-200"
          >
            <i className="ri-fire-fill mr-1"></i>Trending
          </Link>
          {/* Other navigation links remain the same */}
          <Link
            to="popular"
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#6556CD] hover:text-white px-3 py-2 rounded-md duration-200"
          >
            <i className="ri-video-ai-line mr-2"></i>Popular
          </Link>
          <Link
            to="movie"
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#6556CD] hover:text-white px-3 py-2 rounded-md duration-200"
          >
            <i className="ri-movie-2-fill mr-2"></i>Movies
          </Link>
          <Link
            to="tvshows"
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#6556CD] hover:text-white px-3 py-2 rounded-md duration-200"
          >
            <i className="ri-tv-fill mr-2"></i>Tv Shows
          </Link>
          <Link
            to="people"
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#6556CD] hover:text-white px-3 py-2 rounded-md duration-200"
          >
            <i className="ri-user-search-fill mr-2"></i>People
          </Link>
        </nav>

        <hr className="h-[1px] bg-zinc-400 border-none my-2" />

        <nav className="flex flex-col text-zinc-400 text-lg md:text-xl gap-1">
          <h1 className="text-white font-semibold text-lg md:text-xl mt-3 mb-2 whitespace-nowrap">
            Website Information
          </h1>
          <Link to="about"
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#6556CD] hover:text-white px-3 py-2 rounded-md duration-200"
          >
            <i className="ri-information-fill mr-1"></i>About US
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#6556CD] hover:text-white px-3 py-2 rounded-md duration-200"
          >
            <i className="ri-phone-fill mr-1"></i>Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
};

export default SideNav;
