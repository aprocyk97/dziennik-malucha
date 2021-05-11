import React, { FC } from 'react';
import styled from 'styled-components';
import { useKindergarden } from '../../../context/KindergardenContext';
import { GroupsNavBar } from './GroupsNavBar';

const Wrapper = styled.div`

`;

export const KindergardenGroupsPage: FC = () => {

    const {getKindergardenGroup } = useKindergarden();

    return (
        <Wrapper>
            <GroupsNavBar />
            
        </Wrapper>
    )
}
