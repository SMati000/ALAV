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
import BotonAtras from '../components/botonAtras';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AgregarTecnicos() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: null,
        puesto: null,
        codigo: null,
        fecha_creacion: null,
        fecha_revision: null,
        nivel: null,
        area: null,
        redactor: '',
        salario: null,
        supervisor_inmediato: null,
        objetivo_puesto: null,
        funciones: null,
        responsabilidades: null,
        herramientas: null,
        condiciones_extras: null,
        autoridad: null,
        relaciones_formales: null,
        ambiente_fisico: null,
        formacion: null,
        conocimiento_especifico: null,
        experiencia: null,
        requerimiento_fisico: null,
        habilidades_actitudes: null,
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value.toUpperCase() : value === '' ? null : value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validarCamposObligatorios()) {
            handleOpenSnackbar('Por favor, complete todos los campos obligatorios (*).', 'error');
            return;
        }
        setLoading(true);

        const tecnicoData = {
            ...formData,
            dni: formData.dni ? Number(formData.dni) : null,
            puesto: formData.puesto ? String(formData.puesto) : null,
            codigo: formData.codigo ? Number(formData.codigo) : null,
            fecha_creacion: formData.fecha_creacion ? Date(formData.fecha_creacion) : null,
            fecha_revision: formData.fecha_revision ? Date(formData.fecha_revision) : null,
            nivel: formData.nivel ? String(formData.nivel) : null,
            area: formData.area ? String(formData.area) : null,
            salario: formData.salario ? Number(formData.salario) : null,
            supervisor_inmediato: formData.supervisor_inmediato ? String(formData.supervisor_inmediato) : null,
            objetivo_puesto: formData.objetivo_puesto ? String(formData.objetivo_puesto) : null,
            funciones: formData.funciones ? String(formData.funciones) : null,
            responsabilidades: formData.responsabilidades ? String(formData.responsabilidades) : null,
            herramientas: formData.herramientas ? String(formData.herramientas) : null,
            condiciones_extras: formData.condiciones_extras ? String(formData.condiciones_extras) : null,
            autoridad: formData.autoridad ? String(formData.autoridad) : null,
            relaciones_formales: formData.relaciones_formales ? String(formData.relaciones_formales) : null,
            ambiente_fisico: formData.ambiente_fisico ? String(formData.ambiente_fisico) : null,
            formacion: formData.formacion ? String(formData.formacion) : null,
            conocimiento_especifico: formData.conocimiento_especifico ? String(formData.conocimiento_especifico) : null,
            experiencia: formData.experiencia ? String(formData.experiencia) : null,
            requerimiento_fisico: formData.requerimiento_fisico ? String(formData.requerimiento_fisico) : null,
            habilidades_actitudes: formData.habilidades_actitudes ? String(formData.habilidades_actitudes) : null,
        };
        
        try {
            const response = await axiosInstance.post('/tecnicos', tecnicoData);
            handleOpenSnackbar('Tecnico guardado correctamente.', 'success');
            setBotonDeshabilitado(true);
            setTimeout(() => {
                navigate('/listado-tecnicos');
            }, 2000);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            handleOpenSnackbar('Ocurrió un error al guardar el tecnico.', 'error');
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

    const camposObligatorios = ['nombre', 'apellido', 'redactor'];
    const validarCamposObligatorios = () => {
        for (let campo of camposObligatorios) {
            if (!formData[campo] || formData[campo].trim() === '') {
                return false;
            }
        }
        return true;
    };
    return (
        <div style={{ padding: '0', margin: '1rem' }}>
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
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: theme.palette.acento.main,
                    padding: '1rem',
                    letterSpacing: '0.1rem',
                }}
            >
                Agregar Técnico
            </Typography>
            <Box
                component="form"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingInline: '6rem', paddingTop: '1.5rem', justifyContent: 'center' }}
            >
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', paddingTop: '1rem' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.1rem' }}
                        >
                            Identificación
                        </Typography>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '49%' }}>
                                <TextField label="Nombre" variant="outlined" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                                <TextField label="Apellido" variant="outlined" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
                                <TextField label="DNI" variant="outlined" name="dni" value={formData.dni} type="number" onChange={handleInputChange} inputProps={{ min: 0 }} />
                                <TextField label="Puesto" variant="outlined" name="puesto" value={formData.puesto} onChange={handleInputChange} />
                                <TextField label="Código" variant="outlined" name="codigo" type="number" value={formData.codigo} onChange={handleInputChange} inputProps={{ min: 0 }} />
                                <TextField label="Fecha de creación" variant="outlined" name="fecha_creacion" type="date" value={formData.fecha_creacion} onChange={handleInputChange} 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '49%' }}>
                                <TextField label="Fecha de revisión" variant="outlined" name="fecha_revision" type="date" value={formData.fecha_revision} onChange={handleInputChange} 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                                <TextField label="Nivel" variant="outlined" name="nivel" value={formData.nivel} onChange={handleInputChange} />
                                <TextField label="Área" variant="outlined" name="area" value={formData.area} onChange={handleInputChange} />
                                <TextField label="Redactor" variant="outlined" name="redactor" value={formData.redactor} onChange={handleInputChange} required />
                                <TextField label="Salario" variant="outlined" name="salario" type="number" value={formData.salario} onChange={handleInputChange} inputProps={{ min: 0 }} />
                                <TextField label="Superior inmediato" variant="outlined" name="supervisor_inmediato" value={formData.supervisor_inmediato} onChange={handleInputChange} />
                            </div>
                        </div>

                    </div>

                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%', paddingTop: '1rem' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.1rem' }}
                        >
                            Descripción
                        </Typography>
                        <TextField label="Objetivo del puesto" variant="outlined" name="objetivo_puesto" value={formData.objetivo_puesto} onChange={handleInputChange} />
                        <TextField label="Funciones" variant="outlined" name="funciones" value={formData.funciones} onChange={handleInputChange} />
                        <TextField label="Responsabilidades" variant="outlined" name="responsabilidades" value={formData.responsabilidades} onChange={handleInputChange} />
                        <TextField label="Autoridad" variant="outlined" name="autoridad" value={formData.autoridad} onChange={handleInputChange} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%', paddingTop: '1rem' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.1rem' }}
                        >
                            Dimensiones
                        </Typography>
                        <TextField label="Relaciones formales" variant="outlined" name="relaciones_formales" value={formData.relaciones_formales} onChange={handleInputChange} />
                        <TextField label="Herramientas" variant="outlined" name="herramientas" value={formData.herramientas} onChange={handleInputChange} />
                        <TextField label="Otras condiciones" variant="outlined" name="condiciones_extras" value={formData.condiciones_extras} onChange={handleInputChange} />
                        <TextField label="Ambiente físico" variant="outlined" name="ambiente_fisico" value={formData.ambiente_fisico} onChange={handleInputChange} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', paddingTop: '1rem' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.1rem' }}
                        >
                            Perfil de puesto
                        </Typography>
                        <TextField label="Formación" variant="outlined" name="formacion" value={formData.formacion} onChange={handleInputChange} />
                        <TextField label="Conocimiento específico" variant="outlined" name="conocimiento_especifico" value={formData.conocimiento_especifico} onChange={handleInputChange} />
                        <TextField label="Experiencia" variant="outlined" name="experiencia" value={formData.experiencia} onChange={handleInputChange} />
                        <TextField label="Requerimiento físico" variant="outlined" name="requerimiento_fisico" value={formData.requerimiento_fisico} onChange={handleInputChange} />
                        <TextField label="Habilidades y actitudes" variant="outlined" name="habilidades_actitudes" value={formData.habilidades_actitudes} onChange={handleInputChange} />

                    </div>


                </div>
                <Stack direction="row" spacing={2} style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <Button variant="outlined" startIcon={<CancelOutlined />} sx={{ color: 'red', borderColor: 'red' }} onClick={() => navigate(-1)}>
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

export default AgregarTecnicos;