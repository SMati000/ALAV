import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

function BotonAtras({link}) {
    const navigate = useNavigate();
    return (
        <Button variant="outlined" startIcon={<ArrowBackIcon />} style={{marginBottom:'1rem', width:'7rem'}} onClick={() => navigate(link ?? -1)}>Volver</Button>
    );
}
  
export default BotonAtras;