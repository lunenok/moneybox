import * as React from 'react';
import {Container} from '@mui/material';
import Calculation from './calculation';
import Login from './login';
import { Route, Routes} from 'react-router-dom';
import InputingInformation from './input-info';
import SignUp from './sign-up';

export default function MainScreen() {
  
    return (
        <Container>
            <Routes>
                <Route path='*' element={<InputingInformation/>}>
                </Route>
                <Route path='/calculation' element={<Calculation />}>
                </Route>
                <Route path='/account' element={<Login />}>
                </Route>
                <Route path='/register' element={<SignUp/>}>
                </Route>
                <Route path='/login' element={<Login/>}>
                </Route>
            </Routes>
        </Container>
    );
}