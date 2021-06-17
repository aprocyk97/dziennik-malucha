import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';
import { getChildren, getGroupsChildren, SingleKid } from '../../../../action/fetchKindergardenKids';
import { useKindergarden } from '../../../../context/KindergardenContext';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Colors } from '../../../../styledHelpers/Colors';
import { AttendanceListItem } from './AttendanceListItem';

const Wrapper = styled.div`

`;

const ListWrapper = styled.div`
    background-color: #fff;
    width: 60vw;
    height: 85vh;
    margin: 5vh 10vw;
    padding: 0.5vh 0;


    border: 2px solid ${Colors.backgroundLightGray};
    box-shadow: 2px 2px 5px 2px #00000029;

    border-radius: 10px;

    display: flex;
    flex-direction: column;

`;


export const GroupsAttendanceList:FC = () => {
    
    library.add(fas);

    const {getKindergarden, getKindergardenGroup } = useKindergarden();


    const [childrenList, setChildrenList] = useState<SingleKid[] | string>([]);
    const [loading, setLoading] = useState<boolean>(true);
    

    useEffect(() => {
        getGroupsChildren(getKindergarden(),getKindergardenGroup())
            .then(response => {
                setChildrenList(response);
            }).finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        <Wrapper>
            <ListWrapper>
                <AttendanceListItem name='Jan Kowalski' />
                <AttendanceListItem name='Kamil Nowak' />
                <AttendanceListItem name='Janusz Kręgiel' />
                
            </ListWrapper>

            {/* {
                loading ?
                    <FontAwesomeIcon icon="spinner" pulse size='5x' />
                    :
                    console.log(childrenList)
            } */}
            
        </Wrapper>
    )
}
