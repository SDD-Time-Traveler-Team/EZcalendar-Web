const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const tagsRouter = require('./routes/tags')
const eventsRouter = require('./routes/events')
const tasksRouter = require('./routes/tasks')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res, next) => {
    res.send("Hello World")
})

app.use('/tags', tagsRouter)
app.use('/events', eventsRouter)
app.use('/tasks', tasksRouter)

module.exports = app
