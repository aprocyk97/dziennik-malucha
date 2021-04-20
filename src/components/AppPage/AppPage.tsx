import React, { FC } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


import { FrontPage } from '../FrontPage/FrontPage';
import {AuthProvider} from '../../context/AuthContext'
import { UserProvider } from '../../context/UserContext';


const Wrapper = styled.div`
    overflow-x: hidden;
`;

export const AppPage: FC = () => {

    return(
        <AuthProvider>
            <UserProvider>
                <Wrapper>
                    <FrontPage />
                </Wrapper>
            </UserProvider>
        </AuthProvider>
    );

};