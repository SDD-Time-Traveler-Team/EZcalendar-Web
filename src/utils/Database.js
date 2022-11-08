import axios from 'axios';

const getAllTags = async (email) => {
    return axios({
        method: 'get',
        url: 'localhost:4000/tags',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email
        })
    });
}

const createTag = async (email, tagTitle, durationInMinutes) => {
    return axios({
        method: 'put',
        url: 'localhost:4000/tags',
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

const updateTag = async (email, tagId, tagTitle, durationInMinutes) => {
    return axios({
        method: 'post',
        url: 'localhost:4000/tags',
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

const deleteTag = async (email, tagId) => {
    return axios({
        method: 'delete',
        url: 'localhost:4000/tags',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "email": email,
            "tagId": tagId
        })
    });
}

module.exports = {
    getAllTags, createTag, updateTag, deleteTag
}