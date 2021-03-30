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


const Wrapper = styled.div`
    overflow-x: hidden;
`;

export const AppPage: FC = () => {

    return(
        <AuthProvider>
            <Wrapper>
                <FrontPage />
            </Wrapper>

        </AuthProvider>
    );

};