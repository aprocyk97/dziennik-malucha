import React, {FC, useState} from 'react'
import {useAuth} from '../../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom';

export const UserProfile:FC = () => {

    const [error, setError] = useState('');

    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout(){
        setError('');

        try{
            await logout();
            history.push('/login');
        }catch{
            setError('Wystąpił błąd podczas wylogowywania.')
        }

    }

    return (
        <div>
            {error && <div>{error}</div>}
            Profil Użytkownika: {currentUser.email}
            <button onClick={handleLogout}>Wyloguj</button>

        </div>
    )
}
