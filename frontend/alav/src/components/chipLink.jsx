import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';

function ChipLink({svg, label, link}) {
    const navigate = useNavigate();
    return (
        <Chip 
          icon={
            svg
          } 
          label={label}
          sx={{
            backgroundColor: theme => alpha(theme.palette.common.white, 0.15),
            color: 'white',
            padding: '0.5rem',
            borderRadius:'0.4rem',
            '& .MuiChip-icon': {
              color: 'white',
            },
            '&:hover': {
              backgroundColor: theme => alpha(theme.palette.common.white, 0.25),
            },
          }}
          onClick={() => navigate(`${link}`)}
        />
    );
}
  
export default ChipLink;