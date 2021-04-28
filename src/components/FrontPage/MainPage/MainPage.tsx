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
    text: string
}

const DIV = styled.div`
    border: 1px solid lightblue;
    background: lightblue;
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 5px;
`;

export const MainPage: FC = () => {
    const { isAdmin } = useUser();
    const [news, setNews] = useState<News[]>([]);
    const [newsText, setNewsText] = useState<string>('');

    const addNews = async () => {
        await db.collection('news').add({
            text: newsText,
            createdAt: new Date(),
        });
        setNews(oldNews => [{ text: newsText }, ...oldNews])
    }

    useEffect(() => {
        const fetchNews = async () => {
            const snapshot = await db.collection('news').orderBy('createdAt', 'desc').get();
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
                    <DIV>
                        <button onClick={() => addNews()}>Dodaj wiadomość</button>
                        <input type="text" onChange={(e) => setNewsText(e.target.value)} />
                    </DIV>
                )
            }<br></br>
            {
                news && news.map((n) => <SingleNews text={n.text} />)
            }
        </Contener>
    </Wrapper>
    );

};