const {Client} = require("pg");

const client = new Client({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBDATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
});

client.connect().then(() => {
    console.log("client connected");
}).catch((err) => {
    console.log(err);
});

async function getAllTags(email) {
    const text = 'SELECT id, title, email, duration_in_minutes FROM tags WHERE email = $1;';
    const values = [email]
    return client.query(text, values);
}

async function createTag(email, tagTitle, durationInMinutes) {
    const text = 'INSERT INTO tags (id, email, title, duration_in_minutes) VALUES (default, $1, $2, $3) RETURNING id;';
    const values = [email, tagTitle, durationInMinutes]
    return client.query(text, values);
}

async function updateTag(email, tagId, tagTitle, durationInMinutes) {
    const text = 'UPDATE tags SET title = $3, duration_in_minutes = $4 WHERE email = $1 AND id = $2;';
    const values = [email, tagId, tagTitle, durationInMinutes];
    return client.query(text, values);
}

async function deleteTag(email, tagId) {
    const text = 'DELETE FROM tags WHERE email = $1 AND id = $2;';
    const values = [email, tagId];
    return client.query(text, values);
}

module.exports = {
    getAllTags,
    createTag,
    updateTag,
    deleteTag,
};
