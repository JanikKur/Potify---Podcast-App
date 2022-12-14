import axios from 'axios';

export async function getAllPodcasts(limit, page){
    return await axios.get(`/api/v1/podcast?limit=${limit}&page=${page}`);
}


export async function getTrendingPodcasts(limit, page){
    return axios.get(`/api/v1/podcast?sort=trends&limit=${limit}&page=${page}`);
}

export async function getPodcastById(id){
    return axios.get(`/api/v1/podcast/id/${id}`);
}

export async function getPodcastByIds(ids){
    return axios.get(`/api/v1/podcast/ids/${JSON.stringify(ids)}`);
}

export async function getPodcastByAuthor(id){
    return axios.get(`/api/v1/podcast/author/${id}`);
}

export async function getPodcastByTitle(title, limit, page){
    return axios.get(`api/v1/podcast/title/${title}?limit=${limit}&page=${page}`);
}

export async function addPodcast(title, description, genre, image){
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('file', image);
    return axios.post(`/api/v1/podcast`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function addEpisode(podcastId, title, file){
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    return axios.put(`/api/v1/podcast/addEpisode/${podcastId}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function updateEpisode(episodeFileName, newData){
    let formData = new FormData();
    for (let elem in newData) {
        formData.append(elem, newData[elem]);
    }
    return axios.put(`$/api/v1/podcast/updateEpisode/${episodeFileName}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function updatePodcast(podcastId, newData){
    let formData = new FormData();
    for (let elem in newData) {
        formData.append(elem, newData[elem]);
    }
    return axios.put(`/api/v1/podcast/id/${podcastId}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function deletePodcast(podcastId){
    return axios.delete(`/api/v1/podcast/${podcastId}`, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}