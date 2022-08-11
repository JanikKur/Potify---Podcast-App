import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserContext = React.createContext();
const backendLink = process.env.REACT_APP_BACKEND_URL + '/api/v1';

export function useUser() {
    return useContext(UserContext);
}



export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(currentUser);
        setLoading(false);
    }, [currentUser]);


    useEffect(() => {
        axios.get(`${backendLink}/user/validate`, {}, { withCredentials: true }).then(res => {
            setCurrentUser(res.data.user);
        }).catch(error => {
        })
    }, []);

    async function logout() {
        try {
            await axios.delete(`${backendLink}/user/logout`, { withCredentials: true });
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    async function loginUser(email, password) {
        if (!email || !password) {
            return;
        }
        let formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        try {
            const result = await axios.post(`${backendLink}/user/login`, formData, { withCredentials: true });
            if (result.status === 200) {
                setCurrentUser(result.data.user);
                navigate('/');
            }
        }
        catch (error) {
            alert("Falscher Username oder Passwort")
        }
    }

    async function registerUser(username, email, password) {
        if (!username || !password) {
            return;
        }
        let formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        try {
            const result = await axios.post(`${backendLink}/user`, formData, { withCredentials: true });
            if (result.status === 201) {
                window.location.href = '/login';
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async function updateUserData(newData) {
        if (!newData) {
            return;
        }
        let formData = new FormData();
        for (let elem in newData) {
            formData.append(elem, newData[elem]);
        }
        try {
            const result = await axios.put(`${backendLink}/user/${currentUser.id}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            if (result.status === 200) {
                window.location.reload();
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }


    const value = {
        currentUser,
        setCurrentUser,
        logout,
        loginUser,
        registerUser,
        updateUserData
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}