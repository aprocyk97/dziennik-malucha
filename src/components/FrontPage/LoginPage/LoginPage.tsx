import React, {FC, useRef} from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import { Colors } from '../../../styledHelpers/Colors'
import { fontSize } from '../../../styledHelpers/FontSizes'

const PageWrapper = styled.div`
    
    background-color: #F7FAF7;
    
`;

const Wrapper = styled.div`
    border: 3px solid ${Colors.borderGreen};
    border-radius: 25px;
    margin: 15vh 33.3vw;
    width:33.3vw;
    min-width: 300px;
    background-color: #FFFF;
    
`;
const Form = styled.form`
    

    display: flex;
    flex-direction: column;
    
    align-items: center;
    margin: 1vh 0 5vh;
`;
const LoginInput = styled.input`
    

    height: 3.5vh;
    width: 400px;
    font-size: ${fontSize[20]};
    border: 1px solid;
    border-radius: 5px;

`;
const LoginInputLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin: 2vh 0;

    font-size: ${fontSize[22]};
`;
const LoginText = styled.div`
    font-size: ${fontSize[24]};
    color: #3f643f;
    text-align: center;
    margin-top: 2vh;
    font-weight: bold;
`;
const LoginButton = styled.button`

    width: 14vw;
    height: 4vh;
    border: 2px solid;
    border-radius: 5px;
    font-weight: bold;
    font-size:${fontSize[20]};
`;



export const LoginPage:FC = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    

    return (

        <Wrapper>
            <LoginText>Logowanie</LoginText>
            <Form>
                <LoginInputLabel>
                    Email
                    <LoginInput type="email" ref={emailRef} required />
                </LoginInputLabel>
                <LoginInputLabel>
                    Hasło
                    <LoginInput type="password" ref={passwordRef} required />
                </LoginInputLabel>
                <LoginButton>Zaloguj</LoginButton>
                

            </Form>
            Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </Wrapper>

    )
}
