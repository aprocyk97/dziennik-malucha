import React, { FC, useEffect, useState } from 'react'

import {fetchUserList, Users} from '../../../action/fetchKindergarden';
import { useKindergarden } from '../../../context/KindergardenContext';

export const KindergardenHomePage: FC = () => {

    const [userList, setUserList] = useState<Users[]>();

    const {getKindergarden} = useKindergarden();



    return (
        <div>
            To jest HomePage
            
        </div>
    )
}
