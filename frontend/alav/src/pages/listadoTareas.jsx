import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';
import BotonAtras from './../components/botonAtras';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DialogDelete from '../components/dialogDelete';
import { Tooltip } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';

const initialRows = [];

function EditToolbar({ trabajadores, selectedTecnico, setSelectedTecnico }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <GridToolbarContainer
      sx={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button color="primary" variant="contained" sx={{ fontWeight: 'bold', backgroundColor: theme.palette.background.botonAgregar, '&:hover': { backgroundColor: theme.palette.background.hover } }} startIcon={<AddIcon />} onClick={() => navigate('/agregar-tarea')} >
        Agregar
      </Button>
      <Autocomplete
        options={trabajadores}
        getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
        value={selectedTecnico}
        onChange={(event, newValue) => setSelectedTecnico(newValue)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Seleccionar técnico" variant="outlined" size="small"/>
        )}
      />
    </GridToolbarContainer>
  );
}

function ListadoTareas() {
  const [rows, setRows] = React.useState(initialRows);
  const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = React.useState({});
  const theme = useTheme();
  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [searchParams] = useSearchParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [allRows, setAllRows] = React.useState(initialRows);
  const [trabajadores, setTrabajadores] = useState([]);
  const [selectedTecnico, setSelectedTecnico] = useState(null);

  React.useEffect(() => {
    const fetchTareas = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/tareas');

        const tareasConCodigo = response.data.map(tarea => ({
          ...tarea,
          codigoMaquina: tarea.maquina?.codigo || 'Sin datos'
        }));

        const idsParam = searchParams.get('ids');

        if (idsParam) {
          const ids = idsParam
            .split(',')
            .map(id => parseInt(id, 10))
            .filter(id => !isNaN(id));

          const filtradas = tareasConCodigo.filter(tarea => ids.includes(tarea.id));
          setRows(filtradas);
          setAllRows(tareasConCodigo);
        } else {
          setRows(tareasConCodigo);
          setAllRows(tareasConCodigo);
        }
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTareas();
  }, [searchParams]);

  React.useEffect(() => {
    const fetchTrabajadores = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/tecnicos');
            setTrabajadores(response.data);
        } catch (error) {
            console.error('Error al obtener los técnicos:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchTrabajadores();
  }, []);

  React.useEffect(() => {
    if (!selectedTecnico) {
      setRows(allRows); 
    } else {
      const tareasFiltradas = allRows.filter((tarea) =>
        tarea.trabajadores?.some(trabajador => trabajador.id_tecnico === selectedTecnico.id_tecnico)
      );
      setRows(tareasFiltradas);
    }
  }, [selectedTecnico, allRows]);

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const emitirOrdenTrabajo = async (tarea, axiosInstance) => {
    const ordenTabajo = {
      descripcion: tarea.descripcion || '',
      estado: 'PENDIENTE',
      idTarea: tarea.id,
      autorizadoPor: tarea.autorizadoPor || '',
      departamento: tarea.departamento || '',
      edicion: tarea.edicion || '',
      equipoProteccion: tarea.equipoProteccion || '',
      insumos: tarea.insumos?.map(i => i.nombre).join(', ') || '',
      trabajadores: tarea.trabajadores?.map(t => `${t.nombre} ${t.apellido}`).join(', ') || '',
      posiblesMejoras: tarea.posiblesMejoras || '',
      trabajosPendientes: tarea.trabajosPendientes || '',
    }
    console.log("Generando orden de trabajo:", ordenTabajo);

    try {
      await axiosInstance.post('/ordenesTrabajo', ordenTabajo);
      handleOpenSnackbar('Orden de trabajo generada con éxito.', 'success');
      setTimeout(() => {
        navigate(`/listado-ordenes`);
      }, 2000)
    } catch (error) {
      console.error("Error al generar orden de trabajo:", error);
      handleOpenSnackbar('Error al generar orden de trabajo', 'error');
    }
  }

  const handleOpenSnackbar = (message, severity = 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const columns = [
    {
      field: 'fechaCreada',
      headerName: 'CREADA',
      editable: false,
      type: 'string',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const dateParts = params.value.split('-');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      },
    },
    {
      field: 'periodicidad',
      headerName: 'PERIODICIDAD',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      renderCell: (params) => {
        return `${params.row.periodicidad} ${params.row.unidad}`;
      },
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      type: 'string',
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
      field: 'codigoMaquina',
      headerName: 'MÁQUINA',
      type: 'string',
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
      field: 'insumos',
      headerName: 'INSUMOS',
      editable: false,
      type: 'string',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const insumos = params.value || [];
        if (insumos.length === 0) {
          return 'Sin datos';
        }
        const nombres = insumos.map((insumo) => insumo.nombre);
        return nombres.join(', ');
      },
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
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="Generar orden">
                <AssignmentOutlinedIcon />
              </Tooltip>
            }
            label="Generar orden"
            onClick={async (event) => {
              event.stopPropagation();
              const tarea = rows.find((row) => row.id === params.id);
              await emitirOrdenTrabajo(tarea, axiosInstance);
            }}
            sx={{ color: 'rgba(69, 72, 169, 1)' }}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Editar">
                <EditIcon />
              </Tooltip>
            }
            label="Editar"
            className="textPrimary"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/editar-tarea/${params.id}`);
            }}
            sx={{ color: 'rgb(0, 123, 255)' }}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Borrar">
                <DeleteIcon />
              </Tooltip>
            }
            label="Borrar"
            onClick={(event) => {
              event.stopPropagation();
              setIdSeleccionado(params.id);
              setOpenDialog(true);
            }}
            sx={{ color: 'rgb(220, 53, 69)' }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      style={{ padding: '0', margin: '1rem' }}
    >
      <BotonAtras link={'/'}></BotonAtras>
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
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', color: 'white', marginBottom: '2rem' }}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.1rem', flex: '3' }}
        >
          TAREAS
        </Typography>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, trabajadores, selectedTecnico, setSelectedTecnico },
        }}
        pagination={false}
        hideFooterPagination
        disableSelectionOnClick
        checkboxSelection={false}
        loading={loading}
        onCellClick={(params) => navigate(`/descripcion-tarea/${params.id}`)}
        hideFooter={true}
        localeText={{
          noRowsLabel: 'No hay datos para mostrar', 
        }}
        sx={{
          flexGrow: 1,
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            backgroundColor: theme.palette.primary.main,
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
        registros="tareas"
        registro="tarea"
        idRegistro={idSeleccionado}
        onDeleteSuccess={eliminarFila}
      />
    </Box>
  );

}

export default ListadoTareas;
