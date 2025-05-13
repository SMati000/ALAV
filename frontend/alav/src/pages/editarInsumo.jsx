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

function EditarInsumo() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        idInsumo: '',
        nombre: '',
        descripcion: '',
        stock: ''
    });

    React.useEffect(() => {
        const fetchInsumoData = async () => {
            try {
                const response = await axiosInstance.get(`/insumos/${id}`);
                const InsumoData = response.data;
                setFormData({
                    idInsumo: InsumoData.idInsumo || '',
                    nombre: InsumoData.nombre || '',
                    descripcion: InsumoData.descripcion || '',
                    stock: InsumoData.stock || ''
                });
            } catch (error) {
                console.error('Error fetching insumos data:', error);
            }
        };

        fetchInsumoData();
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: typeof value === 'string' ? value.toUpperCase() : value === '' ? null : value }));
    };

    const handleUpdate = async () => {
        setLoading(true);
        const data = {
            ...formData
        };
        try {
            const response = await axiosInstance.patch(`/insumos/${id}`, data);
            console.log('Datos enviados:', response.data);
            navigate('/listado-insumos');
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
                Editar insumos
            </Typography>
            <Box
                component="form"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingInline: '6rem', paddingTop: '1.5rem', justifyContent: 'center' }}
            >
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
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
                    <Button variant="outlined" startIcon={<CancelOutlined />} sx={{ color: 'red', borderColor: 'red' }} onClick={() => navigate(-1)} disabled={botonDeshabilitado}>
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

export default EditarInsumo;