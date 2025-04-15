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
      botonAgregar: '#558b2f',
      headerTable: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
