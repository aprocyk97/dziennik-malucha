import React, { FC, PureComponent } from 'react';
import styled from 'styled-components';

import {Wrapper} from '../../../styledHelpers/Components';
import logout from '../../../media/icons/logout.png';

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
const Button = styled.img`
    //margin-left: auto;
    margin-right: 5px;
    img
    {
        margin: 0 0.5vw;
    }
`;


interface PrimitiveProps extends React.HTMLProps<HTMLDivElement>{
    text: string;
 };

export const SingleNews = (props: PrimitiveProps) => {
    return(
        <div>
            <Ul>
                {props.text}
                <Button alt="logout" src={logout} />
            </Ul>
            
            <br></br>
        </div>
    )
}