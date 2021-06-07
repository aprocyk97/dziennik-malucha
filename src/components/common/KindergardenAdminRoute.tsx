import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Route, Redirect, useRouteMatch } from 'react-router-dom'
import { isAdmin } from '../../action/fetchKindergarden';
import { useAuth } from '../../context/AuthContext'
import { useKindergarden } from '../../context/KindergardenContext';




export const KindergardenAdminRoute = ({ component: Component, ...rest }) => {
    
        
    const { getKindergarden, getIsAdmin } = useKindergarden();
    let match = useRouteMatch(`/${getKindergarden()}`);
    
    return (

        <Route

            {...rest}
            
            
            render={props => {
                { console.log(getIsAdmin()) }
                return (getIsAdmin()) ? <Component {...props} /> : <Redirect to={`${match!.url}/strona-glowna`} />
            }}
        ></Route>
    )
}
