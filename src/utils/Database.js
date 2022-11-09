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
