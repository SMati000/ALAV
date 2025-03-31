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
        fechaFabricacion: new Date().toISOString().split('T')[0],
        codigo: '',
        descripcion: '',
        funcionamiento: '',
        planta: null,
        area: '',
        corriente: null,
        tension: null,
        potencia: null,
        presion: null,
        altura: null,
        ancho: null,
        largo: null,
        criticidad: '',
        modeloMantenimiento: '',
        imagenDirec: null,
        manualDirec: '',
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); 
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value.toUpperCase() : value === '' ? null : value }));
    };

    const handleSubmit = async () => {
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
            console.log('Datos enviados:', response.data);
            navigate('/listado-maquina'); 
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div style={{padding:'0', margin:'1rem'}}>
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
                        <TextField label="Modelo" variant="outlined" name="modelo" value={formData.modelo} onChange={handleInputChange} />
                        <TextField label="Número de serie" variant="outlined" name="nroSerie" value={formData.nroSerie} onChange={handleInputChange} />
                        <TextField label="Marca" variant="outlined" />
                        <TextField label="Fecha de fabricación" variant="outlined" name="fechaFabricacion" type="date" value={formData.fechaFabricacion} onChange={handleInputChange} />
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
                        <TextField label="Código" variant="outlined" name="codigo" value={formData.codigo} onChange={handleInputChange} />
                        <TextField label="Descripción" variant="outlined" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                        <TextField label="Planta" variant="outlined" name="planta" value={formData.planta} onChange={handleInputChange} />
                        <TextField label="Área" variant="outlined" name="area" value={formData.area} onChange={handleInputChange} />
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
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[A]</InputAdornment>,
                                },
                            }}
                            name="corriente" value={formData.corriente} onChange={handleInputChange}
                        />
                        <TextField
                            label="Tensión"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[V]</InputAdornment>,
                                },
                            }}
                            name="tension" value={formData.tension} onChange={handleInputChange}
                        />
                        <TextField
                            label="Potencia"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[Kw]</InputAdornment>,
                                },
                            }}
                            name="potencia" value={formData.potencia} onChange={handleInputChange}
                        />
                        <TextField
                            label="Presión"
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
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[mm]</InputAdornment>,
                                },
                            }}
                            name="altura" value={formData.altura} onChange={handleInputChange}
                        />
                        <TextField
                            label="Ancho"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[mm]</InputAdornment>,
                                },
                            }}
                            name="ancho" value={formData.ancho} onChange={handleInputChange}
                        />
                        <TextField
                            label="Largo"
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
                        <FormControl>
                            <InputLabel id="criticidad-label">Criticidad</InputLabel>
                            <Select
                                labelId="criticidad-label"
                                value={formData.criticidad}
                                label="Criticidad"
                                name="criticidad"
                                onChange={handleInputChange}
                            >
                                <MenuItem value={1}>Alta</MenuItem>
                                <MenuItem value={2}>Media</MenuItem>
                                <MenuItem value={3}>Baja</MenuItem>
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
                                onChange={handleFileChange}
                            />
                        </Button>
                    </div>

                    {image && (
                        <div style={{marginTop:'1rem', display:'flex', justifyContent:'center'}}>
                            <img src={image} alt="Previsualización" style={{ maxWidth: '100%', width:'30rem', height: 'auto' }} />
                        </div>
                    )}
                </div>     

                <Stack direction="row" spacing={2} style={{display:'flex', justifyContent:'center', marginTop:'1.5rem'}}>
                    <Button variant="outlined" startIcon={<CancelOutlined />} sx={{color:'red', borderColor:'red'}} onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                    <Button variant="contained" startIcon={<SaveOutlined />} onClick={handleSubmit} loading={loading}>
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
  
export default AgregarMaquina;