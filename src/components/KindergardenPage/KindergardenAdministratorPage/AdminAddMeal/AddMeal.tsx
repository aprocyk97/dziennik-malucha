import React, { FC } from 'react';
import styled from 'styled-components';
import { fontSize } from '../../../../styledHelpers/FontSizes';
import { SingleMeal } from './AdminAddMeal';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MealWrapper = styled.div`
    margin: 3vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    
    border-bottom: 1px solid black;

    &:last-child{
        border-bottom: none;
    }
`;
const InputBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2vh 2vw;
`;
const MealInputBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

   
`;
const StyledInput = styled.input`
    margin: 1vh 2vw;
    width: 12vw;
    height: 3vh;

    font-size:${fontSize[18]};
`;
const AllergenBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const AllergenWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const ButtonBox = styled.div`

`;
const AddButton = styled.button`
    border-radius: 50%;
`;
const RemoveButton = styled.button`

`;
const IconButton = styled(FontAwesomeIcon)`
    padding: 0.3vh 0.3vw;
    border-radius: 50%;
    border: 2px solid darkgray;
    margin: 0 0.3vw;
`;
const MealLabel = styled.div`
    font-size:${fontSize[22]};
    text-align: center;
    margin: 1vh 40%;
    font-family: Roboto;
    font-weight: bold;
`;

interface IAddMeal {
    mealList: SingleMeal[];
    setMeal: any;
    label: string;
}

export const AddMeal: FC<IAddMeal> = (props) => {

    library.add(fas);

    const handleInputChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const list = [...props.mealList];
        list[index][name] = value;
        props.setMeal(list);
    }
    const handleAllergenChange = (e: any, listIndex: number, allergenIndex: number) => {
        const { value } = e.target;
        const list = [...props.mealList];
        list[listIndex].allergens[allergenIndex] = value;
        props.setMeal(list);
    }

    const handleInputRemove = (index: number) => {
        const list = [...props.mealList];
        list.splice(index, 1);
        props.setMeal(list);
    }
    const handleAllergenRemove = (listIndex: number, allergenIndex: number) => {
        const list = [...props.mealList];
        list[listIndex].allergens.splice(allergenIndex, 1);
        props.setMeal(list);
    }

    const handleInputAdd = () => {
        props.setMeal([...props.mealList, { meal: '', amount: '', allergens: [''] }]);
    }
    const handleAllergenAdd = (listIndex: number) => {
        const list = [...props.mealList];
        list[listIndex].allergens.push('');
        props.setMeal(list);
    }


    return (
        <MealWrapper>
            <MealLabel>{props.label}</MealLabel>
            {
                props.mealList.map((lvalue, lindex) => {
                    return (
                        <InputBox>
                            <MealInputBox>
                                <ButtonBox>
                                    {
                                        props.mealList.length !== 1 &&
                                        <IconButton icon='minus' size='lg' color='gray' onClick={() => handleInputRemove(lindex)} />
                                    }
                                    {
                                        props.mealList.length - 1 === lindex &&
                                        <IconButton icon='plus' size='lg' color='gray' onClick={handleInputAdd} />
                                    }

                                </ButtonBox>

                                <StyledInput
                                    name='meal'
                                    placeholder='Nazwa posiłku'
                                    value={lvalue.meal}
                                    onChange={e => handleInputChange(e, lindex)}
                                />

                                <StyledInput
                                    name='amount'
                                    placeholder='Ilość posiłku'
                                    value={lvalue.amount}
                                    onChange={e => handleInputChange(e, lindex)}
                                />
                            </MealInputBox>

                            <AllergenBox>
                                {
                                    props.mealList[lindex].allergens.map((avalue, aindex) => {
                                        return (
                                            <AllergenWrapper>
                                                <StyledInput
                                                    name='allergens'
                                                    placeholder='Alergen'
                                                    value={avalue}
                                                    onChange={e => handleAllergenChange(e, lindex, aindex)}
                                                />
                                                <ButtonBox>
                                                    {
                                                        props.mealList[lindex].allergens.length !== 1 &&
                                                        <IconButton icon='minus' size='lg' color='gray' onClick={() => handleAllergenRemove(lindex, aindex)}/>
                                                    }
                                                    {
                                                        props.mealList[lindex].allergens.length - 1 === aindex &&
                                                        <IconButton icon='plus' size='lg' color='gray' onClick={() => handleAllergenAdd(lindex)} />
                                                    }
                                                </ButtonBox>
                                            </AllergenWrapper>
                                        )
                                    })
                                }
                            </AllergenBox>

                        </InputBox>
                    )
                })

            }
        </MealWrapper>
    )
}
