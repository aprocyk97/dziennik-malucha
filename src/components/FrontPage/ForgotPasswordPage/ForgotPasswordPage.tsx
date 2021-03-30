import React, {FC, useRef, useState} from 'react'


import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';

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

export const ForgotPasswordPage: FC = () => {

    const emailRef = useRef<HTMLInputElement>();

    const [loading, setLoading] = useState<Boolean>();
    const [error, setError] = useState<string>();

    const {forgotPassword} = useAuth();


    async function handleSubmit(e:Event){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await forgotPassword(emailRef.current?.value);
        }catch{
            setError('Pojawił się błąd podczas resetowania hasła');
        }
        setLoading(false);
    }
    

    return (
        <Wrapper>
            {error && <div>{error}</div>}
            <LoginText>Przypomnij hasło</LoginText>

            <Form onSubmit={handleSubmit}>
                <LoginInputLabel>

                    Email
                    <LoginInput 
                        type="email" 
                        ref={emailRef} 
                        required 
                    />
                    
                </LoginInputLabel>

                <LoginButton disabled={loading} type="submit">
                    Przypomnij
                </LoginButton>
            </Form>

        </Wrapper>
    )
}


