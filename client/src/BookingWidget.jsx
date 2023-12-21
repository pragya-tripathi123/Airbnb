import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import {UserContext} from "./UserContext"

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuets, setNumberOfGuets] = useState(1);
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [redirect,setRedirect] = useState('')
  const {user} = useContext(UserContext)

  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  },[user])

  let numberOfNights = 0;
  if(checkIn && checkOut){
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

async function bookThisPlace(){
  const response = await axios.post("/bookings", {
    checkIn,
    checkOut,
    numberOfGuets,
    name,
    phone,
    // eslint-disable-next-line react/prop-types
    place: place._id,
    // eslint-disable-next-line react/prop-types
    price: numberOfNights * place.price,
  });
  const bookingId = response.data._id
  setRedirect(`/account/bookings/${bookingId}`)
}

if(redirect){
  return <Navigate to={redirect}></Navigate>
}
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuets}
              onChange={(ev) => setNumberOfGuets(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name: </label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="John Doe"
              />
              <label>Phone Number: </label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                placeholder="John Doe"
              />
            </div>
          )}
        </div>
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place:-
        {numberOfNights > 0 && <span> {numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}