import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#ff5722', // Naranja
    },
    background: {
      default: '#f4f4f4', // Fondo general
      paper: '#ffffff', // Fondo de elementos como Cards
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
