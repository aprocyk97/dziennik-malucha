import React, {FC, useState, useEffect} from 'react'
import {useAuth} from '../../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom';
import {db} from '../../../firebase'; 

export const UserProfile:FC = () => {

    const [error, setError] = useState('');
    const [sortedData, setSortedData] = useState<Array<any>>();
    const [loading, setLoading] = useState<Boolean>(true);
    

    const {currentUser, logout, getUser} = useAuth();
    const history = useHistory();
    const userRef = db.collection('users').doc(getUser());

    useEffect(()=>{
        const fetchData = async () => {
            userRef.get().then((doc) => {
                if(doc.exists) {
                    sortData(doc.data());
                    setLoading(false);
                } else {
                    setError('Brak danych użytkownika w systemie');
                }
            }).catch((error) => {
                setError('Błąd podczas pobierania danych z serwera')
            });
        };
        // const sort = async () => {
        //     console.log('datafetched:' + data);
        //     if(data !== undefined){
        //         let arr: any[] = [];
        //         Object.entries(data).map(([key, value]) => {
        //             arr.push([key,value]);
        //         })
        //         arr.sort((a,b)=>{
        //             if (a[0] === b[0]) {
        //                 return 0;
        //             }
        //             else {
        //                 return (a[0] < b[0]) ? -1 : 1;
        //             }
        //         })
        //         setSortedData(arr);
        //     }
        // };
        fetchData();
        // sort();
        
        
    }, []);

    function sortData(obj: object | undefined){
        let arr: any[] = [];
        Object.entries(obj!).map(([key, value]) => {
            arr.push([key,value]);
        })
        arr.sort((a,b)=>{
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        })
        setSortedData(arr);
    }

    function kek(){
        if(sortedData !== undefined){
            
            return(
                <ul>
                    {sortedData.map( obj => {
                        return <li>{obj[0]}: {obj[1]}</li>;
                    })}
                </ul>
            );
        }
    }

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
            {/* Profil Użytkownika: {JSON.stringify(data)} */}
            {loading ? <div>Loading</div> : kek() }
            
            <button onClick={handleLogout}>Wyloguj</button>

        </div>
    )
}
