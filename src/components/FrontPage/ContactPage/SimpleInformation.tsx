import {FC, PureComponent } from 'react';
import styled from 'styled-components';

import people from '../../../media/icons/people.png';

const Wrapper = styled.div`
    border: 1px solid lightgray;
    background: lightgray;
    box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.2);
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 40px;
    padding-right: 100px;
    padding-left: 100px;
    border-radius: 10px;  
    margin-bottom: 15px;
    margin-top: 20px;
`;
const Name = styled.div`
    display: flex;
    float: left;
    padding-right: 100px;
    width: 15vw;
`;
const Bold = styled.div`
    font-weight: bold;
    margin-right: 10px;
`;
const Tel = styled.div`
   display: flex;
   float: left;
   padding-right: 100px;
   width: 15vw;
`;
const Mail = styled.div`
   display: flex;
   float: left;
   width: 15vw;
`;
const Img = styled.img`
    display: flex;
    float: left;
    //margin-left: auto;
    margin-right: 5px;
    padding-right: 100px;
    img
    {
        margin: 0 0.5vw;
    }
`;
 
const DeleteButton = styled.div`
    width: 20px;
    height: 100%;
    float: right;
    padding-right: 20px;
`;


interface ContactProps extends React.HTMLProps<HTMLDivElement>{
    name: string;
    telNumber: number;
    mailAddres: string;
    isAdmin: boolean;
    id: string;
    onDelete: (id: string) => void;
 };

export const SimpleInformation = (props: ContactProps) => {

    return(
        <Wrapper>
            <Img alt="people" src={people} />
            <Name><Bold>Imię i Nazwisko:</Bold> {props.name}</Name>
            <Tel><Bold>Numer telefonu: </Bold>{props.telNumber}</Tel>
            <Mail><Bold>Adress e-mail: </Bold>{props.mailAddres}</Mail>
            <DeleteButton>
                {props.isAdmin && <button onClick={e => props.onDelete(props.id)}>🗑</button>}
            </DeleteButton>
            
        </Wrapper>
    );

};