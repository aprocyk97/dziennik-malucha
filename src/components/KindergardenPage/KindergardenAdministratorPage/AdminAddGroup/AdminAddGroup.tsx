import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CreateKindergardenGroup, fetchUserByPower, IGroupUser, IKindergardenGroup, IKindergardenGroups, KindergardenUser, Users } from '../../../../action/fetchKindergarden';
import { useKindergarden } from '../../../../context/KindergardenContext';
import { fontSize } from '../../../../styledHelpers/FontSizes';


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    font-family: Roboto;
    width: 100%;
    max-width: 100%;
`;
const Form = styled.form`
    width:50%;
    display: flex;
    flex-direction: column;
    
`;
const Label = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 1vh 1vw;

    p{
        font-size:${fontSize[20]};
    }
    
`;
const TextInput = styled.input`
    height: 2vh;
    width: 15vw;
    font-size:${fontSize[18]};
    margin-left: 1vw;
`;
const Select = styled.select`
    font-size:${fontSize[18]};
    width: 10vw;

    margin-left: 1vw;
`;
const AddButton = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-left: 0.5vw;
`;
const DelButton = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-right: 1vw;
`;
const Table = styled.table`
    width: 50%;
    max-width: 50%;
    border: 1px solid gray;
    border-collapse: collapse;
    overflow-wrap: anywhere;

    th{
        border: 1px solid gray;
        &:first-child{
            padding: 1vh 1vw;
        }
    }
`;
const TableTitle = styled.h1`
    font-size:${fontSize[20]};
`;
const TeacherRow = styled.tr`
    border-bottom: 1px solid gray;
    font-size:${fontSize[18]};
    width: 100%;
    

    td{
       
        padding: 1vh 0;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        div{
            margin-left: 1vw;
        }
        
    }
    
    
`;
const TitleRow = styled.tr`
    border: 2px solid gray;
    background-color: gray;
    color: white;
`;
const Submit = styled.input`

`;

export const AdminAddGroup: FC = () => {

    const { getKindergarden } = useKindergarden();

    const [teacherList, setTeacherList] = useState<KindergardenUser[]>([]);

    const [addedTeachers, setAddedTeachers] = useState<KindergardenUser[]>([]);
    const [groupName, setGroupName] = useState<string>('');

    const [teacher, setTeacher] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchByPower();
    }, [])
    const fetchByPower = () => {
        fetchUserByPower('teacher', getKindergarden())
            .then(result => {

                setTeacherList(result);
                setTeacher(result[0].uid);
            })
            .catch(error => {
                console.log('Cannot fetch list of users', error);
            }).finally(()=> {
                setLoading(false);
            })
    }


    const handleSelect = (e: any) => {
        setTeacher(e.target.value);
    }
    const handleAddTeacher = () => {
        const user = teacherList!.filter(item => item.uid === teacher);
        if (addedTeachers.filter(item => item.uid === user[0].uid).length === 0) {
            if (user !== undefined) {
                setAddedTeachers(prevState => [...prevState, user[0]])
                teacherList?.map((value, index) => {
                    if (value.uid === user[0].uid) {
                        teacherList.splice(index, 1);
                    }
                })
                if (teacherList?.length !== 0) {
                    setTeacher(teacherList![0].uid);
                }
            }
        }

    }

    const handleDeleteTeacher = (index: number) => {
        setTeacherList(prevState => [...prevState, addedTeachers.splice(index,1)[0] ])
    }
    const handleSubmit = (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const users : IGroupUser[] = addedTeachers.map(item => ({
            uid: item.uid,
            name: item.name,
            surname: item.surname,
        }));
        const group : IKindergardenGroups ={
            id: groupName.toLocaleLowerCase().replace(/\s/g,''),
            name: groupName,
            users: users,
        };
        console.log(group);
        CreateKindergardenGroup(getKindergarden(), group).finally(()=>{
            fetchByPower();
            setAddedTeachers([]);
            setGroupName('');
            setLoading(false);
        });
    }

    return (
        <Wrapper>
            <Form onSubmit={e => handleSubmit(e)}>
                <Label>
                    <p>Nazwa grupy</p>
                    <TextInput type='text' value={groupName} onChange={e => setGroupName(e.target.value)} required/>
                </Label>
                {
                    (teacherList?.length !== 0) ?
                        <Label>
                            <p>Dodaj nauczyciela</p>
                            <Select value={teacher} onChange={e => handleSelect(e)}>
                                {
                                    teacherList?.map(item => {
                                        return <option value={item.uid}>{item.name} {item.surname}</option>
                                    })
                                }
                            </Select>
                            <AddButton icon='plus' size='lg' color='green' onClick={() => handleAddTeacher()} />

                        </Label>
                        :
                        null
                }


                <Submit type='submit' value='Zatwierdź' disabled={loading} />
            </Form>
            <Table>
                <thead>
                    <TitleRow>
                        <th><TableTitle>Nazwa Grupy</TableTitle></th>
                    </TitleRow>
                    <tr>
                        <th><TableTitle>{groupName}</TableTitle></th>
                    </tr>
                </thead>
                <tbody>
                    <TitleRow>
                        <th> <TableTitle>Lista Nauczycieli</TableTitle></th>
                    </TitleRow>
                    {
                        addedTeachers.map((value, index) => {
                            return(
                                <TeacherRow>
                                    <td><div>{value.name}{value.surname}</div> <DelButton icon='minus' color='red' onClick={() => handleDeleteTeacher(index) } /></td>
                                    
                                </TeacherRow>
                            )
                        })
                    }
                </tbody>
            </Table>
            
        </Wrapper>
    )
}
