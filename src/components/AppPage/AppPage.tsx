import React, { FC } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


import { FrontPage } from '../FrontPage/FrontPage';
import { UserProvider } from '../../context/UserContext';
import { AuthProvider } from '../../context/AuthContext'
import { KindergardenPage } from '../KindergardenPage/KindergardenPage';
import { KindergardenProvider, useKindergarden } from '../../context/KindergardenContext';


const Wrapper = styled.div`
    overflow-x: hidden;
`;

export const AppPage: FC = () => {

    const {getKindergarden} = useKindergarden();

    return (
        <AuthProvider>
            <UserProvider>
                <Wrapper>
                    <Router>
                        <Switch>

                            <Route path="/dziennik-malucha">
                                <FrontPage />
                            </Route>
                            <Route path={`/${getKindergarden()}`}>
                                <KindergardenPage />
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/dziennik-malucha" />
                            </Route>
                        </Switch>
                    </Router>

                </Wrapper>

                </UserProvider>
        </AuthProvider>
    );

};