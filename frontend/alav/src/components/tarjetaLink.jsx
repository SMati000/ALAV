import * as React from 'react';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function TarjetaLink({svg, label, link}) {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }} onClick={() => navigate(`${link}`)}>
          <CardActionArea 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              '& svg': {
                transition: 'transform 0.3s ease',
              },
              '&:hover svg': {
                transform: 'scale(1.1)',
              },
            }}
          >
            {svg}
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                {label}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
}
  
export default TarjetaLink;