import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';

function DialogDelete({ open, setOpen, registros, registro, idRegistro, onDeleteSuccess = null }) {
    const navigate = useNavigate();
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
          console.error(`Error al eliminar ${registro}:`, error);
        }
    };

    return (
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
    );
}
  
export default DialogDelete;