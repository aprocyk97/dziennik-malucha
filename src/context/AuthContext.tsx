import React, {FC, useContext, useState, useEffect} from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext({} as any);

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider:FC = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState<Boolean>(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
      }

    function logout(){
        return auth.signOut();
    }

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user as any);
      setLoading(false);
    })

    return unsubscribe;
  }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
