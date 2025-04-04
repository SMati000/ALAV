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
import { useParams } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';

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

function EditarTecnico() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        puesto: '',
        codigo: '',
        fecha_creacion: '',
        fecha_revision: '',
        nivel: '',
        area: '',
        redactor: '',
        salario: '',
        supervisor_inmediato: '',
        objetivo_puesto: '',
        funciones: '',
        responsabilidades: '',
        herramientas: '',
        condiciones_extras: '',
        autoridad: '',
        relaciones_formales: '',
        ambiente_fisico: '',
        formacion: '',
        conocimiento_especifico: '',
        experiencia: '',
        requerimiento_fisico: '',
        habilidades_actitudes: '',
    });

    React.useEffect(() => {
        const fetchdatosTecnico = async () => {
            try {
                const response = await axiosInstance.get(`/tecnicos/${id}`);
                const datosTecnico = response.data;
                setFormData({
                    nombre: datosTecnico.nombre || '',
                    apellido: datosTecnico.apellido || '',
                    dni: datosTecnico.dni || '',
                    fecha_creacion: datosTecnico.fecha_creacion || '',
                    fecha_revision: datosTecnico.fecha_revision || '',
                    nivel: datosTecnico.nivel || '',
                    area: datosTecnico.area || '',
                    redactor: datosTecnico.redactor || '',
                    salario: datosTecnico.salario || '',
                    supervisor_inmediato: datosTecnico.supervisor_inmediato || '',
                    objetivo_puesto: datosTecnico.objetivo_puesto || '',
                    funciones: datosTecnico.funciones || '',
                    responsabilidades: datosTecnico.responsabilidades || '',
                    herramientas: datosTecnico.herramientas || '',
                    condiciones_extras: datosTecnico.condiciones_extras || '',
                    autoridad: datosTecnico.autoridad || '',
                    relaciones_formales: datosTecnico.relaciones_formales || '',
                    ambiente_fisico: datosTecnico.ambiente_fisico || '',
                    formacion: datosTecnico.formacion || '',
                    conocimiento_especifico: datosTecnico.conocimiento_especifico || '',
                    experiencia: datosTecnico.experiencia || '',
                    requerimiento_fisico: datosTecnico.requerimiento_fisico || '',
                    habilidades_actitudes: datosTecnico.habilidades_actitudes || '',
                });
            } catch (error) {
                console.error('Error al obtener datos del técnico:', error);
            }
        };

        fetchdatosTecnico();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value === '' ? '' : value.toUpperCase(),
        }));
    };


    const handleUpdate = async (event) => {
        event.preventDefault();
        const data = {
            ...formData,
            condiciones_extras: formData.condiciones_extras ? String(formData.condiciones_extras) : null,
        };
        try {
            const response = await axiosInstance.patch(`/tecnicos/${id}`, data);
            console.log('Datos enviados:', response.data);
            navigate('/listado-tecnicos');
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '0', margin: '1rem' }}>
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
                Editar técnico
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
                                <TextField label="Nombre" variant="outlined" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                                <TextField label="Apellido" variant="outlined" name="apellido" value={formData.apellido} onChange={handleInputChange} />
                                <TextField label="DNI" variant="outlined" name="dni" value={formData.dni} type="number" onChange={handleInputChange} inputProps={{ min: 0 }} />
                                <TextField label="Puesto" variant="outlined" name="puesto" value={formData.puesto} onChange={handleInputChange} />
                                <TextField label="Código" variant="outlined" name="codigo" type="number" value={formData.codigo} onChange={handleInputChange} inputProps={{ min: 0 }} />
                                <TextField label="Fecha de creación" variant="outlined" name="fecha_creacion" type="date" value={formData.fecha_creacion} onChange={handleInputChange} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '49%' }}>
                                <TextField label="Fecha de revisión" variant="outlined" name="fecha_revision" type="date" value={formData.fecha_revision} onChange={handleInputChange} />
                                <TextField label="Nivel" variant="outlined" name="nivel" value={formData.nivel} onChange={handleInputChange} />
                                <TextField label="Área" variant="outlined" name="area" value={formData.area} onChange={handleInputChange} />
                                <TextField label="Redactor" variant="outlined" name="redactor" value={formData.redactor} onChange={handleInputChange} />
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', paddingTop: '1rem'}}>
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
                    <Button variant="contained" startIcon={<SaveOutlined />} onClick={handleUpdate} loading={loading}>
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default EditarTecnico;