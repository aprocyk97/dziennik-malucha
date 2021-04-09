import React, { FC } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";



import { TopNavBar } from './TopNavBar/TopNavBar';
import { MainPage } from './MainPage/MainPage';
import { PricePage } from './PricePage/PricePage';
import { AboutPage } from './AboutPage/AboutPage';
import { ContactPage } from './ContactPage/ContactPage';
import { RightNavBar } from '../AppPage/RightNavBar/RightNavBar';
import { LoginPage } from './LoginPage/LoginPage'
import { RegisterPage } from './RegisterPage/RegisterPage';
import { UserProfile } from './UserProfile/UserProfile';
import { ForgotPasswordPage } from './ForgotPasswordPage/ForgotPasswordPage';

import { PrivateRoute } from '../../tools/PrivateRoute';
import { LoggedRoute } from '../../tools/LoggedRoute';



const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const StickyWrapper = styled.div`
    /* align-self: flex-start; */
    position: sticky;
`;


export const FrontPage: FC = () => {

    let match = useRouteMatch();

    return (

    
            
            <Wrapper>
                <TopNavBar />
                <Switch>
                    
                    <Route path={`${match.path}/home`}>
                        <MainPage />
                    </Route>
                    <Route path={`${match.path}/price`}>
                        <PricePage />
                    </Route>
                    <Route path={`${match.path}/aboutas`}>
                        <AboutPage />
                    </Route>
                    <Route path={`${match.path}/contact`}>
                        <ContactPage />
                    </Route>
                    <Route path={`${match.path}/aaa`}>
                        <RightNavBar />
                    </Route>

                    <LoggedRoute
                        path={`${match.path}/login`}
                        component={LoginPage}
                    />

                    <Route
                        path={`${match.path}/register`}
                        component={RegisterPage}
                    />

                    <PrivateRoute
                        path={`${match.path}/profile`}
                        component={UserProfile}
                    />

                    <Route path={`${match.path}/forgot-password`}>
                        <ForgotPasswordPage />
                    </Route>

                </Switch>
            </Wrapper>




    );

};


