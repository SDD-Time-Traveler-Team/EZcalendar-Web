
const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
    user: provess.env.DBUSER,
    host: process.env.DBHOST,
    database: provess.env.DBDATABASE,
    password: provess.env.DBPASSWORD,
    port: process.env.DBPORT,
})

const getTags = async (userId) => {
    client.query(
        `SELECT
            id, email, title 
        FROM 
            tags 
        WHERE 
            email = ${userId};`, (error, result) => {
        if (error){
            console.log("Error with get_tags", error.stack);
        }
    })
}

const createTag = async (userId, tag) => {
    client.query(
        `INSERT INTO tags (title, email) 
        VALUES (${tags.title}, ${tags.email});`, (error, result) => {
        if (error) {
            console.log("Error with create_tags", error.stack);
        }
    })
}


const updateTag = async (userId, tag) => {
    client.query(`UPDATE tags SET title=${tag.title} WHERE ${userId}=email AND ${tag.id}=id;`, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
    })
}

const deleteTag = async (userId, tagId) => {
    client.query(`DELETE FROM tags WHERE email=${userId} AND id=${tagId};`, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
    })
}

client.connect().then(() => console.log("client connected"))

module.exports = {
    getTags,
    createTag,
    updateTag,
    deleteTag
}