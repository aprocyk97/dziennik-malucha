import React, { FC } from 'react'
import styled from 'styled-components';
import { fontSize } from '../../../../styledHelpers/FontSizes';


const ItemWrapper = styled.div`

    
    display: flex;
    flex-direction: row;

    margin: 0.5vh 0.5vw;
    
    box-shadow: 2px 2px 5px 2px #00000015;

    height: 5vh;

    border-radius: 5px;
    align-items: center;
`;

const NameWrapper = styled.div`
    font-size: ${fontSize[22]};
    font-family: Roboto;
    
    margin: 0 1vw;
`;

interface IAttendanceListItem {
    name: string;
}

export const AttendanceListItem: FC<IAttendanceListItem> = (props) => {
    return (
        <ItemWrapper>
            <NameWrapper>
                {props.name}
            </NameWrapper>


        </ItemWrapper>
    )
}
