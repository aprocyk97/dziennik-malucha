import React, { FC, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useKindergarden } from '../../../context/KindergardenContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IKindergardenGroup } from '../../../action/fetchKindergarden';
import { Colors } from '../../../styledHelpers/Colors';
import { fontSize } from '../../../styledHelpers/FontSizes';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    
`;
const LinkButton = styled(Link)`
    text-decoration: none;
    color: white;
    margin: 1vh 0;
    border-top: 1px solid ${Colors.basicGreen};
    width: 99,5%;
    padding-top: 1vh;

    font-size: ${fontSize[20]};


`;
const LabelButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 100%;
    min-height: 8vh;

    cursor: pointer;
`;
const Toggable = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    

    min-width: 100%;
    
`;
const IconButton = styled(FontAwesomeIcon)`
    
`;


interface IDropdownButton {
    
    routeMatch: any;
    label: string;
    groups?: IKindergardenGroup[]
    className?: string;
}

export const DropdownButton: FC<IDropdownButton> = (props) => {

    const [toggled, setToggled] = useState<boolean>(false);

    const handleToggle = () => setToggled(!toggled);

    library.add(fas);


    return (
        <Wrapper className={props.className}>
            <LabelButton onClick={handleToggle}>
                <h1>{props.label}</h1>
                

                {
                    toggled ?
                    <IconButton icon='sort-up' />
                    :
                    <IconButton icon='sort-down' />
                }
                
            </LabelButton>
            {
                toggled ?
                    <Toggable>
                        {
                            props.groups !== undefined ?
                            props.groups.map(item => {
                                return <LinkButton to={`${props.routeMatch}/${item.id}`} key={item.id}>{item.name}</LinkButton>
                            })
                            :
                            null
                        }
                    </Toggable>
                    :
                    null
            }
            

        </Wrapper>
    )
}
