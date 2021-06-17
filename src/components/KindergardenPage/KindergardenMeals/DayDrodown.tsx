import React, { FC, useState } from 'react'
import styled from 'styled-components';
import useDropdown from 'react-dropdown-hook';
import { IDayMeals } from '../../../action/fetchKindergarden';
import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';

const DropdownWrapper = styled.div`
    margin-bottom: 5vh;
`;
const DropdownBar = styled.div`
    height: 5vh;
    

    background-color: ${Colors.basicGreen};
    color: whitesmoke;
    font-size:${fontSize[20]};
    text-justify: center;
    font-family: 'Roboto', sans-serif;

    display: flex;
    justify-content: center;
    align-items: center;
`;
const DropdownContent = styled.div`

    transition: all 0.5s;
    
    border: 2px solid darkgray;
    border-top: none;

    display: flex;
    flex-direction: column;
`;
const DropdownMealTable = styled.table`
    margin: 2vh 10%;
    width: 80%;

    thead{border: 1px solid ${Colors.basicGreen};}
    th{
        background-color: ${Colors.basicGreen};
        color: whitesmoke;
        column-span: all;
        border: none;
        
        height: 4vh;
        font-family: 'Roboto', sans-serif;
        font-size: ${fontSize[18]};

        text-align: center;
        vertical-align: middle;
        
    }
    tr{
        
        
    }
    td{
        border:1px solid darkgray;
        padding: 1vh 1vw;
        &:first-child{
            width: 50%;
        }
        &:last-child{
            width: 20%
        }
    }
`;

interface IDayDropdown {
    data: IDayMeals;
}

export const DayDrodown: FC<IDayDropdown> = (props) => {

    const dayOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [mealDate, setMealDate] = useState<Date>(new Date(JSON.parse(props.data.date)));

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <DropdownWrapper>
            <DropdownBar onClick={toggleDropdown}>
                
                {`${dayOfWeek[mealDate.getDay()]} - ${mealDate.getDate()} ${mealDate.toLocaleString('pl-PL', { month: 'long' })}`}
                
                
            </DropdownBar>
            {
                dropdownOpen &&
                <DropdownContent>
                    <DropdownMealTable>
                        <thead>
                            <tr>
                                <th colSpan={3}>Śniadanie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.breakfast.map(item => {
                                return (
                                    <tr>
                                        <td>{item.meal}</td>
                                        <td>{item.amount}</td>

                                        <td>
                                            <ul>
                                                {
                                                    item.allergens.map(item => {
                                                        return <li>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </DropdownMealTable>
                    <DropdownMealTable>
                        <thead>
                            <tr>
                                <th colSpan={3}>Obiad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.dinner.map(item => {
                                return (
                                    <tr>
                                        <td>{item.meal}</td>
                                        <td>{item.amount}</td>

                                        <td>
                                            <ul>
                                                {
                                                    item.allergens.map(item => {
                                                        return <li>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </DropdownMealTable>
                    <DropdownMealTable>
                        <thead>
                            <tr>
                                <th colSpan={3}>Podwieczorek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.teatime.map(item => {
                                return (
                                    <tr>
                                        <td>{item.meal}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                            <ul>
                                                {
                                                    item.allergens.map(item => {
                                                        return <li>{item}</li>
                                                    })
                                                }
                                            </ul>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </DropdownMealTable>
                </DropdownContent>

            }
        </DropdownWrapper>
    )
}
