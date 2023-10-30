"use client";
import React from "react";
import { useState, useEffect } from "react";
import Event from "@/components/Event";

// create event card 
// for now just use divs

// receive post data from the server
// update apiClient

// map through the data and create card for each

const Dashboard = (props) => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => {
      console.log(response.data);
      setEvents(response.data);
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  // useEffect(() => {
  //     console.log(events)
  // }, [events])

 
  return (
    <div className="pb-12 bg-gray-200">
      <div className="px-8 pt-8 pb-4 mb-8 text-gray-700 bg-white shadow-md relative">
        <h1 className="mb-2 text-3xl font-semibold">What's on in Town?</h1>
        <p className="text-lg">Here is what's happening...</p>
        <a href="http://localhost:3000/add-event">
          <button className="px-4 py-2 mt-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">Add an event</button>
        </a>
        <button className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-gray-700 relative left-12" onClick={props.logout}>Logout</button>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {events?.map((event, index) => (
            <Event
              key={index}
              title={event.title}
              imgUrl={event.image}
              location={event.location}
              dateAndTime={event.dateAndTime}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
