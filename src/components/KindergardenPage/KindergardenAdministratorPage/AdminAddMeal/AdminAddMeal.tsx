import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { AddMeal } from './AddMeal';

const Wrapper = styled.div`

`;

const MealWrapper = styled.div`

`;
const InputBox = styled.div`

`;
const AllergenBox = styled.div`

`;
const StyledInput = styled.input`

`;
const ButtonBox = styled.div`

`;
const AddButton = styled.button`

`;
const RemoveButton = styled.button`

`;

export type SingleMeal = {
    meal: string;
    amount: string;
    allergens: string[];
}

export const AdminAddMeal: FC = () => {

    const [breakfastList, setBreakfastList] = useState<SingleMeal[]>([{ meal: '', amount: '', allergens: [''] }]);
    const [dinnerList, setDinnerList] = useState<SingleMeal[]>([{ meal: '', amount: '', allergens: [''] }]);
    const [teatimeList, setTeatimeList] = useState<SingleMeal[]>([{ meal: '', amount: '', allergens: [''] }]);
    

    return (
        <Wrapper>
            <AddMeal mealList={breakfastList} setMeal={setBreakfastList} label='Śniadanie' />
            <div>{JSON.stringify(breakfastList)}</div>
            <AddMeal mealList={dinnerList} setMeal={setDinnerList} label='Obiad' />
            <div>{JSON.stringify(dinnerList)}</div>
            <AddMeal mealList={teatimeList} setMeal={setTeatimeList} label='Podwieczorek' />
            <div>{JSON.stringify(teatimeList)}</div>
        </Wrapper>
    )
}
