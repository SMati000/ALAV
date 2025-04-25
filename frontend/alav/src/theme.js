import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#EF8A17', // Naranja
    },
    acento:{
      main: '#4357AD' // Violeta
    },
    background: {
      default: '#f4f4f4', // Fondo general
      paper: '#ffffff', // Fondo de elementos como Cards, Tables, etc
      botonAgregar: 'rgb(40, 167, 69)',
      headerTable: '#1976d2',
      hover: 'rgb(23, 122, 46)',
      yellow: 'rgb(250, 166, 26)',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
