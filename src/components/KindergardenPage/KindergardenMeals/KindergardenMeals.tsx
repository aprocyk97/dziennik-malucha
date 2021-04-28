import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMeals, IDayMeals } from '../../../action/fetchKindergarden';
import { useKindergarden } from '../../../context/KindergardenContext';
import { DayDrodown } from './DayDrodown';



const Wrapper = styled.div`
    min-height: 100vh;
    width: 70vw;
    margin: 10vh 5vw;
`;


export const KindergardenMeals: FC = () => {


    const { getKindergarden } = useKindergarden();
    const [meals, setMeals] = useState<IDayMeals[]>();
    

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMeals(getKindergarden());
            setMeals(data);
        }
        fetchData();
    }, [])

    return (
        <Wrapper>

            {console.log(meals)}
            {
            meals?.map(item => {
                return <DayDrodown data={item} />
            })}

        </Wrapper>
    )
}
