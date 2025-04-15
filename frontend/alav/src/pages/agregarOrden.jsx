import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CancelOutlined, SaveOutlined } from '@mui/icons-material';
import { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BotonAtras from '../components/botonAtras';

function AgregarOrden() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        departamento: '',
        edicion: null,
        autorizadoPor: '',
        trabajadores: '',
        equipoProteccion: '',
        trabajosPendientes: '',
        posiblesMejoras: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value.toUpperCase() : value === '' ? null : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCamposObligatorios()) {
            handleOpenSnackbar('Por favor, complete todos los campos obligatorios (*).', 'error');
            return;
        }
        setLoading(true);
        const data = {
            ...formData,
            insumos: insumos,
            nroOrden: formData.nroOrden ? Number(formData.nroOrden) : null,
            edicion: formData.edicion ? Number(formData.edicion) : null,
        };

        try {
            await axiosInstance.post('/tareas', [data]);
            handleOpenSnackbar('Orden guardada correctamente.', 'success');
            setBotonDeshabilitado(true); 
            setTimeout(() => {
                navigate('/listado-ordenes'); 
            }, 2000);
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          handleOpenSnackbar('Ocurrió un error al guardar la orden.', 'error');
        } finally {
            setLoading(false); 
        }
    };

    const handleOpenSnackbar = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };
    
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };    

    const camposObligatorios = ['descripcion', 'insumos', 'periodicidad'];
    const validarCamposObligatorios = () => {
        for (const campo of camposObligatorios) {
            const valor = formData[campo];
            if (typeof valor === 'string' && valor.trim() === '') {
                return false;
            }
            if (valor === null || valor === undefined) {
                return false;
            }
        }
 
        if (!formData.insumos || formData.insumos.length === 0) {
            return false;
        }
    
        return true;
    };

    return (
        <div style={{padding:'0', margin:'1rem'}}>
            <BotonAtras></BotonAtras>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbarSeverity} 
                    sx={{ width: '100%' }}
                    elevation={6}
                    variant="filled"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ 
                    display: { xs: 'none', sm: 'block' },  
                    fontWeight:'bold', 
                    textAlign:'center',
                    color:'white', 
                    backgroundColor:theme.palette.acento.main, 
                    padding:'1rem', 
                    letterSpacing:'0.1rem',
                }}
            >
                Agregar tarea
            </Typography>
            <Box
                component="form"
                style={{display:'flex', flexDirection:'column', gap:'1rem', paddingInline:'6rem', paddingTop:'1.5rem', justifyContent:'center'}}
            >
                <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%'}}>
                        <TextField label="Departamento" variant="outlined" name="departamento" value={formData.departamento} onChange={handleInputChange} />
                        <TextField label="Edición" variant="outlined" name="edicion" value={formData.edicion} onChange={handleInputChange}/>
                        <TextField label="Autorizado por" variant="outlined" name="autorizadoPor" value={formData.autorizadoPor} onChange={handleInputChange} />
                        <TextField label="Trabajadores" variant="outlined" name="trabajadores" value={formData.trabajadores} onChange={handleInputChange} />
                        <TextField label="Equipo de protección" variant="outlined" name="equipoProteccion" value={formData.equipoProteccion} onChange={handleInputChange} />
                        <TextField label="Trabajos pendientes" variant="outlined" name="trabajosPendientes" value={formData.trabajosPendientes} onChange={handleInputChange} />
                        <TextField label="Posibles mejoras" variant="outlined" name="posiblesMejoras" value={formData.posiblesMejoras} onChange={handleInputChange} />   
                    </div>
                </div>  

                <Stack direction="row" spacing={2} style={{display:'flex', justifyContent:'center', marginTop:'1.5rem'}}>
                    <Button variant="outlined" startIcon={<CancelOutlined />} sx={{color:'red', borderColor:'red'}} onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                    <Button variant="contained" startIcon={<SaveOutlined />} onClick={handleSubmit} disabled={botonDeshabilitado} loading={loading}>
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
  
export default AgregarOrden;