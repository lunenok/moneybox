import * as React from 'react';
import {Container} from '@mui/material';
import Calculation from './calculation';
import Login from './login';
import { Route, Routes} from 'react-router-dom';
import InputingInformation from './input-info';
import SignUp from './sign-up';
import {authStore} from './../store/auth';

export default function MainScreen() {
    return (
        <Container>
            <Routes>
                <Route path='*' element={<InputingInformation/>}>
                </Route>
                <Route path='/calculation' element={<Calculation />}>
                </Route>
                <Route path='/register' element={<SignUp authStore={authStore}/>}>
                </Route>
                <Route path='/login' element={<Login authStore={authStore}/>}>
                </Route>
            </Routes>
        </Container>
    );
}