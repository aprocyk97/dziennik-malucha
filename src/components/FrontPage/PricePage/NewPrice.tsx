import {FC, PureComponent } from 'react';
import styled from 'styled-components';

import people from '../../../media/icons/people.png';

const Wrapper = styled.div`
    border: 1px solid black;
    background: lightyellow;
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 40px;
    padding-left: 40px;
    border-radius: 10px; 
    width: 250px; 
    float : left;
    margin: 15px;

`;
const B = styled.div`
    font-weight: 700;
`;
const Logo = styled.img`
   
`;

interface FeeProps extends React.HTMLProps<HTMLDivElement>{
    name: string;
    priceValue: number;
    pricePeriod: string;
    additionalInfo: string;
    isAdmin: boolean;
    id: string;
    onDelete: (id: string) => void;
 };

 const trasformPeriod = (pricePeriod: string) => {
    switch(pricePeriod) {
     case 'monthly':
            return 'miesięcznie';
        case 'yearly':
            return 'rocznie';
    }
 }


export const NewPrice = (props: FeeProps) => {

    return(
        <Wrapper>
            <B>Pakiet:</B> {props.name}
            <B>Cena:</B> {props.priceValue}zł/{trasformPeriod(props.pricePeriod)} <br></br><br></br>
            <B>Informacje:</B> {props.additionalInfo}<br></br><br></br>
            {props.isAdmin && <button onClick={e => props.onDelete(props.id)}>🗑</button>}
        </Wrapper>
    );

};