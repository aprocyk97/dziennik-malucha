import {FC, PureComponent } from 'react';
import styled from 'styled-components';

import people from '../../../media/icons/people.png';


interface ContactProps extends React.HTMLProps<HTMLDivElement>{
    name: string;
    telNumber: number;
    mailAddres: string;
 };

const Wrapper = styled.div`
    border: 1px solid black;
    background: lightgray;
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 40px;
    padding-right: 100px;
    padding-left: 100px;
    border-radius: 10px;  
    margin-bottom: 15px;

`;
const Name = styled.div`
    display: flex;
    float: left;
    padding-right: 100px;
`;
const Tel = styled.div`
   display: flex;
   float: left;
   padding-right: 100px;
`;
const Mail = styled.div`
   display: flex;
   float: left;
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
interface PrimitiveProps extends React.HTMLProps<HTMLDivElement>{
    text: string;
 };


export const SimpleInformation = (props: ContactProps) => {

    return(
        <Wrapper>
            <Img alt="people" src={people} />
            <Name>Imię i Nazwisko: {props.name}</Name>
            <Tel>Numer telefonu: {props.telNumber}</Tel>
            <Mail>Adress e-mail: {props.mailAddres}</Mail>
        </Wrapper>
    );

};