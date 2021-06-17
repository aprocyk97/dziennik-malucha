import React, { ChangeEvent, useEffect, useState } from 'react';
import {FC} from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useUser } from '../../../context/UserContext';
import { db } from '../../../firebase'


import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';

import {SimpleInformation} from './SimpleInformation';

interface Con {
    id: string,
    name: string,
    telNumber: number,
    mailAddres: string
}

const DIV = styled.div`
    border: 1px solid lightgrey;
    background: lightgrey;
    box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.2);
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 10px;
    display: flex;
    margin-bottom: 15px;
`;

const SearchWrapper = styled.div`
    display: flex;
    border: 2px solid gray;
    border-radius: 5px;
    height: 50%;
    align-items: center;
    background-color: white;
    //margin-left: 18%;
    //margin-right: 18%;
    //justify-content: center;
    margin:auto;
    padding: 5px;

`;

const Search = styled.input`
    background-color: transparent;
    margin: 0 0.2vw;
    height: 90%;
    //width: 25%;
    border: none;
    outline: none;
    //justify-content: center;
    

`;


export const ContactPage: FC = () => {
    const { isAdmin } = useUser();
    const [contact, setContact] = useState<Con[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<Con>();

    const addContact = async (data) => {
        const newCon = {
            name: data.name,
            telNumber: data.telNumber,
            mailAddres: data.mailAddres,
            createdAt: new Date(),
        };
        const addedCon = await db.collection('contact').add(newCon);
        setContact(oldCon => [{ id: addedCon.id, ...newCon }, ...oldCon])
    }

    const deleteNews = async (id: string) => {
        await db.collection('contact').doc(id).delete();
        setContact(oldCon => oldCon.filter(news => news.id !== id))
    }

    useEffect(() => {
        const fetchContact = async () => {
            const snapshot = await db.collection('contact').orderBy('createdAt', 'desc').get();
            if (snapshot.empty) {
                setContact([])
            } else {
                setContact(snapshot.docs.map(doc => {
                    const data = doc.data()
                    return {id: doc.id, name: data.name, telNumber: data.telNumber, mailAddres: data.mailAddres}
                }))
            }
        }
        fetchContact()
    }, [])

    return(
        <Wrapper>
            <Contener>
            {
                isAdmin() && (
                    <DIV>
                        <SearchWrapper>
                            <form onSubmit={handleSubmit(addContact)}>
                                <label>Imię i Nazwisko: </label>
                                <Search id="name" {...register('name', { required: true })} />
                                {errors?.name?.type === "required" && <p>Nazwa pakietu jest wymagana</p>}
                                <label>Numer telefonu:</label>
                                <Search type="number" id="telNumber" {...register('telNumber', { required: true, min: 1 })} />
                                {errors?.telNumber?.type === "required" && <p>Cena pakietu jest wymagana</p>}
                                {errors?.telNumber?.type === "min" && <p>Cena pakietu musi wynosić co najmniej 1</p>}
                                <label>E-mail:</label>
                                <Search id="mailAddres" defaultValue="" {...register('mailAddres', {})}/>
                                <input type="submit" />
                            </form>
                        </SearchWrapper>
                    </DIV>    
                )
            }
            {
                contact && contact.map((con) => <SimpleInformation key={con.id} name={con.name} telNumber={con.telNumber} mailAddres={con.mailAddres} isAdmin={isAdmin()} id={con.id} onDelete={deleteNews}/>)
            }
            </Contener>
        </Wrapper>
    );

};
/*
export const ContactPage: FC = () => {

    const { isAdmin } = useUser();
    const [news, setNews] = useState<News[]>([]);
    const [newsText, setNewsText] = useState<string>('');

    const addNews = async () => {
        await db.collection('contact').add({
            text: newsText,
            createdAt: new Date(),
        });
        setNews(oldNews => [{ text: newsText }, ...oldNews])
    }

    useEffect(() => {
        const fetchNews = async () => {
            const snapshot = await db.collection('contact').orderBy('createdAt', 'desc').get();
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
                news && news.map((n) => <SimpleInformation text={n.text} />)
            }
            </Contener>
        </Wrapper>
    );

};
*/