import {FC, PureComponent } from 'react';
import styled from 'styled-components';

import people from '../../../media/icons/people.png';


interface PrimitiveProps extends React.HTMLProps<HTMLDivElement>{
    text: string;
 };


export const SingleInfo = (props: PrimitiveProps) => {

    return(
        <div>
            {props.text}
        </div>
    );

};