import React, { ChangeEvent, useEffect, useState } from 'react';
import {FC} from 'react';
import styled from 'styled-components';
import { useUser } from '../../../context/UserContext';
import { db } from '../../../firebase'

import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';

import {SingleInfo} from './SingleInfo';

interface News {
    text: string
}

const DIV = styled.div`
    padding: 25px;
`;

const SearchWrapper = styled.div`
    display: flex;
    border: 3px solid gray;
    width: 100%;
    border-radius: 5px;
    height: 50%;
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

export const AboutPage: FC = () => {

    const { isAdmin } = useUser();
    const [news, setNews] = useState<News[]>([]);
    const [newsText, setNewsText] = useState<string>('');

    const addNews = async () => {
        await db.collection('about').add({
            text: newsText,
            createdAt: new Date(),
        });
        setNews(oldNews => [{ text: newsText }, ...oldNews])
    }

    useEffect(() => {
        const fetchNews = async () => {
            const snapshot = await db.collection('about').orderBy('createdAt', 'desc').get();
            if (snapshot.empty) {
                setNews([])
            } else {
                setNews(snapshot.docs.map(doc => doc.data()) as any)
            }
        }
        fetchNews()
    }, [])

    return(
        <Wrapper>
            <Contener>
            {
                isAdmin() && (
                    <SearchWrapper>
                        <button onClick={() => addNews()}>Dodaj wpis:</button>
                        <Search type="text" onChange={(e) => setNewsText(e.target.value)} />
                    </SearchWrapper>
                )
            }
            {
                news && news.map((n) => <SingleInfo text={n.text} />)
            }
            </Contener>
        </Wrapper>
    );

};