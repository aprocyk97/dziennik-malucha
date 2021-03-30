import React, { FC } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



import { TopNavBar } from './TopNavBar/TopNavBar';
import { MainPage } from './MainPage/MainPage';
import { PricePage } from './PricePage/PricePage';
import { AboutPage } from './AboutPage/AboutPage';
import { ContactPage } from './ContactPage/ContactPage';
import {RightNavBar} from '../AppPage/RightNavBar/RightNavBar';
import {LoginPage} from './LoginPage/LoginPage'
import { RegisterPage } from './RegisterPage/RegisterPage';
import { UserProfile } from './UserProfile/UserProfile';
import { ForgotPasswordPage } from './ForgotPasswordPage/ForgotPasswordPage';

import {PrivateRoute} from '../../tools/PrivateRoute';
import {LoggedRoute} from '../../tools/LoggedRoute';



const Wrapper = styled.div`
    height: 100%;
`;


export const FrontPage: FC = () => {

    return(
        
            <Router>
                <Wrapper>
                    <TopNavBar />
                    <Switch>

                        <Route exact path="/">
                            <MainPage />
                        </Route>
                        <Route path="/price">
                            <PricePage />
                        </Route>
                        <Route path="/aboutas">
                            <AboutPage />
                        </Route>
                        <Route path="/contact">
                            <ContactPage />
                        </Route>
                        <Route path="/aaa">
                            <RightNavBar />
                        </Route>

                        <LoggedRoute 
                            path="/login" 
                            component={LoginPage} 
                        />

                        <Route 
                            path="/register" 
                            component={RegisterPage} 
                        />

                        <PrivateRoute 
                            path="/profile" 
                            component={UserProfile} 
                        />
                        
                        <Route path="/forgot-password">
                            <ForgotPasswordPage />
                        </Route>

                    </Switch>
                </Wrapper>
            </Router>
            
        
    );

};