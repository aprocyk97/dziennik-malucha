import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';

import { useKindergarden } from '../../../context/KindergardenContext'
import { db } from '../../../firebase';
import { FeedArticle } from './FeedArticle';
import { fetchKindergardenUsers } from '../../../action/fetchKindergarden'
import { SinglePost } from '../../common/SinglePost';
import { Route, Switch, useRouteMatch } from 'react-router';


const FeedWrapper = styled.div`

    max-width: 50vw;
    margin: 0 15vw;

    display: flex;
    flex-direction: column;

    
`;

// TODO: https://reactjs.org/docs/context.html
// https://blog.logrocket.com/localstorage-javascript-complete-guide/#setitem

export interface ISingleArticle {
    title: string;
    content: string;
    date: number;
    displayDate: string;
}

export const KindergardenFeed: FC = () => {

    const { getKindergarden } = useKindergarden();
    const [feedArticles, setFeedArticles] = useState<ISingleArticle[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [test, setTest] = useState<any>();
    const kindergardenArticleRef = db.collection('kindergardens').doc(getKindergarden()).collection('data').doc('feed');

    const [displayPost, setDisplayPost] = useState<ISingleArticle>();



    const [postPath, setPostPath] = useState<string>(`post`);

    let match = useRouteMatch(`/${getKindergarden()}/aktualnosci`);
    const [articlesPath, setArticlesPath] = useState<any>(match?.path);

    useEffect(() => {

        const fetchData = async () => {
            kindergardenArticleRef.get().then((doc) => {
                if (doc.exists) {
                    sortByDate(doc.data() as ISingleArticle);
                    setLoading(false);
                } else {
                    console.log('Cannot get Feed Articles from database');
                }
            }).catch((error) => {
                console.log('Feed Article Database error: ', error);
            })

        }

        setTest(fetchKindergardenUsers(getKindergarden()));
        fetchData();




    }, [])

    function sortByDate(obj: ISingleArticle) {
        setFeedArticles(obj['items'].sort((a, b) =>
            (a.date < b.date) ? 1 : -1
        ))
    }

    return (
        <FeedWrapper>


            <Switch>
                <Route exact path={`${match?.path}`}>
                    {
                        loading ?
                            <div>Loading...</div>
                            :
                            feedArticles.map(item => {
                                return <SinglePost fullPost={false} postPath={postPath} setPostPath={setPostPath} newsFeedPath={articlesPath} setDisplayPost={setDisplayPost} articleItem={item} />;
                            })
                    }
                </Route>
                {
                    loading ?
                        <div>Loading...</div>
                        :
                        <Route path={`${match?.path}/${postPath}`}>
                            {
                                loading ?
                                    <div>Loading...</div>
                                    :
                                    <SinglePost fullPost={true} setPostPath={setPostPath} postPath={postPath} newsFeedPath={articlesPath} articleItem={displayPost!} />
                            }
                        </Route>
                }

            </Switch>

        </FeedWrapper>
    )
}
