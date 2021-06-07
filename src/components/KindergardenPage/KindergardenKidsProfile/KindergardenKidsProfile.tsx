import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import styled from 'styled-components';
import { getChildren, getUsersChildren, SingleKid, updateUserChild } from '../../../action/fetchKindergardenKids';
import { useKindergarden } from '../../../context/KindergardenContext';

import { fontSize } from '../../../styledHelpers/FontSizes';
import { DatePicker } from '../../common/DatePicker';

const Wrapper = styled.div`
    background-color: #fff;
    min-width: 70vw;
    max-width: 100%;
    min-height: 100%;
    margin: 1vh 5vw;


    display: flex;
    flex-direction: column;


    border-radius: 5px;
    border: 1px solid lightgray;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);

    font-family: Roboto;
`;
const TopBar = styled.div`
    display: flex;
    flex-direction: row;

    background-color: #b4b4b4;
    height: 7vh;
    max-height: 7vh;
    border-radius: 5px 5px 0 0;
`;
const Title = styled.div`
    color: #fff;
    font-family: Roboto;
    font-size:${fontSize[24]};
    font-weight: bold;
    letter-spacing: 2px;

    margin: 2vh 2vw;
`;
const Button = styled(FontAwesomeIcon)`
    margin: 2vh 2vw 0 auto;

    cursor: pointer;
`;
const DataWrapper = styled.div`
    height: 90vh;


    display:flex;
    flex-direction: row;

`;
const RightSide = styled.div`
    height: 100%;
    width: 50%;


    display: flex;
    flex-direction: column;

    justify-content: space-evenly;

`;
const LeftSide = styled.div`
    height: 100%;
    width: 50%;
    max-width: 50%;


    display: flex;
    flex-direction: column;

    justify-content: space-evenly;

`;
const InputWrapper = styled.div`
    max-width: 100%;

    display: flex;
    flex-direction: row;

    align-items: center;
    

    height: 5vh;
    margin: 5vh 3vw;
`;
const Label = styled.div`
    font-family: Roboto;
    font-weight: bold;
    font-size: ${fontSize[20]};
    
`;
const Text = styled.div`
    font-family: Roboto;
    font-size: ${fontSize[18]};
    margin-top: 0.5vh;
    margin-left: 2vw;
`;
const TextInput = styled.input`
    font-family: Roboto;
    font-size: ${fontSize[18]};
    margin-top: 0.5vh;
    margin-left: 2vw;
`;
const DateInput = styled(DatePicker)`
    font-family: Roboto;
    font-size: ${fontSize[18]};
    margin-top: 0.5vh;
    margin-left: 2vw;
`;
const TextFieldWrapper = styled.div`
    max-width: 90%;
    height: 30%;
    max-height: 30%;

    display: flex;
    flex-direction: column;

    margin: 1vh 1vw;
    overflow-y: hidden;

`;
const TextField = styled.div`
    max-width: 90%;
    max-height: 100%;
    min-width: 90%;
    min-height: 60%;
    
    word-wrap: break-word;
    overflow-y: scroll;

    margin: 1vh 5%;
    padding: 0.2vh 0.5vw;

    border: 1px solid lightgray;
    border-radius: 5px;

    text-align: justify;

    white-space: pre-wrap;


    &::-webkit-scrollbar-track
    {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    }

    &::-webkit-scrollbar
    {
    width: 5px;
    background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb
    {
    background-color: #8f8f8f;
    border: 2px solid #8f8f8f;
    }

`;
const TextFieldInput = styled.textarea`
    max-width: 90%;
    max-height: 100%;
    min-width: 90%;
    min-height: 60%;
    
    word-wrap: break-word;
    overflow-y: scroll;

    margin: 1vh 5%;
    padding: 0.2vh 0.5vw;

    border: 1px solid lightgray;
    border-radius: 5px;

    text-align: justify;

    font-size: ${fontSize[16]};


    &::-webkit-scrollbar-track
    {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    }

    &::-webkit-scrollbar
    {
    width: 5px;
    background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb
    {
    background-color: #8f8f8f;
    border: 2px solid #8f8f8f;
    }
`;

