import React, { FC } from 'react';
import styled from 'styled-components';
import { SingleMeal } from './AdminAddMeal';

const MealWrapper = styled.div`

`;
const InputBox = styled.div`

`;
const StyledInput = styled.input`

`;
const AllergenBox = styled.div`

`;
const ButtonBox = styled.div`

`;
const AddButton = styled.button`

`;
const RemoveButton = styled.button`

`;
const MealLabel = styled.div`

`;

interface IAddMeal {
    mealList: SingleMeal[];
    setMeal: any;
    label: string;
}

export const AddMeal: FC<IAddMeal> = (props) => {

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

                            <AllergenBox>
                                {
                                    props.mealList[lindex].allergens.map((avalue, aindex) => {
                                        return (
                                            <>
                                                <StyledInput
                                                    name='allergens'
                                                    placeholder='Alergen'
                                                    value={avalue}
                                                    onChange={e => handleAllergenChange(e, lindex, aindex)}
                                                />
                                                <ButtonBox>
                                                    {
                                                        props.mealList[lindex].allergens.length !== 1 && 
                                                        <RemoveButton onClick={() => handleAllergenRemove(lindex, aindex)}>Usuń</RemoveButton>
                                                    }
                                                    {
                                                        props.mealList[lindex].allergens.length - 1 === aindex && 
                                                        <AddButton onClick={() => handleAllergenAdd(lindex)}>Dodaj</AddButton>
                                                    }
                                                </ButtonBox>
                                            </>
                                        )
                                    })
                                }
                            </AllergenBox>
                            <ButtonBox>
                                {
                                    props.mealList.length !== 1 && 
                                    <RemoveButton onClick={() => handleInputRemove(lindex)}>Remove</RemoveButton>
                                }
                                {
                                    props.mealList.length - 1 === lindex && 
                                    <AddButton onClick={handleInputAdd}>Dodaj</AddButton>
                                }
                            </ButtonBox>
                        </InputBox>
                    )
                })

            }
        </MealWrapper>
    )
}
