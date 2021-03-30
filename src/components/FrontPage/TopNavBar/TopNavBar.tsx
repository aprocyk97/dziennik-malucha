import React, { FC } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {useAuth} from '../../../context/AuthContext';


import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';
import  banner from '../../../media/banner.jpg';

const ButtonWrapper = styled.div`

    
    width: 100%;
    height: 75px;

    

    display: flex;
    justify-content: space-around;
    

    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    /* background-color: ${Colors.basicGreen}; */

    

`;

const Button = styled(Link)`

    height: auto;
    width: 10%;
    color: #000;

    /* margin: 0 50px; */

    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    

    font-size: ${fontSize[20]};

    transition: all .2s linear;
    &:hover{
        text-decoration: none;
        background-color: rgba(146, 204, 148, 0.993);
    }
    &:last-child:hover{
        background-color: transparent;
        
    }
    &:last-child{
        
    }
    

`;

const NavBarWrapper = styled.div`
    width: 100%;
    

    background-color: ${Colors.basicGreen};
`;

const Logo = styled.img`
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0;
    
`;



export const TopNavBar: FC = () => {
    const {currentUser} = useAuth();

    library.add(fas);

    return(
        
        <NavBarWrapper>
            <Logo src={banner}/>
            <ButtonWrapper>
                
                    <Button to="/">Strona Główna</Button>
                    <Button to ="/price">Cennik</Button>
                    <Button to ="/aboutas">O nas</Button>
                    <Button to ="/contact">Kontakt</Button>
                    {currentUser === null ?
                     <Button to="/login"><FontAwesomeIcon icon="sign-in-alt" /></Button> :
                     <Button to="/profile"><FontAwesomeIcon icon="user" /></Button>
                    }
                    {console.log(currentUser)}
                
            </ButtonWrapper>
            
        </NavBarWrapper>
        
    );

};