import React, { FC, useContext, useState, useEffect, useReducer } from 'react';

import {db} from '../firebase';

interface IKindergardenUser {
    uid: string;
    power: string;
    kindergardenId: string;
}

interface IUsers {
    power:string;
    uid:string;
}


const KindergardenContext = React.createContext({} as any);

export function useKindergarden(){
    return useContext(KindergardenContext);
}

export const KindergardenProvider: FC = ({children}) => {


    const [loading, setLoading] = useState<Boolean>(true);
    const [currentKindergarden, setCurrentKindergarden] = useState<string>();
    const [currentKindergardenName, setCurrentKindergardenName] = useState<string>();
    const [currentKindergardenUser, setCurrentKindergardenUser] = useState<string>();
    const [kindergardenUserPower, setKindergardenUserPower] = useState<string>();
    const [isUserAdmin, setIsUserAdmin] = useState<boolean>();

    const [currentUserPowers, setCurrentUserPowers] = useState<IKindergardenUser>();
    

    function setKindergarden(path: string){
        setCurrentKindergarden(path);
    }
    function getKindergarden(){
        return currentKindergarden;
    }
    function setKindergardenUser(user: string){
        setCurrentKindergardenUser(user);
    }
    function getKindergardenUser(){
        return currentKindergardenUser;
    }
    function setKindergardenName(name: string){
        setCurrentKindergardenName(name);
    }
    function getKindergardenName(){
        return currentKindergardenName;
    }
    function setIsAdmin(state: boolean){
        setIsUserAdmin(state);
    }
    function getIsAdmin(){
        return isUserAdmin;
    }



    function setLocalStorage(itemName:string,item: any){
        if(item !== undefined){
            window.localStorage.setItem(itemName, item)
        }
    }



    useEffect(() => {
        setKindergarden(window.localStorage.getItem('currentKindergarden') || 'currentKindergarden');
        setKindergardenUser(window.localStorage.getItem('currentKindergardenUser') || 'currentKindergardenUser');
        setKindergardenName(window.localStorage.getItem('currentKindergardenName') || 'currentKindergardenName');
        setLoading(false);
    }, [])

    useEffect(() => {
        console.log('current kind', currentKindergarden);
        
        return setLocalStorage('currentKindergarden', currentKindergarden);
    }, [currentKindergarden])

    useEffect(() => {
        console.log('current usr', currentKindergardenUser);

        return setLocalStorage('currentKindergardenUser', currentKindergardenUser)
    }, [currentKindergardenUser])

    useEffect(() => {
        console.log('current name', currentKindergardenName);

        return setLocalStorage('currentKindergardenName', currentKindergardenName)
    }, [currentKindergardenName])



    const value = {
        setKindergarden,
        getKindergarden,
        setKindergardenUser,
        getKindergardenUser,
        setKindergardenName,
        getKindergardenName, 
        setIsAdmin,
        getIsAdmin,
    }



    return (
        <KindergardenContext.Provider value={value}>
            {!loading && children}
        </KindergardenContext.Provider>
    )
}
