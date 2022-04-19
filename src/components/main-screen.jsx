import * as React from 'react';
import {Container} from '@mui/material';
import Calculation from './calculation';
import { Route, Routes} from 'react-router-dom';
import InputingInformation from './input-info';

export default function MainScreen() {
  
    return (
        <Container>
            <Routes>
                <Route path='/' element={<InputingInformation/>}>
                </Route>
                <Route path='/calculation' element={<Calculation />}>
                </Route>
            </Routes>
        </Container>
    );
}