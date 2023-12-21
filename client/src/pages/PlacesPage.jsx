// import { useState } from "react";
import { Link} from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from 'axios'
import PlaceImg from "../PlaceImg";


export default function PlacesPage() {
  const [places,setPlaces] = useState([])
 useEffect(() => {
   axios.get("/user-places").then(({ data }) => {
     setPlaces(data);
     console.log(places)
   });
 }, []);
  return (
    <>
      <AccountNav></AccountNav>
      <div className="">
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white p-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>

        <div className="mt-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                className="bg-slate-100 flex rounded-xl p-6 cursor-pointer hover:shadow-lg hover:bg-slate-200 mt-6"
                key={place.title}
              >
                <div className="h-32 w-32 grow-0 shrink-0 flex">
                  <PlaceImg place={place}></PlaceImg>
                </div>

                <div className="text-left pl-8 pr-2 grow-0 shrink">
                  <h2 className="font-medium text-2xl mb-4">{place.title}</h2>
                  <p>{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
