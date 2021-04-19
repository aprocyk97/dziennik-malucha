import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';


const ArticleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2vh 0;

    background-color: ${Colors.backgroundLightGray};

    border-radius: 10px;
    
`;

const ArticleTitle = styled.div`
    height: 8vh;
    font-size: ${fontSize[24]};
    background-color: ${Colors.basicGreen};
    border-radius: 10px 10px 0 0;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ArticleContent = styled.div`
    text-align: justify;
    margin: 1vh 1vw;

    font-size: ${fontSize[18]};
`;

const ArticleFooter = styled.div`
    background-color: #8f8f8f;
    height: 2vh;
    border-radius: 0 0 10px 10px;

    font-size: ${fontSize[14]};
    color: #dfdfdf ;

    p{
        margin: 0.3vh 1vw;
    }
`;

interface IFeedArticle {
    articleItem: object
}

export const FeedArticle : FC<IFeedArticle> = (props) => {
    return (
        <ArticleWrapper>
            
            <ArticleTitle>
                {props.articleItem['title']}
            </ArticleTitle>

            <ArticleContent>
                {props.articleItem['content']}
            </ArticleContent>

            <ArticleFooter>
                <p>{props.articleItem['displayDate']}</p>
            </ArticleFooter>

        </ArticleWrapper>
    )
}
