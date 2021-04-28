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
    const [currentKindergardenUser, setCurrentKindergardenUser] = useState<string>();
    const [kindergardenUserPower, setKindergardenUserPower] = useState<string>();

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



    function setLocalStorage(itemName:string,item: any){
        if(item !== undefined){
            window.localStorage.setItem(itemName, item)
        }
    }

    async function  userSet(){

        const ref = db.collection('kindergardens').doc(currentKindergarden);
        

        const data = await ref.get().then(doc =>{
            if(doc.exists){
                return doc.data();
                
            } else {
                console.log('Cannot get data from server!')
            }
        }).catch(error => {
            console.log('Kindergarden Database error: ', error);
        })
        
        const users: IUsers[] = Object.values(data!['users']);
        users.map(items => {
            if(items.uid === currentKindergardenUser){
                setCurrentUserPowers({
                    uid: items.uid,
                    power: items.power,
                    kindergardenId: currentKindergarden!
                })
            }
        })
        
        
    }



    useEffect(() => {
        setKindergarden(window.localStorage.getItem('currentKindergarden') || 'currentKindergarden');
        setKindergardenUser(window.localStorage.getItem('currentKindergardenUser') || 'currentKindergardenUser');
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


    const value = {
        setKindergarden,
        getKindergarden,
        setKindergardenUser,
        getKindergardenUser, 
    }



    return (
        <KindergardenContext.Provider value={value}>
            {!loading && children}
        </KindergardenContext.Provider>
    )
}
