import React, {FC, useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {db} from '../../../firebase';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const RegisterPage:FC = () => {

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const nameRef = useRef<HTMLInputElement>();
    const surnameRef = useRef<HTMLInputElement>();
    const confirmPasswordRef = useRef<HTMLInputElement>();
    const history = useHistory();

    const  {signup, currentUser, getUser}  = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value){
            return setError('Hasła się nie zgadzają');
        }

        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current?.value, passwordRef.current?.value);
            await db.collection('users').doc(getUser()).set({
                name: nameRef.current?.value,
                surname: surnameRef.current?.value,
                email: emailRef.current?.value
            });

        }catch{
            setError('Pojawił się problem z utworzeniem konta')
        }
        setLoading(false);

        
    }
    

    return (
        <div>
            {error && 
                <ErrorWrapper>
                    <FontAwesomeIcon icon="exclamation-circle"/>
                    <p>{error}</p>
                </ErrorWrapper>
            }
        <Wrapper>

            
            <LoginText>Rejestracja</LoginText>

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
                    Imię
                    <LoginInput 
                        type="text" 
                        ref={nameRef} 
                        required 
                    />
                </LoginInputLabel>

                <LoginInputLabel>
                    Nazwisko
                    <LoginInput 
                        type="text" 
                        ref={surnameRef} 
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

                <LoginInputLabel>
                    Powtórz hasło
                    <LoginInput 
                        type="password" 
                        ref={confirmPasswordRef} 
                        required 
                    />
                </LoginInputLabel>

                <LoginButton disabled={loading} type="submit">
                    Zarejestruj
                </LoginButton>
            </Form>

            <AdditionalLinks>
                <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
            </AdditionalLinks>
        </Wrapper>
        </div>
    )
}


