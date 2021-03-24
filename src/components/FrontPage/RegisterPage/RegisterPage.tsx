import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';

import {useAuth} from '../../../context/AuthContext';

import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';


const Wrapper = styled.div`
    border: 3px solid ${Colors.borderGreen};
    border-radius: 25px;
    margin: 15vh 33.3vw;
    width:33.3vw;
    min-width: 300px;
    background-color: #FFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    
`;
const Form = styled.form`
    

    display: flex;
    flex-direction: column;
    
    align-items: center;
    margin: 1vh 0 1vh;
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

export const RegisterPage:FC = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const confirmPasswordRef = useRef<HTMLInputElement>();
    const history = useHistory();

    const  {signup, currentUser}  = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value){
            return setError('Hasła się nie zgadzają');
        }

        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current?.value, passwordRef.current?.value);
        }catch{
            setError('Pojawił się problem z utworzeniem konta')
        }
        setLoading(false);

        
    }
    

    return (

        <Wrapper>

            {error && <div>{error}</div>}
            {currentUser && currentUser.email}
            <LoginText>Rejestracja</LoginText>

            <Form onSubmit={handleSubmit}>
                <LoginInputLabel>
                    Email
                    <LoginInput type="email" ref={emailRef} required />
                </LoginInputLabel>

                <LoginInputLabel>
                    Hasło
                    <LoginInput type="password" ref={passwordRef} required />
                </LoginInputLabel>

                <LoginInputLabel>
                    Powtórz hasło
                    <LoginInput type="password" ref={confirmPasswordRef} required />
                </LoginInputLabel>

                <LoginButton disabled={loading} type="submit">Zarejestruj</LoginButton>
            </Form>

            <div>Masz już konto? <Link to="/login">Zaloguj się</Link></div>
        </Wrapper>

    )
}


