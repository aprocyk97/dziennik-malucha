import React, { FC, useEffect, useRef, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useKindergarden } from '../../context/KindergardenContext';
import { Colors } from '../../styledHelpers/Colors';
import { fontSize } from '../../styledHelpers/FontSizes';

const PostWrapper = styled.div`

    width: 100%;

    margin: 5vh 0;
    padding: 1vh 1vw;

    background-color: #fff;

    box-shadow: 0px 1px 4px 2px rgba(0,0,0,0.1);

    border-radius: 5px;

    
`;
const PostTitle = styled.h1`
    color: #006900;
    font-size: ${fontSize[24]};
    margin: 3vh 25%;
    letter-spacing: 2px;

    font-family: Roboto;
    font-weight: bold;
    
`;
const PostText = styled.p`
    text-align: justify;

    font-family: Roboto;
    letter-spacing: 0.5px;
    line-height: 140%;

    color: #3d3d3d;
    font-size: ${fontSize[18]};    
    
`;
const PostInfo = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2vh 0;
    width: auto;

    font-family: Roboto;
    font-size: ${fontSize[14]};

    p{
        margin: 0 5vw;
        &:nth-child(1){
            margin-left: auto;
        }
    }
`;
const TextLink = styled(Link)`
    text-align: justify;

    font-family: Roboto;
    letter-spacing: 0.5px;
    line-height: 140%;

    color: #2512ca;
    font-size: ${fontSize[18]};  

`;
const PostImage = styled.img`
    float: left;
    width: 400px;
    height: 400px;
    max-width: 550px;
    max-height: 625px;
    margin-right: 1vw;
    margin-bottom: 0.5vh;
`;

interface ISinglePost {
    fullPost: boolean;
    setPostPath: any;
}

export const SinglePost: FC<ISinglePost> = (props) => {

    const [loading, setLoading] = useState<boolean>(true);

    const [postPath, setPostPath] = useState<string>('aiii');

    const [text, setText] = useState<string>('Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae optio cumque repellat dicta possimus fugiat consectetur, sed magni rem, ducimus nostrum, quidem laborum iure vitae molestias et ab. Sint!');
    const [cutText, setCutText] = useState<String>(text.slice(0, 1200))

    const postRef = useRef<HTMLDivElement>(null);

    const shortText = () => {
        const cutText = text.slice(0, 1200);
        return cutText
    }
    


    const {getKindergardenGroup, getKindergarden } = useKindergarden();

    let match = useRouteMatch(`/${getKindergarden()}/${getKindergardenGroup()}/aktualnosci`);

    return (
        <PostWrapper ref={postRef}>
            <PostImage />
            <PostTitle>
                Post Title
            </PostTitle>
            <PostInfo>
                <p>
                    Dodano przez: User
                </p>
                <p>
                    Data dodania: Date
                </p>
            </PostInfo>

            <PostText>
                {props.fullPost
                    ?
                    text
                    :
                    <>
                        {cutText}
                        <TextLink onClick={() => {
                            props.setPostPath(postPath)
                        }} to={`${match?.url}/${postPath}`}>... Czytaj dalej</TextLink>
                    </>
                }

            </PostText>



        </PostWrapper>
    )
}
