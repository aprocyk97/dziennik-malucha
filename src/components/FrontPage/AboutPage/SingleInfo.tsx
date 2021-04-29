import {FC, PureComponent } from 'react';
import styled from 'styled-components';

import people from '../../../media/icons/people.png';


interface PrimitiveProps extends React.HTMLProps<HTMLDivElement>{
    text: string;
 };

 const DIV = styled.div`
    padding-top: 8px;
    text-indent: 1.5em;
    font-size: 20px;
 `;


export const SingleInfo = (props: PrimitiveProps) => {

    return(
        <DIV>
            {props.text}
        </DIV>
    );

};