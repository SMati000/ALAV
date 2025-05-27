import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
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

function EditarTarea() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        unidad:'meses',
        periodicidad: '',
        descripcion: '',
        insumos: [],
        idMaquina: '',
        departamento: '',
        edicion: null,
        autorizadoPor: '',
        trabajadores: [],
        equipoProteccion: '',
        trabajosPendientes: '',
        posiblesMejoras: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
    const [insumos, setInsumos] = React.useState([]);
    const [trabajadores, setTrabajadores] = React.useState([]);
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
        const fetchTrabajadores = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/tecnicos');
                setTrabajadores(response.data);
            } catch (error) {
                console.error('Error al obtener los técnicos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrabajadores();
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

    React.useEffect(() => {
        const fetchTareaData = async () => {
            try {
                const response = await axiosInstance.get(`/tareas/${id}`);
                const tareaData = response.data;
                console.log(tareaData);
                setFormData({
                    periodicidad: tareaData.periodicidad,
                    descripcion: tareaData.descripcion,
                    unidad: tareaData.unidad,
                    insumos: tareaData.insumos,
                    idMaquina: tareaData.maquina.id,
                    departamento: tareaData.departamento,
                    edicion: tareaData.edicion,
                    autorizadoPor: tareaData.autorizadoPor,
                    trabajadores: tareaData.trabajadores,
                    equipoProteccion: tareaData.equipoProteccion,
                    trabajosPendientes: tareaData.trabajosPendientes,
                    posiblesMejoras: tareaData.posiblesMejoras,
                });
            } catch (error) {
                console.error('Error fetching tarea data:', error);
            }
        };

        fetchTareaData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'periodicidad') {
            const numericValue = Number(value);
            if (numericValue < 0) {
                handleOpenSnackbar('La periodicidad no puede ser un número negativo.', 'error');
                return;
            }
        }

        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value : value === '' ? null : value }));
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

    const handleUpdate = async (e) => {
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
            await axiosInstance.patch(`/tareas/${id}`, data);
            handleOpenSnackbar('Tarea modificada correctamente.', 'success');
            setBotonDeshabilitado(true); 
            setTimeout(() => {
                navigate('/listado-tarea'); 
            }, 2000);
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          handleOpenSnackbar('Ocurrió un error al modificar la tarea.', 'error');
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
                Editar tarea
            </Typography>
            <Box
                component="form"
                style={{display:'flex', flexDirection:'column', gap:'1rem', paddingInline:'6rem', paddingTop:'1.5rem', justifyContent:'center'}}
            >
                <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%'}}>
                        <div style={{display:'flex', justifyContent:'between', gap:'2rem'}}>
                            <div style={{display:'flex', gap:'2rem', width: '100%' }}>
                                <TextField label="Periodicidad" sx={{ width: '100%' }} variant="outlined" name="periodicidad" type="number" value={formData.periodicidad} onChange={handleInputChange} required inputProps={{ min: 0 }}/>
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
                            <Autocomplete
                                multiple
                                sx={{ width: '100%' }}
                                options={insumos}
                                getOptionLabel={(option) => `${option.nombre}`}
                                value={formData.insumos}
                                onChange={(event, newValue) => {
                                    setFormData({ 
                                        ...formData, 
                                        insumos: newValue,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        label="Insumos"
                                        variant="outlined"
                                    />
                                )}
                            />
                            <Autocomplete
                                id="maquina"
                                sx={{ width: '100%' }}
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
                                        required
                                        label="Máquina"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </div>
                        <div style={{width:'100%', display:'flex', gap:'2rem'}}>
                            <div style={{width:'100%', display:'flex', gap:'2rem'}}>
                                <TextField label="Departamento" sx={{ width: '100%' }} variant="outlined" name="departamento" value={formData.departamento} onChange={handleInputChange} />
                            </div>
                            
                            <div style={{width:'100%', display:'flex', gap:'2rem'}}>
                                <Autocomplete
                                    multiple
                                    sx={{ width: '100%' }}
                                    options={trabajadores}
                                    getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
                                    value={trabajadores.filter(t => 
                                        formData.trabajadores.some(trab => trab.id_tecnico === t.id_tecnico)
                                    )}
                                    onChange={(event, newValue) => {
                                        setFormData({ 
                                            ...formData, 
                                            trabajadores: newValue.map((trabajador) => ({ id_tecnico: trabajador.id_tecnico })),
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Trabajadores"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>
                        </div> 
                        <div style={{width:'100%', display:'flex', gap:'2rem'}}>
                            <TextField label="Edición" sx={{ width: '100%' }} variant="outlined" name="edicion" value={formData.edicion} onChange={handleInputChange}/>
                            <TextField label="Equipo de protección" sx={{ width: '100%' }}  variant="outlined" name="equipoProteccion" value={formData.equipoProteccion} onChange={handleInputChange} />
                        </div>   
                    </div>
                </div>  

                <Stack direction="row" spacing={2} style={{display:'flex', justifyContent:'center', marginTop:'1.5rem'}}>
                    <Button variant="outlined" startIcon={<CancelOutlined />} sx={{color:'red', borderColor:'red'}} onClick={() => navigate(-1)} disabled={botonDeshabilitado}>
                        Cancelar
                    </Button>
                    <Button variant="contained" startIcon={<SaveOutlined />} onClick={handleUpdate} disabled={botonDeshabilitado} loading={loading}>
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
  
export default EditarTarea;