import React, {FC, useContext, useState, useEffect} from 'react';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const UserContext = React.createContext({} as any);

export function useUser(){
    return useContext(UserContext);
}

export const UserProvider:FC = ({children}) => {
    const [userProfileData, setUserProfileData] = useState({} as any);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>('');
    const {getUser} = useAuth();

    const isAdmin = () => {
        return  userProfileData?.role === 'ADMIN';
    }

    const getUserKindergartens = () => {
        return userProfileData?.kindergartens;
    }

    useEffect(()=>{
        const fetchData = async (userId: string) => {
            db.collection('users').doc(userId).get().then((doc) => {
                console.log(doc, 'doc')
                if(doc.exists) {
                    setUserProfileData(doc.data());
                    setLoading(false);
                } else {
                    setError('Brak danych użytkownika w systemie');
                }
            }).catch(() => {
                setError('Błąd podczas pobierania danych z serwera')
            });
        };
        const currentUserId = getUser();
        if (currentUserId) {
            console.log(currentUserId)
            fetchData(currentUserId);
        }
    }, [getUser]);

    const value = {
        userProfileData,
        getUserKindergartens,
        error,
        isAdmin,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
