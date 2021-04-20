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
    name: string;
    priceValue: number;
    pricePeriod: string;
    additionalInfo: string;
}

const DIV = styled.div`
    padding: 25px;
`;

const Card = styled.div`
    border: 1px solid lightblue;
    background: hsl(8.630136986301375, 62.393162393162385%, 54.11764705882353%);
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 40px;
    padding-left: 40px;
    border-radius: 10px;  
`;

export const PricePage: FC = () => {
    const { isAdmin } = useUser();
    const [fees, setFees] = useState<Fee[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addFee = async (data) => {
        const newFee = {
            name: data.name,
            priceValue: data.priceValue,
            pricePeriod: data.pricePeriod,
            additionalInfo: data.additionalInfo,
            createdAt: new Date(),
        };

        await db.collection('fees').add(newFee);
        setFees(oldFees => [newFee, ...oldFees])
    }

    useEffect(() => {
        const fetchFees = async () => {
            const snapshot = await db.collection('fees').orderBy('createdAt', 'desc').get();
            if (snapshot.empty) {
                setFees([])
            } else {
                setFees(snapshot.docs.map(doc => doc.data()) as any)
            }
        }
        fetchFees()
    }, [])

    return(
        <Wrapper>
            <Contener>
            {
                isAdmin() && (
                    <form onSubmit={handleSubmit(addFee)}>
                        <label htmlFor="name">Nazwa pakietu</label>
                        <input id="name" {...register('name', { required: true })} />
                        <label htmlFor="priceValue">Cena pakietu</label>
                        <input id="priceValue" type="number" {...register('priceValue', { required: true, min: 1 })} />
                        <label htmlFor="pricePeriod">Okres pakietu</label>
                        <select id="pricePeriod" {...register("pricePeriod", { required: true })}>
                            <option value="monthly">miesięczny</option>
                            <option value="yearly">roczny</option>
                        </select>
                        <label htmlFor="additionalInfo">Szczegóły</label>
                        <input id="additionalInfo" {...register('priceValue', { required: true })}/>
                        <input type="submit" />
                    </form>
                )
            }
            {
                fees && fees.map((fee) => <NewPrice {...fee} />)
            }
            </Contener>
        </Wrapper>
    );

};