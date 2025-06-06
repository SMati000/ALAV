import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CancelOutlined, SaveOutlined } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import axiosInstance from './../../axiosConfig';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import BotonAtras from '../components/botonAtras';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AgregarMaquina() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        modelo: '',
        nroSerie: '',
        codigo: '',
        descripcion: '',
        funcionamiento: '',
        planta: null,
        area: '',
        corriente: '',
        tension: '',
        potencia: '',
        presion: '',
        altura: '',
        ancho: '',
        largo: '',
        criticidad: '',
        modeloMantenimiento: '',
        imagenDirec: null,
        manualDirec: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); 
        }
    }

    const valoresNumericos = ['corriente','tension','potencia','presion','altura','ancho','largo'];
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (valoresNumericos.includes(name)) {
            const numericValue = Number(value);
            if (numericValue < 0) {
                handleOpenSnackbar(`El campo ${name} no puede ser un número negativo.`, 'error');
                return;
            }
        }

        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value : value === '' ? null : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCamposObligatorios()) {
            handleOpenSnackbar('Por favor, complete todos los campos obligatorios (*).', 'error');
            return;
        }
        setLoading(true);
        const formDataToSend = new FormData();
    
        const maquinaData = {
            ...formData,
            planta: formData.planta ? Number(formData.planta) : null,
            corriente: formData.corriente ? Number(formData.corriente) : null,
            tension: formData.tension ? Number(formData.tension) : null,
            potencia: formData.potencia ? Number(formData.potencia) : null,
            presion: formData.presion ? Number(formData.presion) : null,
            altura: formData.altura ? Number(formData.altura) : null,
            ancho: formData.ancho ? Number(formData.ancho) : null,
            largo: formData.largo ? Number(formData.largo) : null,
            
        };
        formDataToSend.append('maquina', new Blob([JSON.stringify(maquinaData)], { type: 'application/json' }));
       
        if (image) {
            formDataToSend.append('imagen', image, image.name);
        }
    
        try {
            const response = await axiosInstance.post('/maquinas', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleOpenSnackbar('Máquina guardada correctamente.', 'success');
            setBotonDeshabilitado(true); 
            setTimeout(() => {
                navigate('/listado-maquina');
            }, 2000);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            handleOpenSnackbar('Ocurrió un error al guardar la máquina.', 'error');
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

    const camposObligatorios = ['modelo', 'area', 'codigo', 'criticidad'];
    const validarCamposObligatorios = () => {
        for (let campo of camposObligatorios) {
            if (!formData[campo] || formData[campo].trim() === '') {
                return false;
            }
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
                Agregar máquina
            </Typography>
            <Box
                component="form"
                style={{display:'flex', flexDirection:'column', gap:'1rem', paddingInline:'6rem', paddingTop:'1.5rem', justifyContent:'center'}}
            >
                <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%'}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main, letterSpacing:'0.1rem'}}
                        >
                            Fabricante
                        </Typography>
                        <TextField label="Modelo" variant="outlined" name="modelo" value={formData.modelo} onChange={handleInputChange} required />
                        <TextField label="Número de serie" variant="outlined" name="nroSerie" value={formData.nroSerie} onChange={handleInputChange} />
                        <TextField label="Marca" variant="outlined" name="marca" value={formData.marca} onChange={handleInputChange} />
                    </div>
        
        
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%'}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main, letterSpacing:'0.1rem'}}
                        >
                            Equipo
                        </Typography>
                        <TextField label="Código" variant="outlined" name="codigo" value={formData.codigo} onChange={handleInputChange} required />
                        <TextField label="Área" variant="outlined" name="area" value={formData.area} onChange={handleInputChange} required />
                        <TextField label="Descripción" variant="outlined" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                        <TextField label="Planta" variant="outlined" name="planta" value={formData.planta} onChange={handleInputChange} />
                    </div>
                    
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%'}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main, letterSpacing:'0.1rem'}}
                        >
                            Técnico
                        </Typography>
                        <TextField
                            label="Corriente"
                            type="number"
                            inputProps={{ min: 0 }}
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[A]</InputAdornment>,
                                },
                            }}
                            name="corriente" value={formData.corriente} onChange={handleInputChange}
                        />
                        <TextField
                            label="Tensión"
                            type="number"
                            inputProps={{ min: 0 }}
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[V]</InputAdornment>,
                                },
                            }}
                            name="tension" value={formData.tension} onChange={handleInputChange}
                        />
                        <TextField
                            label="Potencia"
                            type="number"
                            inputProps={{ min: 0 }}
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[Kw]</InputAdornment>,
                                },
                            }}
                            name="potencia" value={formData.potencia} onChange={handleInputChange}
                        />
                        <TextField
                            label="Presión"
                            type="number"
                            inputProps={{ min: 0 }}
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[bar]</InputAdornment>,
                                },
                            }}
                            name="presion" value={formData.presion} onChange={handleInputChange}
                        />
                    </div>
                </div>
    
                <div style={{display:'flex', gap:'1rem'}}>
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%', paddingTop:'1rem'}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main, letterSpacing:'0.1rem'}}
                        >
                            Dimensiones
                        </Typography>
                        <TextField
                            label="Altura"
                            type="number"
                            inputProps={{ min: 0 }}
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[mm]</InputAdornment>,
                                },
                            }}
                            name="altura" value={formData.altura} onChange={handleInputChange}
                        />
                        <TextField
                            label="Ancho"
                            type="number"
                            inputProps={{ min: 0 }}
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[mm]</InputAdornment>,
                                },
                            }}
                            name="ancho" value={formData.ancho} onChange={handleInputChange}
                        />
                        <TextField
                            label="Largo"
                            type="number"
                            inputProps={{ min: 0 }}
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[mm]</InputAdornment>,
                                },
                            }}
                            name="largo" value={formData.largo} onChange={handleInputChange}
                        />
                    </div>
        
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%', paddingTop:'1rem'}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main, letterSpacing:'0.1rem'}}
                        >
                            Planificación
                        </Typography>
                        <FormControl required>
                            <InputLabel id="criticidad-label">Criticidad</InputLabel>
                            <Select
                                labelId="criticidad-label"
                                value={formData.criticidad}
                                label="Criticidad"
                                name="criticidad"
                                onChange={handleInputChange}
                            >
                                <MenuItem value={"ALTA"}>Alta</MenuItem>
                                <MenuItem value={"MEDIA"}>Media</MenuItem>
                                <MenuItem value={"BAJA"}>Baja</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Modelo de mantenimiento" variant="outlined" name="modeloMantenimiento" value={formData.modeloMantenimiento} onChange={handleInputChange} />
                        <TextField
                            label="Funcionamiento"
                            multiline
                            maxRows={6}
                            name="funcionamiento" value={formData.funcionamiento} onChange={handleInputChange} 
                        />
                    </div>
                </div>

                <div style={{display:'flex', flexDirection:'column', marginTop:'1rem'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{width:'20rem'}}
                        >
                            Elegir imagen
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                    </div>

                    {image && (
                        <Box mt={2} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle1">Previsualización de la imagen</Typography>
                            <img 
                                src={URL.createObjectURL(image)} 
                                alt="Previsualización" 
                                style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain', border: '1px solid #ccc', borderRadius: '4px' }} 
                            />
                        </Box>
                    )} 
                </div>    

                <Stack direction="row" spacing={2} style={{display:'flex', justifyContent:'center', marginTop:'1.5rem'}}>
                    <Button variant="outlined" startIcon={<CancelOutlined />} sx={{color:'red', borderColor:'red'}} onClick={() => navigate(-1)} disabled={botonDeshabilitado}>
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
  
export default AgregarMaquina;