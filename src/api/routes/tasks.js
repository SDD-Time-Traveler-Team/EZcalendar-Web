const express = require('express')
const router = express.Router()
const { getAllTasks, createTask, updateTask, deleteTask } = require("../utils/database.js");

// GET /tasks read all tasks
router.get("/", (req, res) => {
    const { email } = req.query;
    getAllTasks(email).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// Put /tasks create a new task
router.put("/", (req, res) => {
    const { email, title, tag_id, description, start_time, end_time, completed } = req.body;
    createTask(email, title, tag_id, description, start_time, end_time, completed).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// POST /tasks update with specific id
router.post("/", (req, res) => {
    const { tasks_id, email, title, tag_id, description, start_time, end_time, completed } = req.body;
    updateTask(tasks_id, email, title, tag_id, description, start_time, end_time, completed).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// DELETE /tasks delete with specific id
router.delete("/", (req, res) => {
    const { email, tasks_id } = req.body;
    deleteTask(email, tasks_id).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

module.exports = router;