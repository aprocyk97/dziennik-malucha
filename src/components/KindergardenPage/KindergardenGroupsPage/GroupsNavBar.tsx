import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useKindergarden } from '../../../context/KindergardenContext';
import { Colors } from '../../../styledHelpers/Colors';

const NavWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${Colors.borderGreen};
    min-width: 80vw;
    box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.3);
    justify-content: space-around;

`;
const NavButton = styled(Link)`
    border-left: 1px solid ${Colors.basicGreen};
    border-right: 1px solid ${Colors.basicGreen};
    text-decoration: none;
    padding: 1vh 1vw;

    color: white;
    max-height: 100%;
    cursor: pointer;
    z-index: 2;
`;

export const GroupsNavBar: FC = () => {

    const {getKindergardenGroup, getKindergarden } = useKindergarden();

    let match = useRouteMatch(`/${getKindergarden()}/${getKindergardenGroup()}`);

    return (
        <NavWrapper>
            <NavButton to={`${match!.url}`}>Strona główna</NavButton>
            <NavButton to={`${match!.url}/aktualnosci`}>Aktualności grupy</NavButton>
            <NavButton to={`${match!.url}/obecnosc`}>Lista obecności</NavButton>
            <NavButton to={`${match!.url}/uzytkownicy`}>Lista użytkowników</NavButton>
            <NavButton to={`${match!.url}/dodaj-aktualnosci`}>Dodaj Aktualności</NavButton>


        </NavWrapper>
    )
}
