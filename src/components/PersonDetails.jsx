import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../actions/personActions";
import Dropdown from "./templates/Dropdown";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-screen px-[5%] bg-[#1F1E24] min-h-screen max-h-[320vh] overflow-y-auto">
      {/* nav part  */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-white ri-arrow-left-line mr-1"
        ></Link>
      </nav>

      <div className="w-full flex max-md:flex-col">
        {/* part 2 - Left Section (Mobile: Full width, stacked) */}
        <div className="w-[20%] max-md:w-full max-md:flex max-md:flex-col max-md:items-center">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.8)] md:h-[40vh] md:w-[30vh] w-[18vh] h-[25vh] object-cover max-md:mx-auto"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path})`}
            alt=""
          />
          <hr className="mt-5 text-white md:mb-2 border-none h-[2px] bg-zinc-400 max-md:w-full" />

          {/* social media links */}
          <div className="text-white text-xl flex gap-5 max-md:justify-center max-md:my-4 ">
            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className="ri-global-line"></i>
            </a>
            <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
              <i className="ri-instagram-line"></i>
            </a>
            <a target="_blank" href={`https://www.x.com/${info.externalid.twitter_id}`}>
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>

          {/* personal info (Mobile: Centered text) */}
          <div className="max-md:text-center max-md:mt-4">
          <h1 className="md:hidden text-4xl text-zinc-300 font-black max-md:text-3xl">
            {info.detail.name}
          </h1>
            <h1 className="text-lg text-zinc-300 font-semibold md:mt-2">Known For</h1>
            <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

            <h1 className="text-lg text-zinc-300 font-semibold mt-2">Gender</h1>
            <h1 className="text-zinc-400">{info.detail.gender === 2 ? "Male" : "Female"}</h1>

            <h1 className="text-lg text-zinc-300 font-semibold mt-2">Birthday</h1>
            <h1 className="text-zinc-400">{info.detail.birthday}</h1>

            {info.detail.deathday && (
              <>
                <h1 className="text-lg text-zinc-300 font-semibold mt-2">Death</h1>
                <h1 className="text-zinc-400">{info.detail.deathday}</h1>
              </>
            )}

            <h1 className="text-lg text-zinc-300 font-semibold mt-2">Place of Birth</h1>
            <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>

            <h1 className="text-lg text-zinc-300 font-semibold mt-2">Also Known As</h1>
            <h1 className="text-zinc-400 max-md:px-4">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>
        </div>

        {/* part 3 - Right Section (Mobile: Full width) */}
        <div className="w-[80%] ml-[5%] max-md:w-full max-md:ml-0 max-md:mt-8">
          <h1 className="text-4xl text-zinc-300 font-black max-md:text-3xl max-md:text-center">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold mt-2">Biography</h1>
          <p className="text-zinc-400 mt-2 max-md:px-2 md:text-base text-sm">{info.detail.biography}</p>

          <h1 className="text-lg text-zinc-400 font-semibold mt-2">Known For</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between max-md:flex-col max-md:items-center max-md:gap-2">
            <h1 className="text-2xl text-zinc-400 font-semibold mt-1 max-md:text-xl">
              Acting
            </h1>
            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.2)] mt-4 border-2 border-zinc-700 p-5 max-md:h-[40vh] max-md:p-3 mb-2">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white duration-200 cursor-pointer mt-4 max-md:mt-2">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.original_title || c.name || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 max-md:ml-3">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;