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

function AgregarInsumos() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        idInsumo: '',
        nombre: '',
        descripcion: '',
        stock: ''
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value.toUpperCase() : value === '' ? null : value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        const insumoData = {
            ...formData,
        };

        try {
            const response = await axiosInstance.post('/insumos', insumoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Datos enviados:', response.data);
            navigate('/listado-insumos');
        } catch (error) {
            console.error('Error al enviar los datos:', error.response?.data || error.message);
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
                Agregar insumo
            </Typography>
            <Box
                component="form"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingInline: '6rem', paddingTop: '1.5rem', justifyContent: 'center' }}
            >
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.1rem' }}
                        >
                            Datos
                        </Typography>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Descripcion"
                            variant="outlined"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                        />

                        <TextField label="Stock" variant="outlined" name="stock" type="string" value={formData.stock} onChange={handleInputChange} />
                    </div>
                </div>


                <Stack direction="row" spacing={2} style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <Button variant="outlined" startIcon={<CancelOutlined />} sx={{ color: 'red', borderColor: 'red' }} onClick={() => navigate(-1)}>
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

export default AgregarInsumos;