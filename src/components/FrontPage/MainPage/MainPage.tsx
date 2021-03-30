import React from 'react';
import {FC} from 'react';

import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';

import {SingleNews} from './SingleNews';


export const MainPage: FC = () => {

    return(
    <Wrapper>
        <Contener>
            <SingleNews />
            <SingleNews />
            <SingleNews />
            <SingleNews />
            <SingleNews />
            <SingleNews />
            <SingleNews />
            <SingleNews />
        </Contener>
    </Wrapper>
    );

};