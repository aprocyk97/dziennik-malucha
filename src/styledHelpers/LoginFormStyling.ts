import styled from 'styled-components';
import {Colors} from './Colors';
import {fontSize} from './FontSizes';

export const Wrapper = styled.div`

    border: 3px solid ${Colors.borderGreen};
    border-radius: 25px;

    margin: 15vh 35vw;
    width:25vw;
    min-width: 300px;

    background-color: #FFFF;

    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

export const Form = styled.form`
    
    display: flex;
    flex-direction: column;
    
    align-items: center;
    margin: 1vh 0 1vh;

`;

export const LoginInput = styled.input`
    
    height: 3.5vh;
    width: 400px;

    font-size: ${fontSize[20]};

    border: 1px solid;
    border-radius: 5px;


`;

export const LoginInputLabel = styled.label`

    display: flex;
    flex-direction: column;

    margin: 2vh 0;

    font-size: ${fontSize[22]};

`;

export const LoginText = styled.div`

    font-size: ${fontSize[24]};
    color: #3f643f;
    text-align: center;
    font-weight: bold;

    margin-top: 2vh;

`;

export const LoginButton = styled.button`

    width: 14vw;
    height: 4vh;

    border: 2px solid;
    border-radius: 5px;
    
    font-weight: bold;
    font-size:${fontSize[20]};

`;