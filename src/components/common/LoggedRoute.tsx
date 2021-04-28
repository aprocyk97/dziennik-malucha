import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'



export const LoggedRoute = ({  component: Component, ...rest}) => {

    const {currentUser} = useAuth();

    return (
        <Route
            {...rest}
            render={props =>{
                return currentUser === null ? <Component {...props} /> : <Redirect to="/profile" />
            }}
        ></Route>
    )
}
