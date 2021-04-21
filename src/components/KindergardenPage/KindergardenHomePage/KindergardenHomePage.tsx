import React, { FC, useEffect, useState } from 'react'

import {fetchUserList, Users} from '../../../action/fetchKindergarden';
import { useKindergarden } from '../../../context/KindergardenContext';

export const KindergardenHomePage: FC = () => {

    const [userList, setUserList] = useState<Users[]>();

    const {getKindergarden} = useKindergarden();

    useEffect(() => {
        const fetchData = async() =>{
            const data = await fetchUserList(getKindergarden());
            setUserList(data);
        }
        fetchData();
    }, [])

    return (
        <div>
            To jest HomePage
            {console.log(userList)}
        </div>
    )
}
