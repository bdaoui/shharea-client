import { createTheme } from "@mui/material";

export const theme = createTheme ({
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
          default: '#4c4a4a',
          paper: '#0c0c0c',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(84,84,84,0.7)',
        },

        type: 'light',
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
          default: '#9a9a9a',
          paper: '#ffffff',
        },
        text: {
          primary: '#000000',
          secondary: 'rgba(84,84,84,0.7)',
        },
    },  
});