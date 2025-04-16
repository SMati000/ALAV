import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import axiosInstance from './../../axiosConfig';
import DialogDelete from '../components/dialogDelete';
import BotonAtras from './../components/botonAtras';

function EditToolbar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <GridToolbarContainer
      sx={{
        padding: '1rem',
      }}
    >
      <Button
        color="primary"
        variant="contained"
        sx={{ fontWeight: 'bold', backgroundColor: theme.palette.background.botonAgregar }}
        startIcon={<AddIcon />}
        onClick={() => navigate('/agregar-tecnicos')} >
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}


const ListadoTecnicos = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedTechnician, setSelectedTechnician] = React.useState(null);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const theme = useTheme();

  React.useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/tecnicos');
        setRows(response.data);
      } catch (error) {
        console.error('Error al obtener los técnicos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTecnicos();
  }, []);

  const handleOpen = (technician) => {
    setSelectedTechnician(technician);
    setOpen(true);
  };

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id_tecnico !== id));
  };

  const columns = [
    {
      field: 'codigo',
      headerName: 'CÓDIGO',
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'apellido',
      headerName: 'APELLIDO',
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'area',
      headerName: 'ÁREA',
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "detalles",
      headerName: "DETALLES",
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(params.row)}
        >
          Ver detalles
        </Button>
      ),
    },
    {
      field: 'acciones',
      type: 'actions',
      headerName: 'ACCIONES',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/editar-tecnico/${params.id}`);
          }}
          sx={{ color: 'rgb(0, 123, 255)' }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Borrar"
          onClick={(event) => {
            event.stopPropagation();
            setIdSeleccionado(params.id);
            setOpenDialog(true);
          }}
          sx={{ color: 'rgb(220, 53, 69)' }}
        />,
      ],


    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        paddingInline: '2rem',
        paddingTop: '2rem',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <BotonAtras link={'/'}></BotonAtras>
      <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}></div>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.15rem', marginBlock: '1rem' }}
      >
        TÉCNICOS
      </Typography>



      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id_tecnico}
        slots={{
          toolbar: EditToolbar,
        }}
        disableSelectionOnClick
        hideFooterPagination
        pagination={false}
        checkboxSelection={false}
        loading={loading}
        hideFooter={true}
        sx={{
          flexGrow: 1,
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            backgroundColor: theme.palette.background.headerTable,
            padding: '0',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '0.1rem',
          },
          '& .MuiDataGrid-columnHeader': {
            padding: '0',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-row :not(.MuiDataGrid-cell.actions)': {
            cursor: 'pointer',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiInputBase-input': {
            textAlign: 'center',
          },
        }}
      />
      <DialogDelete
        open={openDialog}
        setOpen={setOpenDialog}
        registros="tecnicos"
        registro="tecnicos"
        idRegistro={idSeleccionado}
        onDeleteSuccess={eliminarFila}
      />


      {selectedTechnician && (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Puesto - {selectedTechnician.name}</DialogTitle>
          <DialogContent dividers>
            <Table>
              <TableBody>
                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Identificación</Typography></TableCell></TableRow>
                <TableRow><TableCell>Nombre</TableCell><TableCell>{selectedTechnician.nombre}</TableCell></TableRow>
                <TableRow><TableCell>Apellido</TableCell><TableCell>{selectedTechnician.apellido}</TableCell></TableRow>
                <TableRow><TableCell>DNI</TableCell><TableCell>{selectedTechnician.dni}</TableCell></TableRow>
                <TableRow><TableCell>Fecha de creación</TableCell><TableCell>{selectedTechnician.fecha_creacion}</TableCell></TableRow>
                <TableRow><TableCell>Fecha de revisión</TableCell><TableCell>{selectedTechnician.fecha_revision}</TableCell></TableRow>
                <TableRow><TableCell>Grado o nivel del puesto</TableCell><TableCell>{selectedTechnician.nivel}</TableCell></TableRow>
                <TableRow><TableCell>Código</TableCell><TableCell>{selectedTechnician.codigo}</TableCell></TableRow>
                <TableRow><TableCell>Área - Departamento</TableCell><TableCell>{selectedTechnician.area}</TableCell></TableRow>
                <TableRow><TableCell>Redactor</TableCell><TableCell>{selectedTechnician.redactor}</TableCell></TableRow>
                <TableRow><TableCell>Salario</TableCell><TableCell>{selectedTechnician.salario}</TableCell></TableRow>
                <TableRow><TableCell>Superior inmediato</TableCell><TableCell>{selectedTechnician.supervisor_inmediato}</TableCell></TableRow>

                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Descripción</Typography></TableCell></TableRow>
                <TableRow><TableCell>Objetivos del puesto</TableCell><TableCell>{selectedTechnician.objetivo_puesto}</TableCell></TableRow>
                <TableRow><TableCell>Funciones</TableCell><TableCell>{selectedTechnician.funciones}</TableCell></TableRow>
                <TableRow><TableCell>Responsabilidades</TableCell><TableCell>{selectedTechnician.responsabilidades}</TableCell></TableRow>
                <TableRow><TableCell>Autoridad</TableCell><TableCell>{selectedTechnician.autoridad}</TableCell></TableRow>

                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Dimensiones</Typography></TableCell></TableRow>
                <TableRow><TableCell>Relaciones formales</TableCell><TableCell>{selectedTechnician.relaciones_formales}</TableCell></TableRow>
                <TableRow><TableCell>Herramientas</TableCell><TableCell>{selectedTechnician.herramientas}</TableCell></TableRow>
                <TableRow><TableCell>Otras condiciones</TableCell><TableCell>{selectedTechnician.condiciones_extras}</TableCell></TableRow>
                <TableRow><TableCell>Ambiente físico</TableCell><TableCell>{selectedTechnician.ambiente_fisico}</TableCell></TableRow>

                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Perfil de usuario</Typography></TableCell></TableRow>
                <TableRow><TableCell>Formación</TableCell><TableCell>{selectedTechnician.formacion}</TableCell></TableRow>
                <TableRow><TableCell>Conocimientos específicos</TableCell><TableCell>{selectedTechnician.conocimento_especifico}</TableCell></TableRow>
                <TableRow><TableCell>Experiencia</TableCell><TableCell>{selectedTechnician.experiencia}</TableCell></TableRow>
                <TableRow><TableCell>Requerimiento físico</TableCell><TableCell>{selectedTechnician.requerimiento_fisico}</TableCell></TableRow>
                <TableRow><TableCell>Habilidades y aptitudes</TableCell><TableCell>{selectedTechnician.habilidades_actitudes}</TableCell></TableRow>

              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ListadoTecnicos;