export const KindergardenKidsProfile: FC = () => {


    const { getKindergarden, getKindergardenUser } = useKindergarden();



    const [loading, setLoading] = useState<boolean>(true);


    const [getChild, setGetChild] = useState<SingleKid[]>([]);

    const [isEditable, setIsEditable] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [birthDate, setBirthDate] = useState(new Date());


    const [medicineList, setMedicineList] = useState<string>('');
    const [alergies, setAlergies] = useState<string>('');
    const [additional, setAdditional] = useState<string>('');

    const handleEditable = () => {
        setIsEditable(!isEditable);
    }
    const handleAddChildren = () => {
        const updateChild: SingleKid = {
            uid: getKindergardenUser() as string,
            name: name,
            birthDate: birthDate.toJSON(),
            medicineList: medicineList,
            alergies: alergies,
            additional: additional
        }
        updateUserChild(getKindergarden(), updateChild, getChild[0])
            .then(() => {
                setIsEditable(!isEditable);
            })
    }

    useEffect(() => {
        // getChildren(getKindergarden())
        //     .then(result => {
        //         console.log(result);
        //     })
        getUsersChildren(getKindergarden(), getKindergardenUser())
            .then(result => {
                setGetChild(result);
                if (result.length > 0) {
                    setName(result[0].name);
                    setBirthDate(new Date(result[0].birthDate));
                    setMedicineList(result[0].medicineList);
                    setAlergies(result[0].alergies);
                    setAdditional(result[0].additional);
                }



            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        <Wrapper>

            <TopBar>
                <Title>
                    Profil Dziecka
                </Title>
                {
                    isEditable ?
                        <Button icon='save' size='2x' onClick={handleAddChildren} />
                        :
                        <Button icon='edit' size='2x' onClick={handleEditable} />
                }


            </TopBar>
            <DataWrapper>

                <LeftSide>
                    <InputWrapper>
                        <Label>Imię i nazwisko:</Label>

                        {
                            isEditable ?
                                <TextInput type='text' value={name} onChange={e => setName(e.target.value)} />
                                :
                                <>
                                    {
                                        loading ?
                                            <Text>Ładowanie danych...</Text>
                                            :
                                            <Text>{name}</Text>
                                    }
                                </>
                        }
                    </InputWrapper>
                    <InputWrapper>
                        <Label>Data urodzenia:</Label>
                        {
                            isEditable ?
                                <DateInput date={birthDate} setDate={setBirthDate} />
                                :
                                <>
                                    {
                                        loading ?
                                            <Text>Ładowanie danych...</Text>
                                            :
                                            <Text>{birthDate.getDate()} {birthDate.toLocaleDateString('pl-PL', { month: 'long' })} {birthDate.getFullYear()}</Text>
                                    }
                                </>
                        }
                    </InputWrapper>
                    <InputWrapper>
                        <Label>Dummy field:</Label>
                        <Text>Dummy text</Text>
                    </InputWrapper>
                    <InputWrapper>
                        <Label>Dummy field:</Label>
                        <Text>Dummy text</Text>
                    </InputWrapper>

                </LeftSide>
                <RightSide>
                    <TextFieldWrapper>
                        <Label>Lista leków:</Label>
                        {
                            isEditable ?
                                <TextFieldInput value={medicineList} onChange={e => { setMedicineList(e.target.value) }} />
                                :
                                <>
                                    {
                                        loading ?
                                            <TextField>Ładowanie danych...</TextField>
                                            :
                                            <TextField>{medicineList}</TextField>

                                    }
                                </>
                        }
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <Label>Alergie:</Label>

                        {
                            isEditable ?
                                <TextFieldInput value={alergies} onChange={e => { setAlergies(e.target.value) }} />
                                :
                                <>
                                    {
                                        loading ?
                                            <TextField>Ładowanie danych...</TextField>
                                            :
                                            <TextField>{alergies}</TextField>

                                    }
                                </>
                        }
                    </TextFieldWrapper>
                    <TextFieldWrapper>
                        <Label>Dodatkowe infromacje:</Label>

                        {
                            isEditable ?
                                <TextFieldInput value={additional} onChange={e => { setAdditional(e.target.value) }} />
                                :
                                <>
                                    {
                                        loading ?
                                            <TextField>Ładowanie danych...</TextField>
                                            :
                                            <TextField>{additional}</TextField>

                                    }
                                </>
                        }
                    </TextFieldWrapper>

                </RightSide>
            </DataWrapper>
        </Wrapper>
    )
}
