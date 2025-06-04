import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="absolute w-screen h-screen flex items-center justify-center top-0 left-0 z-[99] bg-[rgba(0,0,0,.9)]">
      <Link
        onClick={() => navigate(-1)}
        className="text-white absolute ri-close-line left-line text-3xl md:top-[5%] md:right-[5%] top-[33%] right-[5%]"
      ></Link>

      {ytvideo ? (
        <div className="w-full px-4">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <ReactPlayer
              controls
              width="100%"
              height="100%"
              style={{
                aspectRatio: "16/9",
                maxWidth: "1100px",
                maxHeight: "500px",
                margin: "0 auto"
              }}
              url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
            />
          </div>
        </div>
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;