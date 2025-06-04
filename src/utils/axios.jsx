import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,  // Add Bearer here
  },
});

export default instance;
