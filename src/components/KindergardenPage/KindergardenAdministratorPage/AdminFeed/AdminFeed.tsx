import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { fontSize } from '../../../../styledHelpers/FontSizes';
import {ISingleFeed} from '../../../../entities/feed'
import {db} from '../../../../firebase';
import { useKindergarden } from '../../../../context/KindergardenContext';
import firebase from 'firebase';


const Wrapper = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: space-around; */
    
    height: auto;
    min-height: 30vh;
    max-height: 70vh;
    background-color: rgba(0, 0, 0, 0.05);

    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
const WrapperForm = styled.form`

    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    
    
`;

const Title = styled.h1`
    
    margin: 2vh 0;
    font-size: ${fontSize[24]};
    text-align: center;
`;
const InputText = styled.input`
    font-size: ${fontSize[18]};
    width: 300px;
    height: 30px;
`;
const StyledTextArea = styled.textarea`

    font-size: ${fontSize[18]};

    max-height: 300px;
    min-height: 100px;

    max-width: 700px;
    min-width: 300px;
`;

const StyledLabel = styled.label`

    margin: 2vh 0 2vh 0; 
    p{
        font-size: ${fontSize[20]};
    }
`;
const Submit = styled.input`
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    margin-bottom: 2vh;

    width: 140px;
    height: 45px;
    letter-spacing: 2.5px;

    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover{
        background-color: #2EE59D;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
        color: #fff;
        transform: translateY(-4px);
    }
`;
//TODO: PREVIEW POSTU

export const AdminFeed: FC = () => {


    const [loading, setLoading] = useState<boolean>(false);
    const [feed, setFeed] = useState<ISingleFeed>();
    const { getKindergarden} = useKindergarden();

    const todayDate = new Date();
    const ref = db.collection('kindergardens').doc(getKindergarden()).collection('data').doc('feed');

    const titleRef = useRef<any>();
    const contentRef = useRef<any>();

    useEffect(() => {
        setFeed({
            title: '',
            content: '',
            date: 0,
            displayDate: '',
            
        })
        
    }, [])

    function setDate(){
        setFeed({
            ...feed!,
            date: Date.now(),
            displayDate: `${todayDate.getDate()} ${todayDate.toLocaleString('pl-pl', {month: 'short'})} ${todayDate.getFullYear()}`,
            
        })
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        
        try {
            setLoading(true);
            await ref.update({
                items: firebase.firestore.FieldValue.arrayUnion(feed)
            })
        }catch {
            console.log('Error occurend when updating data');
        }
        setLoading(false);
        console.log('working');
        setFeed({
            ...feed!,
            title: '',
            content: ''
        })
        
    }

    return (
        <Wrapper>
            <Title>Nowa Aktualność</Title>
            <WrapperForm onSubmit={handleSubmit}>

                <StyledLabel>
                    <p>Tytuł aktualności: </p>

                    <InputText 
                        type='text' 
                        // ref = {titleRef}
                        value={feed?.title}
                        required
                        onChange = {e => {
                            setFeed({
                                ...feed!,
                                title: e.target.value
                            })
                        }}
                    />
                </StyledLabel>
                <StyledLabel>
                    <p>Zawartość aktualności: </p>
                    <StyledTextArea
                        // ref={contentRef}
                        value={feed?.content}
                        required
                        onChange = {e => {
                            setFeed({
                                ...feed!,
                                content: e.target.value
                            })
                        }}
                    />

                </StyledLabel>
                <Submit 
                    disabled= {loading}
                    type='submit' 
                    onClick={setDate}
                />
            </WrapperForm>
        </Wrapper>
    )
}
