import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllEvents({ isLoggedIn }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    if (isLoggedIn) {
      axios
        .get("http://localhost:5000/api/events")
        .then((res) => {
          console.log(res.data);
          setEvents(res.data.events);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto p-4">
      {isLoggedIn ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <img
                src="https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-02.jpg"
                alt={event.title}
                className="mb-2"
              />
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-sm text-gray-500 mb-2">{event.date}</p>
              <p className="text-sm text-gray-500">{event.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">
          You need to{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            log in
          </Link>{" "}
          to view events.
        </p>
      )}
    </div>
  );
}

export default AllEvents;
