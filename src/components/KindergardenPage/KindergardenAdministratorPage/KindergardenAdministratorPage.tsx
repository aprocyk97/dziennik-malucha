import React, {FC} from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import { useKindergarden } from '../../../context/KindergardenContext';
import { fontSize } from '../../../styledHelpers/FontSizes';
import { AdminFeed } from './AdminFeed/AdminFeed';
import { AdminUsersList } from './AdminUsersList/AdminUsersList';


const Wrapper = styled.div`
    width: 100%;
    margin: 0 5vw;
    max-width: 70vw;
`;


const AdminNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;

    margin: 5vh 0;
    border-bottom: 1px gray solid;
    

    
    
`;
const NavButton = styled(Link)`

    text-decoration: none;
    font-size: ${fontSize[20]};
    color: darkslategray;

    margin: 0 1vw 0 0;
    padding: 0 1vw 0.3vh 0;
    

    border-right: 1px solid gray;

    &:last-child{
        border:none;
        padding-right: 0;
    }
`;


const AdminContent = styled.div`

`;

export const KindergardenAdministratorPage: FC = () => {


    const {getKindergarden} = useKindergarden();
    let match = useRouteMatch(`/${getKindergarden()}/admin`);

    return (
        <Wrapper>
            
            <AdminNav>
                <NavButton to={`${match!.url}/add-feed`}> Dodaj Aktualności </NavButton>
                <NavButton to={`${match!.url}/edit-meals`}> Edytuj Jadłospis </NavButton>
                <NavButton to={`${match!.url}/add-user`}> Dodaj użytkownika </NavButton>
                <NavButton to={`${match!.url}/user-list`}> Lista użytkowników przedszkola </NavButton>
            </AdminNav>
            <AdminContent>
                
                <Switch>
                    <Route path={`${match!.path}/add-feed`}>
                        <AdminFeed />
                    </Route>
                    <Route path={`${match!.path}/user-list`}>
                        <AdminUsersList />
                    </Route>
                </Switch>
            </AdminContent>
        </Wrapper>
    )
}
