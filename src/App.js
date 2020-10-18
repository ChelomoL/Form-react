import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Location}  from './Components/Location';
import { Contactability}  from './Components/Contactability';
import Personnal from './Components/Personnal';





const App = () => {
  
    return (
      <div className="container">
       
          <Personnal/>    
      </div>
       );
  
}

export default App;
