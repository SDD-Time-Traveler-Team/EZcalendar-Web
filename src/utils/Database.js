import axios from 'axios';

export const getAllTags = async (email) => {
    return axios({
        method: 'get',
        url: `http://localhost:4000/tags?email=${email}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const createTag = async (email, tagTitle, durationInMinutes) => {
    return axios({
        method: 'put',
        url: 'http://localhost:4000/tags',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email,
            "tagTitle": tagTitle,
            "durationInMinutes": durationInMinutes
        })
    });
}

export const updateTag = async (email, tagId, tagTitle, durationInMinutes) => {
    return axios({
        method: 'post',
        url: 'http://localhost:4000/tags',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "tagId": tagId,
            "email": email,
            "tagTitle": tagTitle,
            "durationInMinutes": durationInMinutes
        })
    });
}

export const deleteTag = async (email, tagId) => {
    return axios({
        method: 'delete',
        url: 'http://localhost:4000/tags',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email,
            "tagId": tagId
        })
    });
}

export const getAllEvents = async (email) => {
    return axios({
        method: 'get',
        url: `http://localhost:4000/events?email=${email}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const createEvent = async (email, title, tagId, description = "", startTime, endTime) => {
    return axios({
        method: 'put',
        url: 'http://localhost:4000/events',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email,
            "title": title,
            "tag_id": tagId,
            "description": description,
            "start_time": startTime,
            "end_time": endTime
        })
    });
}

export const updateEvent = async (eventId, email, title, tagId, description = "", startTime, endTime) => {
    return axios({
        method: 'post',
        url: 'http://localhost:4000/events',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "event_id": eventId,
            "email": email,
            "title": title,
            "tag_id": tagId,
            "description": description,
            "start_time": startTime,
            "end_time": endTime
        })
    })
}

export const deleteEvent = async (email, eventId) => {
    return axios({
        method: 'delete',
        url: 'http://localhost:4000/events',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email,
            "event_id": eventId
        })
    })
}

export const getAllTasks = async (email) => {
    return axios({
        method: 'get',
        url: `http://localhost:4000/tasks?email=${email}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const createTask = async (email, title, tagId, description = "", startTime, endTime, completed) => {
    return axios({
        method: 'put',
        url: 'http://localhost:4000/tasks',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email,
            "title": title,
            "tag_id": tagId,
            "description": description,
            "start_time": startTime,
            "end_time": endTime,
            "completed": completed
        })
    });
}

export const updateTask = async (taskId, email, title, tagId, description = "", startTime, endTime, completed) => {
    return axios({
        method: 'post',
        url: 'http://localhost:4000/tasks',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "task_id": taskId,
            "email": email,
            "title": title,
            "tag_id": tagId,
            "description": description,
            "start_time": startTime,
            "end_time": endTime,
            "completed": completed
        })
    })
}

export const deleteTask = async (email, taskId) => {
    return axios({
        method: 'delete',
        url: 'http://localhost:4000/tasks',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email,
            "task_id": taskId
        })
    })
}
