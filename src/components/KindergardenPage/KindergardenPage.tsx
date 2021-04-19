import React, { FC, useEffect } from 'react'
import { useKindergarden } from '../../context/KindergardenContext'
import styled from 'styled-components';
import { LeftNav } from './LeftNav/LeftNav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import { KindergardenHomePage } from './KindergardenHomePage/KindergardenHomePage';
import { KindergardenFeed } from './KindergardenFeed/KindergardenFeed';
import { Colors } from '../../styledHelpers/Colors';
import { KindergardenAdministratorPage } from './KindergardenAdministratorPage/KindergardenAdministratorPage';


const Wrapper = styled.div`
    display: flex;
    background-color: ${Colors.basicGray};
`;

export const KindergardenPage : FC = () => {

    const {getKindergarden} = useKindergarden();
    let match = useRouteMatch(`/${getKindergarden()}`);
    
    //TODO: FETCH USER POWER, WYSWIETL DANE ZGODNIE Z MOCA UZYTKOWNIKA

    return (
        <Wrapper>
            
            <LeftNav/>
            <Switch>
                <Route exact path={`${match.path}/strona-glowna`}>
                    <KindergardenHomePage />
                </Route>
                <Route path={`${match.path}/aktualnosci`}>
                    <KindergardenFeed/>
                </Route>
                <Route path ={`${match.path}/admin`}>
                    <KindergardenAdministratorPage />
                </Route>
            </Switch>
        </Wrapper>
    )
}
