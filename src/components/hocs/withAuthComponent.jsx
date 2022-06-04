import React from 'react';
import {Navigate} from 'react-router-dom';
import {authStore} from './../../store/auth';
import {observer} from 'mobx-react-lite';

const withAuthComponent = (Component) => {
    const RedirectComponent = (props) => {
        const {isAuth, ...restProps} = props;
        if (!isAuth) return <Navigate to='/login'></Navigate>
        return <Component {...restProps}></Component>
    };
    const connectedComponent = observer(({isAuth, props}) => <RedirectComponent isAuth={authStore.account.email} props/>)
    return connectedComponent;
};

export default withAuthComponent;