import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const DefineEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    date: "",
    location: "",
    description: "",
    title: "",
    image: "",
    area_size: "",
    rent_by: "",
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

    try {
      // Make a POST request to your backend API
      const response = await axios.post(
        "http://localhost:5000/api/events/create",
        eventData
      );

      if (response.data.success) {
        setEventData((prevData) => ({
          date: "",
          location: "",
          description: "",
          title: "",
          image: "",
          area_size: "",
          rent_by: "",
        }));

        navigate("/");
      } else {
        alert("Failed to create event");
        console.log("Failed to create event:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-600"
            >
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
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
              Location:
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
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description:
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title:
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
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image:
            </label>
            <input
              type="text"
              name="image"
              value={eventData.image}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="area_size"
              className="block text-sm font-medium text-gray-600"
            >
              Area Size:
            </label>
            <input
              type="text"
              name="area_size"
              value={eventData.area_size}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="rent_by"
              className="block text-sm font-medium text-gray-600"
            >
              Rent By:
            </label>
            <input
              type="text"
              name="rent_by"
              value={eventData.rent_by}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default DefineEvent;
