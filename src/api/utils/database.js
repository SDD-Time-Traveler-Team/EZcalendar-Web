const { Client } = require("pg");

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

async function getAllEvents(email) {
    const text = 'SELECT id,title,tag_id,description,start_time,end_time FROM events WHERE email = $1 ;';
    const values = [email]
    return client.query(text, values)

}

async function createEvent(email, title, tag_id, description, start_time, end_time) {
    const text = 'INSERT INTO events(id,email,title,tag_id,description,start_time,end_time) VALUES(default,$1,$2,$3,$4,$5,$6) ;';
    const values = [email, title, tag_id, description, start_time, end_time];
    return client.query(text, values);
}

async function updateEvent(event_id, email, title, tag_id, description, start_time, end_time) {
    const text = 'UPDATE events SET title = $3,tag_id = $4,description = $5,start_time=$6,end_time=$7 WHERE email = $2 AND id = $1;';
    const values = [event_id, email, title, tag_id, description, start_time, end_time];
    return client.query(text, values);
}

async function deleteEvent(email, event_id) {
    const text = 'DELETE FROM events WHERE email = $1 AND id = $2;';
    const values = [email, event_id];
    return client.query(text, values);
}

async function getAllTasks(email) {
    const text = 'SELECT id,title,tag_id,description,start_time,end_time,completed FROM tasks WHERE email = $1 ;';
    const values = [email]
    return client.query(text, values)

}

async function createTask(email, title, tag_id, description, start_time, end_time, completed) {
    const text = 'INSERT INTO tasks(id,email,title,tag_id,description,start_time,end_time,completed) VALUES(default,$1,$2,$3,$4,$5,$6,$7) ;';
    const values = [email, title, tag_id, description, start_time, end_time, completed];
    return client.query(text, values);
}

async function updateTask(tasks_id, email, title, tag_id, description, start_time, end_time, completed) {
    const text = 'UPDATE tasks SET title = $3,tag_id = $4,description = $5,start_time=$6,end_time=$7,completed=$8 WHERE email = $2 AND id = $1;';
    const values = [tasks_id, email, title, tag_id, description, start_time, end_time, completed];
    return client.query(text, values);
}
async function deleteTask(tasks_id, email) {
    const text = 'DELETE FROM tasks WHERE email = $2 AND id = $1;';
    const values = [email, tasks_id];
    return client.query(text, values);
}

module.exports = {
    getAllTags,
    createTag,
    updateTag,
    deleteTag,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};
