import React, { FC } from 'react'
import styled from 'styled-components'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import { Colors } from '../../../styledHelpers/Colors';
import { useKindergarden } from '../../../context/KindergardenContext';
import { fontSize } from '../../../styledHelpers/FontSizes';


const NavWrapper = styled.div`
    
    min-height: 100vh;
    width: 20vw;
    background-color: ${Colors.borderGreen};
    display: flex;
    flex-direction: column;

    box-shadow: 1px 0 2px 2px rgba(0, 0, 0, 0.3);
`;
const NavButton = styled(Link)`

    color: white;
    font-size: ${fontSize[22]};
    font-weight: bold;

    width: 99,5%;
    height: 10vh;

    

    display: flex;
    justify-content: center;
    align-items: center;
    
    text-decoration: none;
    
    border-bottom: 2px solid ${Colors.basicGreen};
    border-right: none;

    p{
        
        
    }
    
`;

export const LeftNav: FC = () => {

    const {getKindergarden} = useKindergarden();

    let match = useRouteMatch(`/${getKindergarden()}`);

    return (
        <NavWrapper>
            <NavButton to={`${match!.url}/strona-glowna`}> Strona Główna </NavButton>
            <NavButton to={`${match!.url}/aktualnosci`}> Aktualności </NavButton>
            <NavButton to={`${match!.url}/jadlospis`}> Jadłospis </NavButton>
            <NavButton to={`${match!.url}/grupy`}> Grupy </NavButton>
            <NavButton to={`${match!.url}/admin`}> Panel Administratora </NavButton>
           
            <NavButton to={`/`}>  Powrót </NavButton>
        </NavWrapper>
    )
}
