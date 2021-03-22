import React, { FC } from 'react';
import styled from 'styled-components';


import { FrontPage } from '../FrontPage/FrontPage';


const Wrapper = styled.div`

`;

export const AppPage: FC = () => {

    return(
        <Wrapper>
            <FrontPage />
        </Wrapper>
    );

};