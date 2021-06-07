import React, {FC, useState, useEffect} from 'react';
import {useAuth} from '../../../context/AuthContext';
import styled from 'styled-components';
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import {db} from '../../../firebase'; 

import {Colors} from '../../../styledHelpers/Colors';
import {fontSize} from '../../../styledHelpers/FontSizes';
import 
{
    Wrapper, 
    LoginButton

} from '../../../styledHelpers/LoginFormStyling';
import { useKindergarden } from '../../../context/KindergardenContext';


const Wrap = styled(Wrapper)`
    flex-direction: row;
    align-items: normal;
    margin: 15vh 20vw;
    width:60vw;
`;

const ColumnWrap = styled.div`
    width: 50%;
    margin: 25px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    font-size: ${fontSize[22]};
    &:first-child{
        border-right: 1px solid black;
    }
    h1{
        margin-bottom: 25px;
    }
    li{
        margin-bottom: 10px;
    }
`;
const StyledListElement = styled.li`
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    margin: 0 0 10px 10px;
`;

export const UserProfile:FC = () => {

    const [error, setError] = useState('');
    const [sortedData, setSortedData] = useState<Array<any>>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [kindergardens, setKindergardens] = useState<Array<any>>();
    

    const {logout, getUser} = useAuth();
    const {setKindergarden, getKindergardenUser, setKindergardenName} = useKindergarden();
    const history = useHistory();
    const userRef = db.collection('users').doc(getUser());
    let match = useRouteMatch('/dziennik-malucha');

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
            key !== 'kindergardens'?  arr.push([key,value]): setKindergardens(value);
        })
        arr.sort((a,b) => {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        })
        setSortedData(arr);
    }

    function displayUserData(){
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
            history.push(`${match!.path}/login`);
        }catch{
            setError('Wystąpił błąd podczas wylogowywania.')
        }

    }

    return (
        <Wrap>  
            
            {console.log('Test user: ', getKindergardenUser())}
            <ColumnWrap>
                {error && <div>{error}</div>}
                {/* Profil Użytkownika: {JSON.stringify(data)} */}
                <h1>Dane Użytkownika</h1>
                {loading ? <div>Loading</div> : displayUserData() }
                
                <button onClick={handleLogout}>Wyloguj</button>
            </ColumnWrap>

            <ColumnWrap>
            <h1>Twoje przedszkola</h1>
            <ul>
                {kindergardens && kindergardens.map(value => {
                    return <StyledListElement>
                        <Link 
                            to={`/${value?.id}/strona-glowna`} 
                            onClick={() => {
                                setKindergarden(value.id);
                                setKindergardenName(value.name);
                            }} 
                        >
                            {value.name}
                        </Link>
                        </StyledListElement>
                })}

            </ul>
            
            </ColumnWrap>
        </Wrap>
    )
}