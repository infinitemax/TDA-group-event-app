const createError = require("http-errors");
const mongoose = require("mongoose");
const { Event } = require("../models/events");
const helmet = require("helmet");
const { User } = require("../models/tempUsers");

// get all events
exports.getEvents = async (req, res, next) => {
  try {
    // await Event.find({})
    //   .populate("creator", "email")
    //   .then((events) => {
    //     res.status(200).json({
    //       count: events.length,
    //       events: events.map((event) => {
    //         return {
    //           event,
    //           eventCreator: event.creator._id.toString(),
    //         };
    //       }),
    //     });
    //   });
    const events = await Event.find({})
    res.send(events)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "a server error has occurred" });
    return next(createError(500, "a server error has occured"));
  }
};

// add an event
exports.addEvent = async (req, res, next) => {
  const data = req.body;

  try {
    const newEvent = new Event(data);
    await newEvent.save();
    res.status(200).json({
      message: "Event created successfully!",
      event: newEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "a server error has occurred" });
    return next(createError(500, "a server error has occured"));
  }
};

// update an event
exports.updateEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    await Event.findByIdAndUpdate(id, changes);
    const updatedEvent = await Event.findById(id);
    res.status(200).json({
      message: "Event updated successfully",
      newEvent: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "a server error has occurred" });
    return next(createError(500, "a server error has occured"));
  }
};

// delete an event

exports.deleteEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(createError(400, "Bad request"));
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    res.send({
      message: "event deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "a server error has occurred" });
    return next(createError(500, "a server error has occured"));
  }
};

// get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
    res.send("a server error has occurred");
    return next(createError(500, "a server error has occured"));
  }
};

// get all events by a given user
exports.getEventsByUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // make an array of all events, inc their creator
    // then filter based on teh creator
    // does it already create an array?
    
    const allEvents = await Event.find({}).populate("creator")

    const usersEvents = allEvents.filter(event => {
        return event.creator._id.toString() === id
    })

    res.status(200).send(usersEvents);
        
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "a server error has occurred" });
    return next(createError(500, "a server error has occured"));
  }
};
