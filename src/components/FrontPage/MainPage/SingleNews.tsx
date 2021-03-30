import React, { FC } from 'react';
import styled from 'styled-components';

import {Wrapper} from '../../../styledHelpers/Components';

const Ul = styled.div`
    border: 1px solid lightblue;
    background: lightblue;
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 5px;
`;

export const SingleNews: FC = () => {
    return(
        <div>
            <Ul>Witam bardzo serdecznie</Ul>
            <br></br>
        </div>
    )
}