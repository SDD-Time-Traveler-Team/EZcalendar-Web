
const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
    user: provess.env.DBUSER,
    host: process.env.DBHOST,
    database: provess.env.DBDATABASE,
    password: provess.env.DBPASSWORD,
    port: process.env.DBPORT,
})

client.connect().then(() => console.log("client connected"))
