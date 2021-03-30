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
import { CennikPage } from './CennikPage/CennikPage'
import {LoginPage} from './LoginPage/LoginPage'
import { RegisterPage } from './RegisterPage/RegisterPage';
import { UserProfile } from './UserProfile/UserProfile';
import { ForgotPasswordPage } from './ForgotPasswordPage/ForgotPasswordPage';

import {PrivateRoute} from '../../tools/PrivateRoute';
import {LoggedRoute} from '../../tools/LoggedRoute';



const Wrapper = styled.div`

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

                        <Route path="/cennik">
                            <CennikPage />
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