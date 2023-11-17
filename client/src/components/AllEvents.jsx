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

  const extractDate = (startDate, endDate) => {
    if (!startDate && !endDate) {
      return "";
    }

    const dateRegex = /^(\d{4}-\d{2}-\d{2})/;
    const startMatch = startDate ? startDate.match(dateRegex) : null;
    const endMatch = endDate ? endDate.match(dateRegex) : null;

    const startDatePart = startMatch ? startMatch[1] : "";
    const endDatePart = endMatch ? endMatch[1] : "";

    return `Event Date: ${startDatePart} - ${endDatePart}`;
  };

  return (
    <div className="container mx-auto p-4 max-h-28 mt-5">
      <h1 className="text-center text-3xl font-bold mb-5">Event List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded shadow">
            <h1 className="text-xl font-semibold mb-2 text-black">
              {event.title}@{event.location}
            </h1>
            <img
              // src="https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-02.jpg"
              src={
                event.image
                  ? event.image
                  : "https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg"
              }
              alt={event.title}
              className="mb-2 w-full h-64 object-cover"
            />
            {/* <p className="text-gray-600 mb-2">{event.description}</p> */}
            <p className="text-sm text-gray-500 mb-2">
              {extractDate(event.startDate, event.endDate)}
            </p>
            <p className="text-sm text-gray-500 text-right">
              Defined by {event.rent_by}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
