import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';

function ChipLink({svg, label, link, active}) {
    const navigate = useNavigate();
    return (
        <Chip 
          icon={
            svg
          } 
          label={label}
          sx={{
            backgroundColor: theme => active 
            ? alpha(theme.palette.common.white, 0.25) 
            : alpha(theme.palette.common.white, 0.15),
            color: 'white',
            border: active ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
            boxShadow: active ? '0 0 4px rgba(255, 255, 255, 0.2)' : 'none',
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