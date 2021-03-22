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
                    </Switch>
                </Wrapper>
            </Router>
            
        
    );

};