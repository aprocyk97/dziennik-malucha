import React, { FC } from 'react';
import styled from 'styled-components';

import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';
import  banner from '../../../media/banner.jpg'

const ButtonWrapper = styled.div`

    width: 100%;
    height: 75px;

    margin: 0;

    display: flex;
    justify-content: space-around;

    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    /* background-color: ${Colors.basicGreen}; */

`;

const Button = styled.div`

    height: auto;
    width: 10%;

    /* margin: 0 50px; */

    display: flex;
    justify-content: center;
    align-items: center;
    

    font-size: ${fontSize[20]};

    transition: all .2s linear;
    &:hover{
        
        background-color: rgba(146, 204, 148, 0.993);
    }

`;

const NavBarWrapper = styled.div`
    width: 100%;

    background-color: ${Colors.basicGreen};
`;

const Logo = styled.img`
    max-width: 100%;
    height: auto;
    margin: 0;
`;



export const TopNavBar: FC = () => {

    return(
        <NavBarWrapper>
            <Logo src={banner}/>
            <ButtonWrapper>
                <Button>Strona Główna</Button>
                <Button>Cennik</Button>
                <Button>O nas</Button>
                <Button>Kontakt</Button>
                <Button>Logowanie</Button>
            </ButtonWrapper>
        </NavBarWrapper>
        
    );

};