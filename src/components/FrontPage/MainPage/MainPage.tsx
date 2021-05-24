import React, { ChangeEvent, useEffect, useState } from 'react';
import {FC} from 'react';
import { useUser } from '../../../context/UserContext';
import styled from 'styled-components';

import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';
import { FrontPage } from '../FrontPage';
import logout from '../../media/icons/logout.png';

import {SingleNews} from './SingleNews';
import { db } from '../../../firebase'

interface News {
    id: string,
    text: string,
    createdAt: Date
}

const DIV = styled.div`
    border: 1px solid lightblue;
    background: lightblue;
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 35px;
`;
const SearchWrapper = styled.div`
    display: flex;
    border: 2px solid gray;
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
`;

export const MainPage: FC = () => {
    const { isAdmin } = useUser();
    const [news, setNews] = useState<News[]>([]);
    const [newsText, setNewsText] = useState<string>('');

    const addNews = async () => {
        const newsData = {
            text: newsText,
            createdAt: new Date(),
        }
        const addedNews = await db.collection('news').add(newsData);
        setNews(oldNews => [{ id: addedNews.id, ...newsData }, ...oldNews])
    }

    const deleteNews = async (id: string) => {
        await db.collection('news').doc(id).delete();
        setNews(oldNews => oldNews.filter(news => news.id !== id))
    }

    useEffect(() => {
        const fetchNews = async () => {
            const snapshot = await db.collection('news').orderBy('createdAt', 'desc').get();
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
                    <DIV>
                        <SearchWrapper>
                            <button onClick={() => addNews()}>Dodaj wiadomość</button>
                            <Search type="text" onChange={(e) => setNewsText(e.target.value)} />
                        </SearchWrapper>
                    </DIV>
                )
            }<br></br>
            {
                news && news.map((n) => <SingleNews key={n.id} text={n.text} isAdmin={isAdmin()} id={n.id} onDelete={deleteNews}/>)
            }
        </Contener>
    </Wrapper>
    );

};