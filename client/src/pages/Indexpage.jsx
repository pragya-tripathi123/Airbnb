import { useEffect, useState } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Indexpage() {
  const [places,setPlaces] = useState([]);
  useEffect(() =>{
    axios.get('/places').then(response => {
      setPlaces(response.data,);
      console.log(places)
    })
  },[])
  return (
    <div className="p-4 lg:px-20 md:px-12 sm:px-8">
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {console.log(places.title)}
        {places.length > 0 &&
          places.map((place) => (
            <Link key={place._id} to={"/place/" + place._id}>
              <div className="bg-gray-500 rounded-2xl mb-2 flex">
                {place.photos?.[0] && (
                  <img
                    src={"http://localhost:4000/" + place.photos?.[0]}
                    alt=""
                    className="rounded-2xl object-cover aspect-square"
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm  text-gray-500">{place.title}</h3>

              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
