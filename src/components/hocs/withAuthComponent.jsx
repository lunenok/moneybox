import React from 'react';
import {Navigate} from 'react-router-dom';
import {authStore} from './../../store/auth';
import {observer} from 'mobx-react-lite';

const withAuthComponent = (Component) => {
    // const isAuth = authStore.account.email;
    return Component;
    // const RedirectComponent = (props) => {
    //     const {restProps} = props;
    //     if (!isAuth) return <Navigate to='/register'></Navigate>
    //     return <Component {...restProps}></Component>
    // };
    // return RedirectComponent;
};

export default withAuthComponent;

// export default observer(withAuthComponent);