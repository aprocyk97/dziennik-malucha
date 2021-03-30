import React, { FC } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';

import { User } from '../Common/User';

const RightNavWrapper = styled.div`

    height: 100%;
    height: 30%;
    justify-content: space-around;

    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    /* background-color: ${Colors.basicGreen}; */

    background-color: ${Colors.basicGreen};

`;

const ButtonWrapper = styled.div`
    
    height: 100%;
    height: 25%;
    
`;

const Button = styled(Link)`

    height: 50px;
    width: 150px;

    /* margin: 0 50px; */

    display: flex;
    padding-left: 10px;
    align-items: center;
    text-decoration: none;
    

    font-size: ${fontSize[16]};

    transition: all .2s linear;
    &:hover{
        
        background-color: rgba(146, 204, 148, 0.993);
    }

`;

export const RightNavBar: FC = () => {

    return(
        <RightNavWrapper>
            <ButtonWrapper>
                    <User />
                    <hr></hr>
                    <Button to="/main">Strona Główna</Button><br></br>
                    <Button to ="/receivables">Należności</Button><br></br>
                    <Button to ="/present">Obecności</Button><br></br>
                    <Button to ="/menu">Jadłospis</Button><br></br>
                    <Button to ="/ad">Tablica ogłoszeń</Button><br></br>
                    <Button to ="/gallery">Galeria</Button><br></br><hr></hr>
                    <Button to ="/settings">Ustawienia</Button><br></br>
                    <Button to ="/contact">Kontakt</Button><br></br>
            </ButtonWrapper>
        </RightNavWrapper>

    );

};