import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllEvents({ isLoggedIn }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        console.log(res.data);
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold">Event List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded shadow">
            <h1 className="text-3xl font-bold mb-2 text-black">
              {event.title}@{event.location}
            </h1>
            <img
              // src="https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-02.jpg"
              src={
                event.image
                  ? event.image
                  : "   https://cdn-icons-png.flaticon.com/512/1980/1980440.png "
              }
              alt={event.title}
              className="mb-2 w-full h-64 object-cover"
            />
            <p className="text-gray-600 mb-2">{event.description}</p>
            {/* <p className="text-sm text-gray-500 mb-2">{event.date}</p> */}
            <p className="text-sm text-gray-500 text-right">
              Rent by {event.rent_by}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
