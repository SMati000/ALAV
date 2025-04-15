import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function DialogDelete({ open, setOpen, registros, registro, idRegistro, onDeleteSuccess = null }) {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [snackbarContent, setSnackbarContent] = useState(null);

    const handleClose = () => {
      setOpen(false);
    };

    const handleDelete = async (id) => {
        try {
          await axiosInstance.delete(`/${registros}/${id}`);

          if (onDeleteSuccess) {
            onDeleteSuccess(id);       
            setOpen(false);             
          } else {
            navigate(`/listado-${registro}`);
          }
        } catch (error) {
          const code = error?.response?.data?.code;
          if (code === '14') {
            setOpen(false); 
            const match = error?.response?.data?.message?.match(/\[([^\]]+)\]/);
            const tareas = match ? match[1].split(',') : [];
            let content;

            const handleClickTarea = () => {
              navigate(`/listado-tarea?ids=${tareas.join(',')}`);
            };

            if (tareas.length === 1) {
              content = (
                <>
                  No es posible borrar la máquina porque está asociada a la tarea {tareas[0].trim()}.{' '}
                  <span
                    onClick={handleClickTarea}
                    style={{ textDecoration: 'underline', cursor: 'pointer', color: '#fff' }}
                  >
                    Ver tarea
                  </span>
                </>
              );
            } else if (tareas.length > 1) {
              const lista = tareas.map(t => t.trim());
              const ultima = lista.pop();
            
              content = (
                <>
                  No es posible borrar la máquina porque está asociada a las tareas {lista.join(', ')} y {ultima}.{' '}
                  <span
                    onClick={handleClickTarea}
                    style={{ textDecoration: 'underline', cursor: 'pointer', color: '#fff' }}
                  >
                    Ver tareas
                  </span>
                </>
              );
            }            

            handleOpenSnackbar(content, 'error');
          } else {
            setOpen(false); 
            console.error(`Error al eliminar ${registro}:`, error);
            handleOpenSnackbar(`Ocurrió un error al eliminar ${registro}.`, 'error');
          }
        }
    };

    const handleOpenSnackbar = (content, severity = 'error') => {
      setSnackbarContent(content);
      setSnackbarSeverity(severity);
      setOpenSnackbar(true);
    };
  
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setOpenSnackbar(false);
    };

    return (
      <div>
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
            {snackbarContent}
          </MuiAlert>
        </Snackbar>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            {"¿Estás seguro de eliminar este registro?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se eliminará de forma permanente, sin posibilidad de recuperación.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="primary">Cancelar</Button>
            <Button onClick={() => handleDelete(idRegistro)} variant="contained" color="error" autoFocus>
              Borrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
     
    );
}
  
export default DialogDelete;