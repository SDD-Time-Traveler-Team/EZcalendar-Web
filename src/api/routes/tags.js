const express = require("express");
const router = express.Router();
const {getAllTags, createTag, updateTag, deleteTag} = require("../utils/database.js");

// GET /tags read all tags
router.get("/", (req, res) => {
    const {email} = req.body;
    getAllTags(email).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// Put /tags create a new tag
router.put("/", (req, res) => {
    const {email, tagTitle, durationInMinutes} = req.body;
    createTag(email, tagTitle, durationInMinutes).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// POST /tags update with specific id
router.post("/", (req, res) => {
    const {email, tagId, tagTitle, durationInMinutes} = req.body;
    updateTag(email, tagId, tagTitle, durationInMinutes).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// DELETE /tags delete with specific id
router.delete("/", (req, res) => {
    const {email, tagId} = req.body;
    deleteTag(email, tagId).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

module.exports = router;
