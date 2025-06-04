import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "CINEVRA";
  const [Wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !Wallpaper && GetHeaderWallpaper();
  }, [category]);

  return Wallpaper && trending ? (
    <>
      <SideNav />
      <div className="md:w-[80%] w-full h-full overflow-auto overflow-x-hidden md:bg-none bg-no-repeat bg-cover"
      style={isMobile ? {
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${
          Wallpaper.backdrop_path || Wallpaper.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundAttachment: "fixed",
      }:{}}
      
      >
        <TopNav />
        <Header data={Wallpaper} />

        <div className="p-5 flex justify-between">
          <h1 className="md:text-3xl text-2xl font-semibold  text-zinc-400">Trending</h1>

          <Dropdown
            title="filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
