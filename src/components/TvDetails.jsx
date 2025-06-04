import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-screen min-h-screen max-h-[320vh] overflow-y-auto px-[4%] relative "
    >
      {/* nav part 1  */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center  gap-8 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-white   ri-arrow-left-line mr-1"
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

      {/* poster and details part 2 */}
      <div className="w-full flex flex-col md:flex-row md:gap-0 gap-4">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.8)] md:h-[50vh] h-[30vh]  mt-2 md:object-cover object-contain"
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
              ({info.detail.first_air_date.split("-")[0]})
            </span>
          </h1>

          <div className="flex items-center md:gap-3 mb-2">
            <span className="text-white bg-yellow-600 md:w-[7vh] md:h-[7vh] w-[30px] h-[30px] flex justify-center items-center md:text-xl text-xs rounded-full md:mr-0 mr-1">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <h1 className="font-semibold md:text-xl text-sm w-[40px] leading-5 md:mr-5 mr-1">
              User Score
            </h1>
            <h1 className=" md:text-base text-sm ">
              {info.detail.first_air_date}
            </h1>
            <h1 className=" md:text-base text-sm ">
              {info.detail.genres.map((g) => g.name).join(",")}
            </h1>
            <h1 className=" md:text-base text-sm ">
              Total season {info.detail.number_of_seasons}
            </h1>
          </div>

          <h1 className=" md:text-xl text-md font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className=" md:text-xl text-md mt-1">Overview</h1>
          <p className="leading-5 md:text-base text-xs">
            {info.detail.overview}
          </p>

          <h1 className=" md:text-xl text-md md:mt-2 mt-1">TV Translated:</h1>
          <p className="text-xs mb-4">{info.translations.join(", ")}</p>

          <Link
            className=" md:py-3 md:px-3 px-2 py-1 rounded-md bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="md:text-xl text-lg mr-1 ri-play-fill"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* watchproviders 3 */}
      <div className="md:w-[80%] w-full flex flex-col md:gap-2 gap-1 md:mt-4 mt-2 md:mb-2 mb-1 ">
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

      {/* seasons 4 */}
      <hr className="mt-5 text-white mb-2 border-none h-[2px] bg-zinc-400" />
      <h1 className="text-2xl text-white font-bold  ">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden p-4 mb-3">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div className="w-[18vh mr-4">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] md:h-[35vh] md:min-w-[13vw] min-w-[18vw] h-[12vh] object-cover rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path})`}
                alt=""
              />
              <h1 className="md:text-lg text-md text-zinc-200 mt-2 font-semibold leading-tight">
                {s.name}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-3xl text-white font-black text-center mt-5">
            Nothing to Show
          </h1>
        )}
      </div>

      {/* recommendations 5 */}
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

export default TvDetails;
