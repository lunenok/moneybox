import React from 'react';
import {Navigate} from 'react-router-dom';
import {authStore} from '../../store/auth';
import {observer} from 'mobx-react-lite';

export default function withAuthComponent<WCP> (Component: React.FC<WCP>) {
    const RedirectComponent: React.FC<PropTypes> = observer(({authStore, props}) => {
        const { ...restProps} = props;
        const isAuth = authStore.account.email;
        if (!isAuth) return <Navigate to='/login'></Navigate>
        return <Component {...restProps}></Component>
    });
    const connectedComponent = () => <RedirectComponent authStore={authStore} props/>
    return connectedComponent;
};

type PropTypes = {
    authStore: any,
    props: any
};