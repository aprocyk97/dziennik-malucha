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

interface PrimitiveProps extends React.HTMLProps<HTMLDivElement>{
    text: string;
 };


export const SimpleInformation = (props: PrimitiveProps) => {

    return(
        <Wrapper>
            <Logo src={people}/>
            {props.text}
        </Wrapper>
    );

};