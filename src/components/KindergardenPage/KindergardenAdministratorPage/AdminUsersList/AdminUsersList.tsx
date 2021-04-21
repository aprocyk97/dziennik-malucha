import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchUserData, fetchUserList, Users } from '../../../../action/fetchKindergarden';
import { useKindergarden } from '../../../../context/KindergardenContext';


export const AdminUsersList: FC = () => {

    const [userList, setUserList] = useState<Users[]>();
    const [test, setTest] = useState<any>();

    const {getKindergarden} = useKindergarden();

    useEffect(() => {
        const fetchData = async() =>{
            let data;
            try{
                data = await fetchUserList(getKindergarden());

            }catch{

            }
            const t = await fetchUserData(data);
            setUserList(data);
            setTest(t);
        }
        
           fetchData();
        
        
    }, [])    

    return (
        <div>
            
            {console.log('test',test)}
            
            {
                test?.map(item => {
                    return <div>User:  {item.name} {item.surname} {item.email} {item.power} </div>
                })
            }
        </div>
    )
}
