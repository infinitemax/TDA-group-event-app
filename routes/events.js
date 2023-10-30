const express = require("express");
const router = express.Router();
const { addEvent, getEvents, getEventsByUser, deleteEventById, updateEventById, getAllUsers } = require("../controllers/events")


router.get("/", getEvents) // get all events
router.post("/", addEvent) // add an event
router.get("/user/:id", getEventsByUser) // get events by user - currently by id, but would be good to do it by username - doesn't work atm...
router.delete("/delete/:id", deleteEventById) // delete an event
router.put("/update/:id", updateEventById) // updat an event

router.get("/users", getAllUsers) // get a list of all users

module.exports = router