import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { ApiContext } from "./context/context";
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0CD3FC',
    },
    secondary: {
      main: '#F06FCB',
    },
    error: {
      main: '#A495D8',
    },
    background: {
      default: '#5c5757',
      paper: '#292626',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <ApiContext>
        <App />
      </ApiContext>
    </ ThemeProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
