import React, { ChangeEvent, useEffect, useState } from 'react';
import {FC} from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useUser } from '../../../context/UserContext';
import { db } from '../../../firebase'

import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';

import {NewPrice} from './NewPrice';

interface Fee {
    id: string,
    name: string,
    priceValue: number,
    pricePeriod: string,
    additionalInfo: string
}

const DIV = styled.div`
    border: 1px solid black;
    background: lightyellow;
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 10px;
    display: flex;
`;

const Card = styled.div`
    border: 1px solid lightyellow;
    background: hsl(8.630136986301375, 62.393162393162385%, 54.11764705882353%);
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 40px;
    padding-left: 40px;
    border-radius: 10px;  
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


export const PricePage: FC = () => {
    const { isAdmin } = useUser();
    const [fees, setFees] = useState<Fee[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<Fee>();

    const addFee = async (data) => {
        const newFee = {
            name: data.name,
            priceValue: data.priceValue,
            pricePeriod: data.pricePeriod,
            additionalInfo: data.additionalInfo,
            createdAt: new Date(),
        };
        const addedFees = await db.collection('fees').add(newFee);
        setFees(oldFees => [{ id: addedFees.id, ...newFee }, ...oldFees])
    }

    const deleteNews = async (id: string) => {
        await db.collection('fees').doc(id).delete();
        setFees(oldFees => oldFees.filter(news => news.id !== id))
    }

    useEffect(() => {
        const fetchFees = async () => {
            const snapshot = await db.collection('fees').orderBy('createdAt', 'desc').get();
            if (snapshot.empty) {
                setFees([])
            } else {
                setFees(snapshot.docs.map(doc => {
                    const data = doc.data()
                    return {id: doc.id, name: data.name, priceValue: data.priceValue, pricePeriod: data.pricePeriod, additionalInfo: data.additionalInfo}
                }))
            }
        }
        fetchFees()
    }, [])

    return(
        <Wrapper>
            <Contener>
            {
                isAdmin() && (
                    <DIV>
                        <SearchWrapper>
                            <form onSubmit={handleSubmit(addFee)}>
                                <label>Nazwa pakietu:</label>
                                <Search id="name" {...register('name', { required: true })} />
                                {errors?.name?.type === "required" && <p>Nazwa pakietu jest wymagana</p>}
                                <label>Cena pakietu:</label>
                                <Search type="number" id="priceValue" {...register('priceValue', { required: true, min: 1 })} />
                                {errors?.priceValue?.type === "required" && <p>Cena pakietu jest wymagana</p>}
                                {errors?.priceValue?.type === "min" && <p>Cena pakietu musi wynosić co najmniej 1</p>}
                                <label>Okres pakietu:</label>
                                <select id="pricePeriod" {...register("pricePeriod", { required: true })}>
                                    <option value="monthly">miesięczny</option>
                                    <option value="yearly">roczny</option>
                                </select>
                                {errors?.pricePeriod?.type === "required" && <p>Okres trwania pakietu musi być zdefiniowany</p>}
                                <label>Szczegóły</label>
                                <Search id="additionalInfo" defaultValue="" {...register('additionalInfo', {})}/>
                                <input type="submit" />
                            </form>
                        </SearchWrapper>
                    </DIV>    
                )
            }
            {
                fees && fees.map((fee) => <NewPrice key={fee.id} name={fee.name} priceValue={fee.priceValue} pricePeriod={fee.pricePeriod} additionalInfo={fee.additionalInfo} isAdmin={isAdmin()} id={fee.id} onDelete={deleteNews}/>)
            }
            </Contener>
        </Wrapper>
    );

};