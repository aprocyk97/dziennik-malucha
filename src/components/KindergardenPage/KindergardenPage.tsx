import React, { FC, useEffect, useState } from 'react'
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
import { KindergardenMeals } from './KindergardenMeals/KindergardenMeals';
import { isAdmin, issAdmin } from '../../action/fetchKindergarden';
import { KindergardenAdminRoute } from '../common/KindergardenAdminRoute';


const Wrapper = styled.div`
    display: flex;
    background-color: ${Colors.basicGray};
`;

export const KindergardenPage: FC = () => {

    const { getKindergarden, getKindergardenUser, setIsAdmin } = useKindergarden();
    let match = useRouteMatch(`/${getKindergarden()}`);

    const [isUserAdmin, setIsUserAdmin] = useState<boolean>();

    //TODO: FETCH USER POWER, WYSWIETL DANE ZGODNIE Z MOCA UZYTKOWNIKA
    useEffect(() => {
        issAdmin(getKindergardenUser(), getKindergarden())
            .then(result => {
                setIsUserAdmin(result);
                
            })
    }, [])

    return (
        <Wrapper>

            <LeftNav />

            <Switch>
                <Route exact path={`${match!.path}/strona-glowna`}>
                    <KindergardenHomePage />
                </Route>
                <Route path={`${match!.path}/aktualnosci`}>
                    <KindergardenFeed />
                </Route>
                {/* <KindergardenAdminRoute
                    path={`${match!.path}/admin`}
                    component={KindergardenAdministratorPage}
                /> */}
                {
                    isUserAdmin ? 
                    <Route path={`${match!.path}/admin`}>
                        <KindergardenAdministratorPage />
                    </Route>
                    :
                    <Route path={`${match!.path}/admin`}>
                        <Redirect to={`${match!.url}/strona-glowna`} />
                    </Route>
                }
                <Route path={`${match!.path}/jadlospis`}>
                    <KindergardenMeals />
                </Route>
            </Switch>
        </Wrapper>
    )
}
