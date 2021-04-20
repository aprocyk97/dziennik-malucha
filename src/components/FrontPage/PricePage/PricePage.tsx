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
    const { register, handleSubmit, formState: { errors } } = useForm<Fee>();

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
                        <label>Nazwa pakietu</label>
                        <input id="name" {...register('name', { required: true })} />
                        {errors?.name?.type === "required" && <p>Nazwa pakietu jest wymagana</p>}
                        <label>Cena pakietu</label>
                        <input type="number" id="priceValue" {...register('priceValue', { required: true, min: 1 })} />
                        {errors?.priceValue?.type === "required" && <p>Cena pakietu jest wymagana</p>}
                        {errors?.priceValue?.type === "min" && <p>Cena pakietu musi wynosić co najmniej 1</p>}
                        <label>Okres pakietu</label>
                        <select id="pricePeriod" {...register("pricePeriod", { required: true })}>
                            <option value="monthly">miesięczny</option>
                            <option value="yearly">roczny</option>
                        </select>
                        {errors?.pricePeriod?.type === "required" && <p>Okres trwania pakietu musi być zdefiniowany</p>}
                        <label>Szczegóły</label>
                        <input id="additionalInfo" defaultValue="" {...register('additionalInfo', {})}/>
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