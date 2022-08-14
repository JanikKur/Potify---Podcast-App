import React, { useRef, useState } from 'react'
import '../assets/styles/pages/settings.css';
import {useUser} from '../contexts/UserContext';
import Loading from '../components/Loading';

export default function Settings() {

    
    const {currentUser, updateUserData} = useUser();
    const userNameRef = useRef();
    const emailRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    async function submit(e){
        e.preventDefault();
        setIsLoading(true)
        await updateUserData({username: userNameRef.current.value, email: emailRef.current.value});
        setIsLoading(false)
    }

    if(!currentUser) return null;
    return (
        <main>
            <div className="user-informations">
                <h1 className="name-icon">{currentUser.username[0].toUpperCase()}</h1>
                <h1 className="name">{currentUser.username}</h1>
            </div>
            <form onSubmit={e => !isLoading && submit(e)} className="settings">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Username" ref={userNameRef} defaultValue={currentUser.username} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" ref={emailRef} defaultValue={currentUser.email} className="form-control" required/>
                </div>
                <details className="new-password-wrapper">
                    <summary>New Password</summary>
                    <div className="form">
                        <div className="form-group">
                            <label>Old Password</label>
                            <input type="password" placeholder="Old Password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" placeholder="New Password" className="form-control" />
                        </div>
                    </div>
                </details>
                <button disabled={isLoading} className="main-button">{isLoading ? <Loading/> : 'Save'}</button>
                <button className="delete-button">Delete Account</button>
            </form>
        </main>
    )
}
