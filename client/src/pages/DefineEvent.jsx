import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DefineEvent = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    date: "",
    location: "",
    description: "",
    title: "",
    image: "",
    area_size: "",
    rent_by: localStorage.getItem("email"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate, area_size } = eventData;

    if (new Date(endDate) < new Date(startDate)) {
      return alert("End date must be after the start date");
    }

    if (area_size < 0) {
      return alert("Area size must be a positive number");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/create",
        eventData
      );

      if (response.status === 200 && response.data.success) {
        setEventData({
          startDate: "",
          endDate: "",
          location: "",
          description: "",
          title: "",
          image: "",
          area_size: "",
          rent_by: "",
        });

        navigate("/");
      } else {
        alert("Failed to create event");
        console.log("Failed to create event:", response.data.message);
      }
    } catch (error) {
      alert("Error creating event");
      console.error("Error creating event:", error);
    }
  };

  return (
    isLoggedIn && (
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 "
            >
              Title*:
            </label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description:
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-600"
            >
              Start Date*:
            </label>
            <input
              type="date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-600"
            >
              End Date*:
            </label>
            <input
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600"
            >
              Location*:
            </label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image Url:
            </label>
            <input
              type="url"
              name="image"
              value={eventData.image}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="area_size"
              className="block text-sm font-medium text-gray-600"
            >
              Available Booth*:
            </label>
            <input
              type="number"
              name="area_size"
              value={eventData.area_size}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <div className="text-center p-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default DefineEvent;
