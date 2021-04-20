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
import { useUser } from '../../../context/UserContext';


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
    const [loading, setLoading] = useState<Boolean>(true);
    

    const {logout} = useAuth();
    const { userProfileData, getUserKindergartens } = useUser();
    const history = useHistory();

    function displayUserData(){
        if(userProfileData !== undefined){      
            return(
                <ul>
                    <li>Email: {userProfileData.email}</li>
                    <li>Name: {userProfileData.name}</li>
                    <li>Surname: {userProfileData.surname}</li>
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
                <h1>Dane Użytkownika</h1>
                {displayUserData()}
                
                <button onClick={handleLogout}>Wyloguj</button>
            </ColumnWrap>

            <ColumnWrap>
            <h1>Twoje przedszkola</h1>
            <ul>
                {getUserKindergartens() && getUserKindergartens().map(value => {
                    return <StyledListElement><Link to={value?.id} >{value.name}</Link></StyledListElement>
                })}

            </ul>
            
            </ColumnWrap>
        </Wrap>
    )
}
