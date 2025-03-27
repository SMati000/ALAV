import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import axiosInstance from './../../axiosConfig';
import { Snackbar, Alert, AlertTitle } from '@mui/material'; 
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //const [notificaciones, setNotificaciones] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState("");

  const [notificaciones, setNotificaciones] = React.useState([
    {
      id: 1,
      departamento: "Mantenimiento",
      nroOrden: 12345,
      edicion: 2,
      fecha: "2025-03-27",
      trabajadores: "Juan Pérez, María López",
      fechaInicio: "2025-03-26",
      fechaFin: "2025-03-27",
      autorizadoPor: "Ing. Rodríguez",
      equipoProteccion: "Casco, guantes, gafas",
      descripcion: "Revisión de sistema eléctrico",
      estado: "FINALIZADA_TOTALMENTE",
      insumos: "Cableado, fusibles",
      trabajosPendientes: "Ninguno",
      posiblesMejoras: "Actualizar panel de control",
    },
    {
      id: 2,
      departamento: "Producción",
      nroOrden: 67890,
      edicion: 1,
      fecha: "2025-03-27",
      trabajadores: "Carlos Ruiz, Ana Torres",
      fechaInicio: "2025-03-26",
      fechaFin: "2025-03-28",
      autorizadoPor: "Ing. Fernández",
      equipoProteccion: "Botas de seguridad, chaleco",
      descripcion: "Mantenimiento de maquinaria pesada",
      estado: "EN PROCESO",
      insumos: "Lubricantes, herramientas",
      trabajosPendientes: "Revisión final",
      posiblesMejoras: "Mejorar sistema de ventilación",
    },
  ]);


  // React.useEffect(() => {
  //   const fetchMaquinas = async () => {
  //     try {
  //       const response = await axiosInstance.get('/tareas/mantenimiento');  
  //       setRows(response.data);  
  //     } catch (error) {
  //       console.error('Error al obtener las notificaciones:', error);
  //     }
  //   };
  //   fetchMaquinas(); 
  // }, []);

  React.useEffect(() => {
    if (notificaciones.length > 0) {
      const lastNotification = notificaciones[notificaciones.length - 1];
      setAlertMessage(`Tarea de mantenimiento nro ${lastNotification.nroOrden}`);
    }
  }, [notificaciones]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {alertMessage && (
        <Snackbar
          open={Boolean(alertMessage)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={() => setAlertMessage("")}
        >
          <Alert severity="warning" onClose={() => setAlertMessage("")}>
            <AlertTitle>{alertMessage}</AlertTitle>
            Revisar las notificaciones para más información.
          </Alert>
        </Snackbar>
      )}
      <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, cursor:'pointer' }}
            onClick={() => navigate('/')}
          >
            ALAV
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleClick}
            >
              <Badge badgeContent={notificaciones.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        id="notificaciones-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notificaciones.length === 0 ? (
          <MenuItem onClick={handleClose}>No hay notificaciones</MenuItem>
        ) : (
          notificaciones.map((notificacion, index) => (
            <MenuItem key={notificacion.id} onClick={() => navigate(`/descripcion-notificacion/${notificacion.id}`)} style={{display:'flex', flexDirection:'column'}}>
              <Typography variant="body2">
                Tarea de mantenimiento nro <b>{notificacion.nroOrden}</b>
              </Typography>
              <Typography variant="body2">
                Puede realizarla: {notificacion.trabajadores}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
}

export default Navbar;
