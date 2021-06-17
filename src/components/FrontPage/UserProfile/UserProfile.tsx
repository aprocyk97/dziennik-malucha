import React, { FC, useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import styled from 'styled-components';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { db } from '../../../firebase';

import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';
import {
    Wrapper,
    LoginButton

} from '../../../styledHelpers/LoginFormStyling';
import { useKindergarden } from '../../../context/KindergardenContext';


const Wrap = styled(Wrapper)`
    flex-direction: row;
    align-items: normal;
    margin: 5vh 10vw;
    width:80vw;
    min-height: 45vh;

    box-shadow:0px 0px 5px 2px ${Colors.borderGreen};

    
`;

const ColumnWrap = styled.div`
    width: 60%;
    margin: 25px;
    padding-right: 1vw;
    display: flex;
    flex-direction: column;
    font-size: ${fontSize[22]};
    &:first-child{
        border-right: 1px solid black;
    }
    h1{
        margin: 0 0 3vh 1vw;
        font-size:${fontSize[24]};
        font-family: Roboto;

    }
    li{
        margin-bottom: 10px;
    }
    &:last-child{
        width: 40%;
    }
`;
const StyledListElement = styled.li`
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    margin: 0 0 10px 10px;
`;

const UserCredentials = styled.div`
    margin: 2vh 0.5vw;
    display: flex;
    flex-direction: column;
`;
const SingleCredential = styled.div`
    display: flex;
    flex-direction: row;

    margin: 0.7vh 0;

    .crTitle{
        margin-right: 1vw;
    }
    .crContent{
        color: #00026d;
    }
`;
const StyledLogout = styled.button`
    margin-top: auto;
    align-self: center;

    width: 33%;
    height: 4vh;

    outline: none;
    border: 2px solid gray;
    border-radius: 5px;

    font-size: ${fontSize[18]};
    font-family: Roboto;
    font-weight: bold;
    letter-spacing: 1px;

    background-color: ${Colors.borderGreen};

    &:active{
        border: 1px solid gray;
        transform: translate(-1px,-1px);
    }

`;


interface IKindergardenData {
    id: string;
    name: string;
}

interface IUserData {
    name: string;
    surname: string;
    email: string;
    kindergardens: IKindergardenData[];

}

export const UserProfile: FC = () => {

    const [error, setError] = useState('');
    const [sortedData, setSortedData] = useState<Array<any>>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [kindergardens, setKindergardens] = useState<Array<any>>();

    const [userData, setUserData] = useState<IUserData>();


    const { logout, getUser } = useAuth();
    const { setKindergarden, setKindergardenName } = useKindergarden();
    const history = useHistory();
    const userRef = db.collection('users').doc(getUser());
    let match = useRouteMatch('/dziennik-malucha');

    useEffect(() => {
        const fetchData = async () => {
            userRef.get().then((doc) => {
                if (doc.exists) {
                    setUserData(doc.data() as IUserData);
                    sortData(doc.data());

                } else {
                    setError('Brak danych użytkownika w systemie');
                }
            }).catch((error) => {
                setError('Błąd podczas pobierania danych z serwera')
            }).finally(() => {
                setLoading(false);
            });
        };
        fetchData();


    }, []);

    function sortData(obj: object | undefined) {
        let arr: any[] = [];

        Object.entries(obj!).map(([key, value]) => {
            key !== 'kindergardens' ? arr.push([key, value]) : setKindergardens(value);
        })
        arr.sort((a, b) => {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        })
        setSortedData(arr);
    }

    function displayUserData() {
        if (sortedData !== undefined) {

            return (
                <ul>
                    {sortedData.map(obj => {

                        return <li>{obj[0]}: {obj[1]}</li>;
                    })}
                </ul>
            );
        }
    }

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history.push(`${match!.path}/login`);
        } catch {
            setError('Wystąpił błąd podczas wylogowywania.')
        }

    }

    return (
        <Wrap>

            <ColumnWrap>
                {error && <div>{error}</div>}
                <h1>Dane Użytkownika</h1>
                {
                    loading ?
                        <div>Loading</div>
                        :
                        <UserCredentials>
                            <SingleCredential>
                                <p className='crTitle'>Imię: </p>
                                <p className ='crContent'>{userData?.name}</p>
                            </SingleCredential>
                            <SingleCredential>
                                <p className='crTitle'>Nazwisko: </p>
                                <p className ='crContent'>{userData?.surname}</p>
                            </SingleCredential>
                            <SingleCredential>
                                <p className='crTitle'>E-mail: </p>
                                <p className ='crContent'>{userData?.email}</p>
                            </SingleCredential>
                        </UserCredentials>
                }
                <StyledLogout onClick={handleLogout}>Wyloguj</StyledLogout>
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