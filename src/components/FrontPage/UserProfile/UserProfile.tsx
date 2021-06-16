import React, {FC, useState, useEffect} from 'react';
import {useAuth} from '../../../context/AuthContext';
import styled from 'styled-components';
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import {db} from '../../../firebase'; 
import { useUser } from '../../../context/UserContext';
import { useForm } from "react-hook-form";

import {Colors} from '../../../styledHelpers/Colors';
import {fontSize} from '../../../styledHelpers/FontSizes';
import 
{
    Wrapper, 
    LoginButton

} from '../../../styledHelpers/LoginFormStyling';
import { useKindergarden } from '../../../context/KindergardenContext';
import { faStarOfDavid } from '@fortawesome/free-solid-svg-icons';
import { stringify } from 'querystring';
import { getMaxListeners } from 'node:process';

interface News {
    id: string,
    text: string,
    createdAt: Date
}
interface Forme {
    id: string,
    name: string,
}

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
const SearchWrapper = styled.div`
    display: flex;
    border: 3px solid gray;
    width: 100%;
    //height: 50%;
    border-radius: 5px;
    align-items: center;
    background-color: white;
    //img{
    //   margin: 0 0.5vh;
    //}
`;

const Search = styled.input`
    background-color: transparent;
    margin: 0 0.2vw;
    height: 90%;
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
`;

export const UserProfile:FC = () => {

    const { isAdmin } = useUser();
    const [news, setNews] = useState<News[]>([]);
    const [newsText, setNewsText] = useState<string>('');
    const [newsname, setNewsName] = useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm<Forme>();

    const [error, setError] = useState('');
    const [sortedData, setSortedData] = useState<Array<any>>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [kindergardens, setKindergardens] = useState<Array<any>>();
    

    const {logout, getUser} = useAuth();
    const {setKindergarden, getKindergardenUser} = useKindergarden();
    const history = useHistory();
    const userRef = db.collection('users').doc(getUser());
    let match = useRouteMatch('/dziennik-malucha');

    const addKindergardens = async (data) => {
        const newsData = {
            id: data.id,
            name: data.name,
            children: [],
            users: [],
        };
        const newKinderUser = {
            kindergardens: [{ id: data.id, name: data.name }],
            email: 'woookie123@gmail.com',
            name: 'Admin',
            surname: 'Admin',
            role: 'ADMIN',
        };
        db.collection('kindergardens').doc(data.id).set(newsData);
        db.collection('kindergardens').doc(data.id).collection('data').doc('feed').set({items: []});
        db.collection('kindergardens').doc(data.id).collection('data').doc('meals').set({test: ''});
        db.collection('kindergardens').doc(data.id).collection('groups').doc('a').set({test: ''});
        db.collection('users').doc('XdXv6ji0d0Yw454RAsB8xoH43en2').set(newKinderUser);
    }

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
                {
                    isAdmin() && (
                        <SearchWrapper>
                            <form onSubmit={handleSubmit(addKindergardens)}>
                                <label>Id: </label>
                                <Search id="id" {...register('id', { required: true })} />
                                {errors?.id?.type === "required" && <p>Nazwa pakietu jest wymagana</p>}
                                <label>Nazwa: </label>
                                <Search id="name" {...register('name', { required: true })} />
                                {errors?.name?.type === "required" && <p>Nazwa pakietu jest wymagana</p>}
                                <input type="submit" />
                            </form>
                        </SearchWrapper>
                        //<SearchWrapper>
                            //<button onClick={() => addKindergardens()}>Dodaj przedszkole:</button>
                            //<Search type="text" onChange={(e) => setNewsText(e.target.value)}/>
                        //</SearchWrapper>
                    )
                }
                {kindergardens && kindergardens.map(value => {
                    return <StyledListElement>
                        <Link 
                            to={`/${value?.id}/strona-glowna`} 
                            onClick={() => {
                                setKindergarden(value.id);
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