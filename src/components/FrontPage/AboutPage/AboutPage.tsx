import React, { ChangeEvent, useEffect, useState } from 'react';
import {FC} from 'react';
import styled from 'styled-components';
import { useUser } from '../../../context/UserContext';
import { db } from '../../../firebase'

import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';

import {SingleInfo} from './SingleInfo';

interface News {
    id: string,
    text: string,
    createdAt: Date
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
        const newsData = {
            text: newsText,
            createdAt: new Date(),
        };
        const addedNews = await db.collection('about').add(newsData);
        setNews(oldNews => [{ id: addedNews.id, ...newsData }, ...oldNews])
    }


    const deleteNews = async (id: string) => {
        await db.collection('about').doc(id).delete();
        setNews(oldNews => oldNews.filter(news => news.id !== id))
    }

    useEffect(() => {
        const fetchNews = async () => {
            const snapshot = await db.collection('about').orderBy('createdAt', 'desc').get();
            if (snapshot.empty) {
                setNews([])
            } else {
                setNews(snapshot.docs.map(doc => {
                    const data = doc.data()
                    return {id: doc.id, text: data.text, createdAt: data.createdAt}
                }))
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
                news && news.map((n) => <SingleInfo key={n.id} text={n.text} isAdmin={isAdmin()} id={n.id} onDelete={deleteNews}/>)
            }
            </Contener>
        </Wrapper>
    );

};