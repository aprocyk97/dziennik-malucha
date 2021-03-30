import React, { FC } from 'react';
import styled from 'styled-components';

import { useState } from 'react';

import people from '../../../media/icons/people.png'
import search from '../../../media/icons/search.png'

import {ExpandedMenu} from './ExpandedMenu';

const Wrapper = styled.div`

`;


const InputWrapper = styled.div`

`;

export const User: FC = () => {

    return(
        <Wrapper>
                <img src={people} alt="peolpe"/>
                imię i Nazwisko 
                <InputWrapper>
                    <input type="text" />

                </InputWrapper>
        </Wrapper>
    );
};