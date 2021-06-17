import React, {FC, useRef, useState} from 'react'
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
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

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const surnameRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    let match = useRouteMatch('/dziennik-malucha');
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
                email: emailRef.current?.value,
                kindergardens: []
            });

            history.push(`${match!.path}/profile`);

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
                <p>Masz już konto? <Link to={`${match?.url}/login`}>Zaloguj się</Link></p>
            </AdditionalLinks>
        </Wrapper>
        </div>
    )
}


