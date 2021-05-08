import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { addKindergardenUser } from '../../../../action/fetchKindergarden';
import { useAuth } from '../../../../context/AuthContext';
import { useKindergarden } from '../../../../context/KindergardenContext';
import { fontSize } from '../../../../styledHelpers/FontSizes';

const Wrapper = styled.div`
    width: 100%;

    /* background-color: rgba(0, 0, 0, 0.05); */

    /* border: 1px solid rgba(0, 0, 0, 0.05); */
    border-radius: 10px 10px 0 0;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
const StyledForm = styled.form`
    display: flex;

    align-items: center;
    justify-content: center;
`;
const StyledTextInput = styled.input`
    height: 2vh;
    width: 12vw;
    margin: 1vh 1vw;
    font-size:${fontSize[16]};
`;
const StyledSubmit = styled.input`
    margin: 1vh 1vw;
`;
const StyledLabel = styled.label`
    display: flex;
    align-items: center;

    p{
        font-size:${fontSize[20]};
        font-family: Roboto;
        margin: 1vh 1vw;
    }
`;
const StyledSelect = styled.select`
    height: 2.5vh;
    width: 6vw;
    font-size:${fontSize[16]};
`;

interface powerOption {
    label: string;
    value: string;
}

const powerOptions: powerOption[] = [
    {
        label: 'Użytkownik',
        value: 'user'
    },
    {
        label: 'Nauczyciel',
        value: 'teacher'
    },
    {
        label: 'Redaktor',
        value: 'redactor'
    },
    {
        label: 'Admin',
        value: 'admin'
    },
]


export const AdminAddUser: FC = () => {

    const [email, setEmail] = useState<string>('');
    const [userPower, setUserPower] = useState<string>('user');
    const { getKindergarden, getKindergardenName } = useKindergarden();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addKindergardenUser(email!, userPower!, getKindergarden(), getKindergardenName() )
            .then(() => {
                setEmail('');
            });



    }
    const handleSelectChange = (e) => {
        setUserPower(e.target.value);
        
    }
    const handleInputChange = (e) => {
        setEmail(e.target.value);
        
    }



    return (
        <Wrapper>
            <StyledForm onSubmit={handleSubmit}>
                <StyledLabel>
                    <p>
                        E-mail
                    </p>
                    <StyledTextInput value={email} type="email" onChange={handleInputChange} required />
                </StyledLabel>
                <StyledSelect value={userPower} onChange={handleSelectChange}>
                    {powerOptions.map(item => {
                        return (
                            <option value= {item.value}>{item.label}</option>
                        )
                    })}
                    
                </StyledSelect>
                <StyledSubmit type="submit" value="Dodaj użytkownika" />
            </StyledForm>

        </Wrapper>
    )
}
