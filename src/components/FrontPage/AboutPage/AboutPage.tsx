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
                    <DIV>
                        <button onClick={() => addNews()}>Dodaj kontakt</button>
                        <input type="text" onChange={(e) => setNewsText(e.target.value)} />
                    </DIV>
                )
            }
            {
                news && news.map((n) => <SingleInfo text={n.text} />)
            }
            </Contener>
        </Wrapper>
    );

};