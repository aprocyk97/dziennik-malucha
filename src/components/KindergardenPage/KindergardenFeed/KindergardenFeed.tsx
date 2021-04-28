import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';

import { useKindergarden } from '../../../context/KindergardenContext'
import {db} from '../../../firebase';
import { FeedArticle } from './FeedArticle';
import {fetchKindergardenUsers} from '../../../action/fetchKindergarden'


const FeedWrapper = styled.div`

    max-width: 50vw;
    margin: 0 15vw;

    display: flex;
    flex-direction: column;

    
`;

// TODO: https://reactjs.org/docs/context.html
// https://blog.logrocket.com/localstorage-javascript-complete-guide/#setitem

export const KindergardenFeed :FC = () => {

    const {getKindergarden} = useKindergarden();
    const [feedArticles, setFeedArticles] = useState<any>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [test, setTest] = useState<any>();
    const kindergardenArticleRef = db.collection('kindergardens').doc(getKindergarden()).collection('data').doc('feed');
    


    useEffect(() => {
        
        const fetchData = async () =>{
            kindergardenArticleRef.get().then((doc) => {
                if(doc.exists){
                    sortByDate(doc.data());
                    setLoading(false);
                }else{
                    console.log('Cannot get Feed Articles from database');
                }
            }).catch((error) => {
                console.log('Feed Article Database error: ', error);
            })

        }
        
        setTest(fetchKindergardenUsers(getKindergarden()));
        fetchData();
        
        
        
        
    }, [])

    function sortByDate(obj: any){
        setFeedArticles(obj['items'].sort((a, b) => 
            (a.date < b.date) ? 1 : -1
        ))
    }

    return (
        <FeedWrapper>
            
            {loading ? <div>Loading...</div> : feedArticles.map( item => {
            
            return <FeedArticle articleItem = {item} />;
            })}
            
        </FeedWrapper>
    )
}
