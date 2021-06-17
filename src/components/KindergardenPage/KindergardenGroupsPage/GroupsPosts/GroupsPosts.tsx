import React, { FC, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router';
import styled from 'styled-components';
import { useKindergarden } from '../../../../context/KindergardenContext';
import { DummySinglePost } from './DummySinglePost';

const Wrapper = styled.div`
    width: 70%;
    margin: 1vh 15%;
    

    
`;

export const GroupsPosts: FC = () => {

    const [postPath, setPostPath] = useState<string>(`post`);

    const {getKindergardenGroup, getKindergarden } = useKindergarden();

    let match = useRouteMatch(`/${getKindergarden()}/${getKindergardenGroup()}/aktualnosci`);

    return (
        <Wrapper>
            {/* <SinglePost fullPost={false} /> */}
            
            <Switch>
                <Route exact path={`${match?.path}`}>
                    <DummySinglePost fullPost={false} setPostPath={setPostPath} />
                    <DummySinglePost fullPost={false} setPostPath={setPostPath} />
                    <DummySinglePost fullPost={false} setPostPath={setPostPath} />
                    <DummySinglePost fullPost={false} setPostPath={setPostPath} />
                </Route>
                <Route path={`${match?.path}/${postPath}`}>
                    <DummySinglePost fullPost={true} setPostPath={setPostPath} />
                </Route>
            </Switch>
        </Wrapper>
    )
}
