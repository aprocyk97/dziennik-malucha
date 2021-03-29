import React, {FC, useState, useEffect} from 'react';
import {useAuth} from '../../../context/AuthContext';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import {db} from '../../../firebase'; 

import {Colors} from '../../../styledHelpers/Colors';
import {fontSize} from '../../../styledHelpers/FontSizes';
import 
{
    Wrapper, 
    LoginButton

} from '../../../styledHelpers/LoginFormStyling';


const Wrap = styled(Wrapper)`
    flex-direction: row;
`;

const ColumnWrap = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${fontSize[22]};


    margin: 25px;
    padding-right: 10px;

    &:first-child{
        border-right: 1px solid black;
    }
`;

export const UserProfile:FC = () => {

    const [error, setError] = useState('');
    const [sortedData, setSortedData] = useState<Array<any>>();
    const [loading, setLoading] = useState<Boolean>(true);
    

    const {logout, getUser} = useAuth();
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
        fetchData();
        
        
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
        <Wrap>
            <ColumnWrap>
                {error && <div>{error}</div>}
                {/* Profil Użytkownika: {JSON.stringify(data)} */}
                {loading ? <div>Loading</div> : kek() }
                
                <button onClick={handleLogout}>Wyloguj</button>
            </ColumnWrap>

            <ColumnWrap>
            
            </ColumnWrap>
        </Wrap>
    )
}
