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

function AgregarTarea() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        departamento: '',
        nroOrden: null,
        edicion: null,
        fecha: '',
        trabajadores: '',
        fechaInicio: '',
        fechaFin: '',
        autorizadoPor: '',
        equipoProteccion: '',
        descripcion: '',
        estado: '',
        insumos: '',
        trabajosPendientes: '',
        posiblesMejoras: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value.toUpperCase() : value === '' ? null : value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            ...formData,
            nroOrden: formData.nroOrden ? Number(formData.nroOrden) : null,
            edicion: formData.edicion ? Number(formData.edicion) : null,
        };

        try {
          await axiosInstance.post('/tareas', [data]);
          navigate('/listado-tarea'); 
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
                Agregar tarea
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
                            Información general
                        </Typography>
                        <TextField label="Departamento" variant="outlined" name="departamento" value={formData.departamento} onChange={handleInputChange} />
                        <TextField label="Número de orden" variant="outlined" name="nroOrden" value={formData.nroOrden} onChange={handleInputChange} />
                        <TextField label="Edición" variant="outlined" name="edicion" value={formData.edicion} onChange={handleInputChange}/>
                        <TextField label="Fecha de mantenimiento" variant="outlined" name="fecha" type="date" value={formData.fecha} onChange={handleInputChange} />
                        <TextField label="Fecha de inicio" variant="outlined" name="fechaInicio" type="date" value={formData.fechaInicio} onChange={handleInputChange} />
                        <TextField label="Fecha de fin" variant="outlined" name="fechaFin" type="date" value={formData.fechaFin} onChange={handleInputChange} />
                        <TextField label="Autorizado por" variant="outlined" name="autorizadoPor" value={formData.autorizadoPor} onChange={handleInputChange} />
                    </div>
        
        
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%'}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main, letterSpacing:'0.1rem'}}
                        >
                            Detalles
                        </Typography>
                        <TextField label="Trabajadores" variant="outlined" name="trabajadores" value={formData.trabajadores} onChange={handleInputChange} />
                        <TextField label="Equipo de protección" variant="outlined" name="equipoProteccion" value={formData.equipoProteccion} onChange={handleInputChange} />
                        <TextField label="Estado" variant="outlined" name="estado" value={formData.estado} onChange={handleInputChange} />
                        <TextField label="Insumos" variant="outlined" name="insumos" value={formData.insumos} onChange={handleInputChange} />
                        <TextField label="Trabajos pendientes" variant="outlined" name="trabajosPendientes" value={formData.trabajosPendientes} onChange={handleInputChange} />
                        <TextField label="Posibles mejoras" variant="outlined" name="posiblesMejoras" value={formData.posiblesMejoras} onChange={handleInputChange} />   
                        <TextField label="Descripción" variant="outlined" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                    </div>
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
  
export default AgregarTarea;