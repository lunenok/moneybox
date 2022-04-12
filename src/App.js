import React from 'react';
import './App.css';
import Header from './components/header'
import MainScreen from './components/main-screen'

function App() {
  return (
    <React.Fragment>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <Header/>
        <MainScreen/>
    </React.Fragment>
  );
}

export default App;
