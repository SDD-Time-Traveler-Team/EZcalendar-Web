const express = require('express')
const router = express.Router()
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require("../utils/database.js");

// GET /tags read all events
router.get("/", (req, res) => {
    const { email } = req.body;
    getAllEvents(email).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// Put /tags create a new event
router.put("/", (req, res) => {
    const { email, title, tag_id, description, start_time, end_time } = req.body;
    createEvent(email, title, tag_id, description, start_time, end_time).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// POST /event update with specific id
router.post("/", (req, res) => {
    const { event_id, email, title, tag_id, description, start_time, end_time } = req.body;
    updateEvent(event_id, email, title, tag_id, description, start_time, end_time).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// DELETE /event delete with specific id
router.delete("/", (req, res) => {
    const { email, event_id } = req.body;
    deleteEvent(email, event_id).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

module.exports = router;