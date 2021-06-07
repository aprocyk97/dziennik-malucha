import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getMeals, IDayMealsData, sendMeals } from '../../../../action/fetchKindergarden';
import { useKindergarden } from '../../../../context/KindergardenContext';
import { AddMeal } from './AddMeal';

const Wrapper = styled.div`
    margin: 2vh 0;
    max-width: 80vw;
    width: 100%;

    background-color: rgba(0, 0, 0, 0.05);

    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
const SubmitButton = styled.button`
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    margin-bottom: 2vh;

    margin-left: 45%;

    width: 140px;
    height: 45px;
    letter-spacing: 2.5px;

    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover{
        background-color: #2EE59D;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
        color: #fff;
        transform: translateY(-4px);
    }
`;

export type SingleMeal = {
    meal: string;
    amount: string;
    allergens: string[];
}

export const AdminAddMeal: FC = () => {

    const { getKindergarden } = useKindergarden();

    const [breakfastList, setBreakfastList] = useState<SingleMeal[]>([{ meal: '', amount: '', allergens: [''] }]);
    const [dinnerList, setDinnerList] = useState<SingleMeal[]>([{ meal: '', amount: '', allergens: [''] }]);
    const [teatimeList, setTeatimeList] = useState<SingleMeal[]>([{ meal: '', amount: '', allergens: [''] }]);
    const [mealDate, setMealDate] = useState<Date>(new Date());


    const handleSend = async () => {
        
        let id = `${mealDate.getDate()}${mealDate.getMonth()}${mealDate.getFullYear()}`;
        console.log('after mergE:', mergeMeals());
        await sendMeals(getKindergarden(), mergeMeals(), id);
    }
    const mergeMeals = () => {
        return { breakfast: breakfastList, dinner: dinnerList, teatime: teatimeList };
    }
    useEffect(() => {
        const fetchData = async () => {
            let isAdded = false;
            const data = await getMeals(getKindergarden());
            let id = `${mealDate.getDate()}${mealDate.getMonth()}${mealDate.getFullYear()}`;
            data.map(item => {
                if (item.id === id) {
                    setBreakfastList(item.breakfast);
                    setDinnerList(item.dinner);
                    setTeatimeList(item.teatime);
                    isAdded = true;
                }
            })
            if (isAdded === false) {
                setBreakfastList([{ meal: '', amount: '', allergens: [''] }]);
                setDinnerList([{ meal: '', amount: '', allergens: [''] }]);
                setTeatimeList([{ meal: '', amount: '', allergens: [''] }]);
            }
        }
        fetchData();
        console.log('date')
    }, [mealDate])


    return (
        <Wrapper>
            <input type='date' onChange={e => {
                setMealDate(e.target.valueAsDate!);
            }} />
            <AddMeal mealList={breakfastList} setMeal={setBreakfastList} label='Śniadanie' />

            <AddMeal mealList={dinnerList} setMeal={setDinnerList} label='Obiad' />

            <AddMeal mealList={teatimeList} setMeal={setTeatimeList} label='Podwieczorek' />

            <SubmitButton onClick={() => handleSend()} >Prześlij</SubmitButton>

        </Wrapper>
    )
}
