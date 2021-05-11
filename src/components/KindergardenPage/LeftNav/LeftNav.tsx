import React, { FC, useEffect, useState } from 'react'
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
import { fetchUserGroups, IKindergardenGroup, isAdmin, issAdmin } from '../../../action/fetchKindergarden';
import { DropdownButton } from './DropdownButton';


const NavWrapper = styled.div`
    
    min-height: 100vh;
    width: 20vw;
    background-color: ${Colors.borderGreen};
    display: flex;
    flex-direction: column;
    z-index: 1;

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
const DropdownNav = styled(DropdownButton)`
    color: white;
    font-size: ${fontSize[22]};
    font-weight: bold;

    width: 99,5%;
    height: auto;
    min-height: 10vh;

    

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    text-decoration: none;
    
    border-bottom: 2px solid ${Colors.basicGreen};
    border-right: none
    
`;



export const LeftNav: FC = () => {

    const {getKindergarden, getKindergardenUser} = useKindergarden();

    let match = useRouteMatch(`/${getKindergarden()}`);
    const [isUserAdmin, setIsUserAdmin] = useState<boolean>();
    const [groups, setGroups] = useState<IKindergardenGroup[]>();

    useEffect(() => {
        issAdmin(getKindergardenUser(), getKindergarden())
            .then(result => {
                setIsUserAdmin(result);
                
            })
        fetchUserGroups(getKindergardenUser(),getKindergarden())
            .then(result => {
                setGroups(result);
            })
    }, [])

    // const groups: IKindergardenGroup[] = [
    //     {name: 'Grupa testowa 1', id: 'testgroup1'},
    //     {name: 'Grupa testowa 2', id: 'testgroup2'},
    //     {name: 'Grupa testowa 3', id: 'testgroup3'},
    // ];

    return (
        <NavWrapper>
            <NavButton to={`${match!.url}/strona-glowna`}> Strona Główna </NavButton>
            <NavButton to={`${match!.url}/aktualnosci`}> Aktualności </NavButton>
            <NavButton to={`${match!.url}/jadlospis`}> Jadłospis </NavButton>
            <DropdownNav label='Grupy' groups={groups} routeMatch={match!.url} />
            {
                isUserAdmin ?
                    <NavButton to={`${match!.url}/admin`}> Panel Administratora </NavButton>
                :
                    null
            }
           
            <NavButton to={`/`}>  Powrót </NavButton>
        </NavWrapper>
    )
}
