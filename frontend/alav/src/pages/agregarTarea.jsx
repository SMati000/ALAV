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
import axiosInstance from './../../axiosConfig';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import BotonAtras from '../components/botonAtras';

function AgregarTarea() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        unidad:'meses',
        periodicidad: '',
        descripcion: '',
        insumos: [],
        idMaquina: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
    const [insumos, setInsumos] = React.useState([]);
    const [maquinas, setMaquinas] = React.useState([]);

    React.useEffect(() => {
        const fetchInsumos = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/insumos');
                setInsumos(response.data);
            } catch (error) {
                console.error('Error al obtener los insumos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInsumos();
    }, []);

    React.useEffect(() => {
        const fetchMaquinas = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/maquinas');
                setMaquinas(response.data);
            } catch (error) {
                console.error('Error al obtener las maquinas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMaquinas();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value.toUpperCase() : value === '' ? null : value }));
    };

    const handleInsumosChange = (event) => {
        const {
          target: { value },
        } = event;
        setFormData((prevData) => ({
            ...prevData,
            insumos: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleChange = (event, nuevaUnidad) => {
        if (nuevaUnidad !== null) {
            setFormData({
                ...formData,
                unidad: nuevaUnidad,
            });
        }
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
        };

        try {
            await axiosInstance.post('/tareas', [data]);
            handleOpenSnackbar('Tarea guardada correctamente.', 'success');
            setBotonDeshabilitado(true); 
            setTimeout(() => {
                navigate('/listado-tarea'); 
            }, 2000);
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          handleOpenSnackbar('Ocurrió un error al guardar la tarea.', 'error');
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

    const camposObligatorios = ['descripcion', 'insumos', 'periodicidad', 'idMaquina'];
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
                        <div style={{display:'flex', justifyContent:'between', gap:'2rem'}}>
                            <div style={{display:'flex', gap:'1rem', width: '100%' }}>
                                <TextField label="Periodicidad" sx={{ width: '100%' }} variant="outlined" name="periodicidad" type="number" value={formData.periodicidad} onChange={handleInputChange} required/>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={formData.unidad}
                                    exclusive
                                    onChange={handleChange}
                                >
                                    <ToggleButton value="dias">DIAS</ToggleButton>
                                    <ToggleButton value="meses">MESES</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <TextField label="Descripción" sx={{ width: '100%' }}  variant="outlined" name="descripcion" value={formData.descripcion} onChange={handleInputChange} required />
                        </div>
                        
                        <div style={{display:'flex', gap:'2rem', width: '100%' }}>
                            <FormControl required sx={{ width: '100%' }}>
                                <InputLabel id="insumos-label">Insumos</InputLabel>
                                <Select
                                    labelId="insumos-label"
                                    id="insumos"
                                    value={formData.insumos}
                                    multiple
                                    label="Insumos"
                                    name="insumos"
                                    onChange={handleInsumosChange}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {insumos.map((insumo) => (
                                        <MenuItem key={insumo.id} value={insumo.nombre}>
                                            {insumo.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl required sx={{ width: '100%' }} >
                                <Autocomplete
                                    id="maquina"
                                    options={maquinas}
                                    getOptionLabel={(option) => option.codigo}
                                    value={maquinas.find((maq) => maq.id === formData.idMaquina) || null}
                                    onChange={(event, newValue) => {
                                        setFormData({
                                            ...formData,
                                            idMaquina: newValue ? newValue.id : '',
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Máquina *"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </FormControl>
                        </div>
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
  
export default AgregarTarea;