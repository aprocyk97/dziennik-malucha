import React, { FC } from 'react'
import styled from 'styled-components';
import { Colors } from '../../../../styledHelpers/Colors';

const PopupWrapper = styled.div`
    position: absolute;
    z-index: 10;

    width: 20vw;
    height: 20vh;

    margin: 20vh 25vw;

    background-color: ${Colors.backgroundLightGray};

    display: flex;
    flex-direction: column;

    border-radius: 5px;
    
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);

    transition: 5s ease-in;

`;
const PopupMessage = styled.div`
    text-align: center;
    margin-top: 5vh;

`;

interface IPopup{
    message: string;
}

export const MealPopup: FC<IPopup> = (props) => {
    return (
        <PopupWrapper>
            <PopupMessage>
                {props.message}

            </PopupMessage>

        </PopupWrapper>
    )
}
