import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    deleteUserKindergarden,
    fetchUserData,
    fetchUserList,
    KindergardenUser,
    removeKindergardenUser
} from '../../../../action/fetchKindergarden';
import { useKindergarden } from '../../../../context/KindergardenContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { title } from 'node:process';
import { AdminAddUser } from '../AdminAddUser/AdminAddUser';


const Wrapper = styled.div`
    width: 100%;

    background-color: rgba(0, 0, 0, 0.05);

    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
`;
const Row = styled.tr`
    border-bottom: 1px solid #bebebe;
`;
const Cell = styled.td`
    padding: 1vh 1vw;
    border-right: 1px solid #bebebe;
    
    &:last-child{
        border-right: none;
        
    }
`;
const TitleCell = styled.th`
    padding: 1vh 1vw;
    border-bottom: 2px solid darkgray;
`;
const RemoveButton = styled(FontAwesomeIcon)`

    &:hover{
        cursor: pointer;
    }
`;

export const AdminUsersList: FC = () => {

    const [kindergardenUserList, setKindergardenUserList] = useState<KindergardenUser[]>();

    const { getKindergarden, getKindergardenName } = useKindergarden();

    library.add(fas);

    useEffect(() => {
        const fetchData = async () => {
            let data;
            try {
                data = await fetchUserList(getKindergarden());
            } catch {
                console.log('Problem podczas pobierania użytkowników')
            }
            const t = await fetchUserData(data);

            setKindergardenUserList(t);
        }

        fetchData();


    }, [])



    return (
        <Wrapper>
            <AdminAddUser />
            <Table>
                <Row>
                    <TitleCell>Imię</TitleCell>
                    <TitleCell>Nazwisko</TitleCell>
                    <TitleCell>Email</TitleCell>
                    <TitleCell>Uprawnienia</TitleCell>
                    <TitleCell></TitleCell>
                </Row>
                {
                    kindergardenUserList?.map(item => {
                        return (
                            <Row>
                                
                                <Cell>
                                    {item.name}
                                </Cell>
                                <Cell>
                                    {item.surname}
                                </Cell>
                                <Cell>
                                    {item.email}
                                </Cell>
                                <Cell>
                                    {item.power}
                                </Cell>
                                <Cell>
                                    <RemoveButton icon="times-circle" color="red" size="lg" onClick={() => { 
                                        removeKindergardenUser(item.uid, getKindergarden())
                                        deleteUserKindergarden(item.uid, getKindergarden(), getKindergardenName());     
                                        }} />
                                    <FontAwesomeIcon icon='envelope' color="white" size='lg' />
                                </Cell>
                            </Row>
                        );
                    })
                }
            </Table>
        </Wrapper>
    )
}
