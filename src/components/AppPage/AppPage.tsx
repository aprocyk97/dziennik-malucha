import React, { FC } from 'react';
import styled from 'styled-components';


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