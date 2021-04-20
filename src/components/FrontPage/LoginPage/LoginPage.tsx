import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {useAuth} from '../../../context/AuthContext';

import 
{
    Wrapper, 
    Form, 
    LoginInput, 
    LoginInputLabel, 
    LoginText, 
    LoginButton,
    AdditionalLinks,
    ErrorWrapper
} from '../../../styledHelpers/LoginFormStyling';



export const LoginPage:FC = () => {

    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const history = useHistory();
    const {login, getUser} = useAuth();

    library.add(fas);

    async function handleSubmit(e: any){
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
        
        <div>
            {error && <ErrorWrapper>
                <FontAwesomeIcon icon="exclamation-circle" size="lg"/>  
                <p>{error}</p>
                </ErrorWrapper>}
        <Wrapper>
            

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
            <AdditionalLinks>
                <p>Zapomniałeś hasła? <Link to="/forgot-password">Kliknij</Link></p>
                <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
            </AdditionalLinks>
        </Wrapper>
        </div>

    )
}
