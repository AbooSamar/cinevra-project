import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/templates/Trailer";
import Notfound from "./components/Notfound";
import About from "./components/About";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />

        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />} />

        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tvshows" element={<Tvshows />} />


        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />{" "}
        </Route>

        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/about" element={<About />} />
      
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
