import React from 'react';
import Header from './components/header';
import MainScreen from './components/main-screen';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <React.Fragment>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <Header/>
            <MainScreen/>
        </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
