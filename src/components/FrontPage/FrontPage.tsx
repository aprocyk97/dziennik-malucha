import React, { FC } from 'react';
import styled from 'styled-components';

import { TopNavBar } from './TopNavBar/TopNavBar';
import { MainPage } from './MainPage/MainPage';

const Wrapper = styled.div`

`;

export const FrontPage: FC = () => {

    return(
        <Wrapper>
            <TopNavBar />
            <MainPage />
        </Wrapper>
    );

};