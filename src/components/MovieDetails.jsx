import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-screen min-h-screen max-h-[320vh] overflow-y-auto md:px-[4%] px-2 relative "
    >
      {/* nav part  */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-8 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-white ri-arrow-left-line mr-1 md:ml-0 ml-3"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-global-line"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* poster and details part */}
      <div className="w-full flex flex-col md:flex-row md:gap-0 gap-4">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.8)] md:h-[50vh] h-[30vh] mt-2 md:object-cover object-contain"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          })`}
          alt=""
        />

        <div className="content md:ml-10 ml-3 text-white">
          <h1 className="md:text-4xl text-3xl font-black mb-3">
            {info.detail.original_title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}

            <span className="md:text-2xl text-xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>



          <div className="flex flex-wrap items-center md:gap-3 gap-2 mb-2 overflow-hidden">
  {/* Rating Circle */}
  <span className="text-white bg-yellow-600 md:w-[7vh] md:h-[7vh] w-[8vw] h-[8vw] min-w-[32px] min-h-[32px] flex justify-center items-center md:text-xl text-sm rounded-full shrink-0">
    {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
  </span>

  {/* User Score */}
  <h1 className="font-semibold md:text-xl text-base leading-5 md:mr-2 mr-0 whitespace-nowrap">
    User Score
  </h1>

  {/* Release Date, Genres, Runtime */}
  <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
    <h1 className="whitespace-nowrap">{info.detail.release_date}</h1>
    <h1 className="whitespace-nowrap">
      {info.detail.genres.map((g) => g.name).join(", ")}
    </h1>
    <h1 className="whitespace-nowrap">{info.detail.runtime}min</h1>
  </div>
</div>

{/* Tagline */}
<h1 className="md:text-xl text-base font-semibold italic text-zinc-200 truncate">
  {info.detail.tagline}
</h1>

{/* Overview */}
<h1 className="md:text-xl text-base mt-1">Overview</h1>
<p className="leading-5 md:text-base text-sm">
  {info.detail.overview}
</p>

{/* Movie Translated */}
<h1 className="md:text-xl text-base md:mt-2 mt-1">Movie Translated:</h1>
<p className="text-sm mb-4 line-clamp-2">{info.translations.join(", ")}</p>

{/* Play Trailer Button */}
<Link
  className="inline-flex items-center md:py-3 md:px-3 px-2 py-1 rounded-md bg-[#6556CD] whitespace-nowrap"
  to={`${pathname}/trailer`}
>
  <i className="md:text-xl text-lg mr-1 ri-play-fill"></i>
  Play Trailer
</Link>

        </div>
      </div>

      {/* watchproviders */}
      <div className="md:w-[80%] w-full flex flex-col md:gap-2 gap-1 md:mt-4 mt-2 md:mb-2 mb-1 md:px-0 px-2">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center md:gap-5 gap-2 text-white">
            <h1 className="font-semibold md:w-[18%] w-[48%] md:text-base texl-md">
              Available on Platforms
            </h1>
            {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                className="md:w-[5vh] md:h-[5vh] h-[3vh] w-[3vh] rounded-md object-cover"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center md:gap-5 gap-2 text-white">
            <h1 className="font-semibold md:w-[18%] w-[48%] md:text-base texl-md">
              Available to Buy
            </h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="md:w-[5vh] md:h-[5vh] h-[3vh] w-[3vh] rounded-md object-cover"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center md:gap-5 gap-2 text-white">
            <h1 className="font-semibold md:w-[18%] w-[48%] md:text-base texl-md">
              Available on Rent
            </h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="md:w-[5vh] md:h-[5vh] h-[3vh] w-[3vh] rounded-md object-cover"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* recommendations */}
      <hr className="md:mt-5 mt-2 text-white md:mb-2 mb-1 border-none h-[2px] bg-zinc-400" />

      <h1 className="md:text-2xl text-xl text-white font-bold  ">
        Recommendations & Similar
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
