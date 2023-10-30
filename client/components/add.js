import React, { useState, useEffect } from "react";
import { ApiClient } from "@/apiClient";

const EventForm = () => {
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [timeAndDate, setTimeAndDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const apiClient = new ApiClient(() => token);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!title || !location || !timeAndDate || !description) {
      alert("Please fill in all the fields.");
      return;
    }

    const addEvent = await apiClient.addEvent(
      title,
      timeAndDate,
      location,
      description,
      image
    );

    if (addEvent) {
        console.log(image)
      setSuccessMessage("Event added successfully!");
      setTimeout(() => {
        window.location.href = "http://localhost:3000/";
      }, 2000);  // Redirect after 2 seconds for the user to see the success message
    } else {
      alert("Error adding the event. Please try again.");
    }
  };

  return (
    <div>
      {successMessage ? (
        <div className="p-4 mb-4 text-green-700 bg-green-200 rounded-lg">
          {successMessage}
        </div>
      ) : null}
      <form className="p-8 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Title:
        </label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
     
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Time and date:
        </label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
          type="text"
          value={timeAndDate}
          onChange={(e) => setTimeAndDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Location:
        </label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Description:
        </label>
        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Image url:
        </label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
          value={image}
          onChange={(e) => {
            setImage(e.target.value)
            }}
        />
      </div>
      <button className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-800" type="submit">Submit</button>
    </form>
    </div>
  );
};

export default EventForm;
