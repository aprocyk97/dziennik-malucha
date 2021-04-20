import {FC, PureComponent } from 'react';
import styled from 'styled-components';

import people from '../../../media/icons/people.png';

const Wrapper = styled.div`
border: 1px solid black;
background: lightgray;
font-size: 20px;
padding-top: 20px;
padding-bottom: 20px;
padding-right: 40px;
padding-left: 40px;
border-radius: 10px;  
`;
const Logo = styled.img`
   
`;

interface FeeProps extends React.HTMLProps<HTMLDivElement>{
    name: string;
    priceValue: number;
    pricePeriod: string;
    additionalInfo: string;
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
            Pakiet: {props.name}<br></br>
            Cena: {props.priceValue}zł/{trasformPeriod(props.pricePeriod)} <br></br>
            Informacje: {props.additionalInfo}<br></br>
        </Wrapper>
    );

};