import styled from 'styled-components';
import {Colors} from './Colors';
import {fontSize} from './FontSizes';

export const Wrapper = styled.div`

    /* border: 1px solid ${Colors.borderGreen}; */
    border-radius: 25px;

    box-shadow:0px 0px 5px 2px ${Colors.borderGreen};

    

    margin: 15vh 30vw;
    width:40vw;
    

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
    width: 30vw;

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
    color: #000;
    text-align: center;
    font-weight: bold;

    margin-top: 2vh;

`;

export const LoginButton = styled.button`

    width: 14vw;
    height: 4vh;

    box-shadow:10px 10px 30px ${Colors.borderGreen} inset;

    border: 2px solid gray;
    border-radius: 5px;
    
    font-weight: bold;
    font-size:${fontSize[20]};

    &:hover{
        cursor: pointer;
    }
    
    &:active{
        border-style: outset !important;
        border: 1px solid gray;
        transform: translate(-1px,-1px);
        
    }
    &:focus{
        border-style: outset;
        
    }

`;
export const AdditionalLinks = styled.div`
    display: flex;
    flex-direction: column;

    p{
        &:first-child{
            margin: 10px 0 4px 0;
        }
        &:last-child{
            margin: 4px 0 20px 0;
        }

    }
`;
export const ErrorWrapper = styled.div`

    width:20vw;
    margin: 5vh 36vw -5vh;

    display:flex;
    flex-direction: row;
    

    border-radius: 25px;
    background-color: ${Colors.errorRed};
    box-shadow:0 0 10px ${Colors.errorRed};
    color: #fff;

    padding: 25px;
    p{
        margin-left: 25px;
        
    }
`;