import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../contexts/UserContext';
import { addEpisode, getPodcastByAuthor } from '../services/podcast';
import Loading from '../components/Loading';
import Message from '../components/Message';
import {isPodcastFile} from '../utils/checkPodcastFile';

export default function AddEpisode() {


    const { currentUser } = useUser();
    const [podcasts, setPodcasts] = useState([]);
    const podcastRef = useRef();
    const titleRef = useRef();
    const fileRef = useRef();
    const [defaultPodcast, setDefaultPodcast] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if(currentUser){
            setDefaultPodcast(new URLSearchParams(window.location.search).get('id'));
            getPodcastByAuthor(currentUser._id).then(res => {
                res.data.podcasts && setPodcasts(res.data.podcasts);
            });
        }
    },[currentUser]);


    async function submit(e){
        e.preventDefault();
        setIsLoading(true);
        try{
            if(!isPodcastFile(fileRef.current.files[0])) throw new Error();
            await addEpisode(podcastRef.current.value, titleRef.current.value, fileRef.current.files[0]);
            setMessage(<Message message={'Episode added successfully'} />);
        }catch(err){
            setMessage(<Message message={'Could not add Episode, please try again'} />);
        }
        setIsLoading(false);
    }

    if(!currentUser) return null;
    return (
        <main>
            <h2>Add Episode</h2>
            {message}
            <form onSubmit={e => !isLoading && submit(e)} className="add-podcast-form">
                <div className="form-group">
                    <label>Podcast</label>
                    <select ref={podcastRef} required defaultValue={defaultPodcast} className="form-control selection">
                        {podcasts.map(podcast => <option selected={defaultPodcast === podcast._id} value={podcast._id}>{podcast.title}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" pattern='[a-zA-Z0-9-]+' ref={titleRef} placeholder="Title" className="form-control" required/>
                </div>

                <div className="form-group">
                    <label>File</label>
                    <input ref={fileRef} type="file" accept=".mp3,audio/*" required/>
                </div>
                <button disabled={isLoading} className="main-button" type="submit">{isLoading ? <Loading/> : 'Add Episode'}</button>
            </form>
        </main>
    )
}
