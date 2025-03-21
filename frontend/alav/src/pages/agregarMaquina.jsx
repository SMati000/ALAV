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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImage(imageUrl);
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
                        <TextField label="Modelo" variant="outlined" />
                        <TextField label="Número de serie" variant="outlined" />
                        <TextField label="Marca" variant="outlined" />
                        <TextField label="Fecha de fabricación" variant="outlined" />
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
                        <TextField label="Código" variant="outlined" />
                        <TextField label="Descripción" variant="outlined" />
                        <TextField label="Planta" variant="outlined" />
                        <TextField label="Área" variant="outlined" />
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
                        />
                        <TextField
                            label="Tensión"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[V]</InputAdornment>,
                                },
                            }}
                        />
                        <TextField
                            label="Potencia"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[Kw]</InputAdornment>,
                                },
                            }}
                        />
                        <TextField
                            label="Presión"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[bar]</InputAdornment>,
                                },
                            }}
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
                        />
                        <TextField
                            label="Ancho"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[mm]</InputAdornment>,
                                },
                            }}
                        />
                        <TextField
                            label="Largo"
                            slotProps={{
                                input: {
                                endAdornment: <InputAdornment position="end">[mm]</InputAdornment>,
                                },
                            }}
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
                        <TextField label="Criticidad" variant="outlined" />
                        <TextField label="Modelo de mantenimiento" variant="outlined" />
                        <TextField
                            label="Funcionamiento"
                            multiline
                            maxRows={6}
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
                    <Button variant="contained" startIcon={<SaveOutlined />}>
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
  
export default AgregarMaquina;