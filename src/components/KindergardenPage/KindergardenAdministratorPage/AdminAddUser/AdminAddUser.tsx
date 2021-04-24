import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { addKindergardenUser } from '../../../../action/fetchKindergarden';
import { useAuth } from '../../../../context/AuthContext';
import { useKindergarden } from '../../../../context/KindergardenContext';

const Wrapper = styled.div`
    width: 100%;

    background-color: rgba(0, 0, 0, 0.05);

    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
const StyledForm = styled.form`

`;
const StyledTextInput = styled.input`

`;
const StyledSubmit = styled.input`

`;
const StyledLabel = styled.label`

`;
const StyledSelect = styled.select`

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
    const { getKindergarden } = useKindergarden();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addKindergardenUser(email!, userPower!, getKindergarden() );



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
                        E-mail:
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
                <StyledSubmit type="submit" />
            </StyledForm>

        </Wrapper>
    )
}
