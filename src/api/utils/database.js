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
    const text = `SELECT id,
                         title,
                         email,
                         duration_in_minutes
                  FROM tags
                  WHERE email = '${email}';`
    return client.query(text);
}

async function createTag(email, tagTitle, durationInMinutes) {
    const text = `INSERT INTO tags (email, title, duration_in_minutes)
                  VALUES (${email}, ${tagTitle}, ${durationInMinutes});`
    return client.query(text);
}

async function updateTag(email, tagId, tagTitle, durationInMinutes) {
    const text = `UPDATE tags
                  SET title=${tagTitle},
                      duration_in_minutes=${durationInMinutes}
                  WHERE email = ${email}
                    AND id = ${tagId};`
    return client.query(text);
}

async function deleteTag(email, tagId) {
    const text = `DELETE
                  FROM tags
                  WHERE email = ${email}
                    AND id = ${tagId};`
    return client.query(text);
}

module.exports = {
    getAllTags,
    createTag,
    updateTag,
    deleteTag,
};
