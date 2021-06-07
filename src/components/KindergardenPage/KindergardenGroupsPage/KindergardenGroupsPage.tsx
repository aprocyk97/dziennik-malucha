import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import styled from 'styled-components';
import { useKindergarden } from '../../../context/KindergardenContext';
import { GroupsAddPost } from './GroupsAddPost/GroupsAddPost';
import Test from './GroupsAddPost/Test';
import { GroupsNavBar } from './GroupsNavBar';
import { GroupsPosts } from './GroupsPosts/GroupsPosts';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


export const KindergardenGroupsPage: FC = () => {

    const {getKindergarden, getKindergardenGroup } = useKindergarden();

    let match = useRouteMatch(`/${getKindergarden()}/${getKindergardenGroup()}`)

    return (
        <Wrapper>
            <GroupsNavBar />

            <Switch>
                <Route path={`${match!.path}/aktualnosci`}>
                    <GroupsPosts />
                </Route>
                <Route path={`${match!.path}/dodaj-aktualnosci`}>
                    <Test />
                    
                </Route>
            </Switch>
            
        </Wrapper>
    )
}
