import React, { FC, PureComponent } from 'react';
import styled from 'styled-components';

import {Wrapper} from '../../../styledHelpers/Components';

const Ul = styled.div`
    border: 1px solid lightblue;
    background: lightblue;
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 5px;
`;

interface PrimitiveProps extends React.HTMLProps<HTMLDivElement>{
    text: string;
 };

export const SingleNews = (props: PrimitiveProps) => {
    return(
        <div>
            <Ul>{props.text}</Ul>
            <br></br>
        </div>
    )
}