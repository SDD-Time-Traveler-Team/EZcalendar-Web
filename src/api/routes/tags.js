const express = require('express')
const router = express.Router()
const { getTags, createTag, updateTag, deleteTag } = require('../utils/database.js')

// GET /tags read all tags 
router.get("/", (req, res, next) => {
    getTags(req.body.userId).then((resolve, reject) => {
        if (resolve) {
            res.sendStatus(200)
        } else {
            res.send(400)
        }
    });
});

// Put /tags create a new tag
router.put("/", (req, res, next) => {
    createTag(req.body.userId, req.body.tag).then((resolve, reject) => {
        if (resolve) {
            res.sendStatus(200)
            res.end(JSON.stringify({id:resolve.rows[0].id}))
        } else {
            res.sendStatus(400)
        }
    })
})

// POST /tags update with specific id 
router.post("/", (req, res, next) => {
    updateTag(req.body.userId, req.body.tagId).then((resolve, reject) => {
        if (resolve) {
            res.sendStatus(200)
        } else {
            res.send(400)
        }
    })
})

// DELETE /tags delete with specific id
router.delete("/", (req, res, next) => {
    deleteTag(req.body.userId, req.body.tagId).then((resolve, reject) => {
        if (resolve) {
            res.sendStatus(200)
        } else {
            res.send(400)
        }
    })
})
module.exports=router;