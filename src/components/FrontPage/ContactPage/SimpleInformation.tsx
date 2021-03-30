import {FC} from 'react';
import styled from 'styled-components';

import people from '../../../media/icons/people.png';

const Wrapper = styled.div`
border: 1px solid black;
background: lightgray;
font-size: 20px;
padding-top: 20px;
padding-bottom: 20px;
padding-right: 40px;
padding-left: 40px;
border-radius: 10px;  
`;
const Logo = styled.img`
   
`;


export const SimpleInformation: FC = () => {

    return(
        <Wrapper>
            <Logo src={people}/>
            Imię i Nazwisko || tel: 123-456-789 || nazwisko@gmail.com
        </Wrapper>
    );

};