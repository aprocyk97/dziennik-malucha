import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import {useAuth} from '../../../context/AuthContext';

import 
{
    Wrapper, 
    Form, 
    LoginInput, 
    LoginInputLabel, 
    LoginText, 
    LoginButton
} from '../../../styledHelpers/LoginFormStyling';



export const LoginPage:FC = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const history = useHistory();
    const {login, getUser} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await login(emailRef.current?.value, passwordRef.current?.value);
            const user = getUser();
            console.log(user);
            
            history.push('/profile');
        }catch{
            setError('Pojawił się błąd podczas logowania');    
        }
        setLoading(false);
        
        
    }
    

    return (

        <Wrapper>
            {error && <div>{error}</div>}

            <LoginText>Logowanie</LoginText>

            <Form onSubmit={handleSubmit}>
                
                <LoginInputLabel>

                    Email
                    <LoginInput 
                        type="email" 
                        ref={emailRef} 
                        required 
                    />

                </LoginInputLabel>

                <LoginInputLabel>

                    Hasło
                    <LoginInput 
                        type="password" 
                        ref={passwordRef} 
                        required 
                    />

                </LoginInputLabel>

                <LoginButton 
                    disabled={loading} 
                    type="submit"
                >
                    Zaloguj
                </LoginButton>
                
            </Form>
            <div>
                Zapomniałeś hasła? <Link to="/forgot-password">Kliknij</Link>

                Nie masz konta? <Link to="/register">Zarejestruj się</Link>
            </div>
        </Wrapper>

    )
}
