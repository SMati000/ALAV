import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
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

const initialRows = [];

function EditToolbar() {
  const theme = useTheme();
  const navigate = useNavigate();  

  return (
    <GridToolbarContainer 
        sx={{
          padding:'1rem',
        }}
    >
      <Button color="primary" variant="contained" sx={{ fontWeight: 'bold', backgroundColor: theme.palette.background.botonAgregar }}  startIcon={<AddIcon />} onClick={() => navigate('/agregar-tarea')} >
        Agregar
      </Button>
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
        } else {
          setRows(tareasConCodigo);
        }  
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      } finally {
        setLoading(false);  
      }
    };
    fetchTareas(); 
  }, [searchParams]);

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
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
              <Tooltip title="Emitir orden">
                <AssignmentOutlinedIcon />
              </Tooltip>
            }
            label="Emitir orden"
            onClick={(event) => {
              event.stopPropagation(); 
              navigate(`/agregar-orden/${params.id}`);
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
      style={{padding:'0', margin:'1rem'}}
    >
      <BotonAtras link={'/'}></BotonAtras>
      <div style={{display:'flex', alignItems:'center', padding:'1rem', color:'white', marginBottom:'2rem'}}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color: theme.palette.primary.main, letterSpacing:'0.1rem', flex:'3'}}
        >
          TAREAS
        </Typography>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        pagination={false} 
        hideFooterPagination
        disableSelectionOnClick
        checkboxSelection={false}
        loading={loading}
        hideFooter={true}
        sx={{ 
          flexGrow: 1,
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            backgroundColor: theme.palette.primary.main, 
            padding:'0',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color:'white',
            letterSpacing: '0.1rem',
          },
          '& .MuiDataGrid-columnHeader': {
            padding:'0',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
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
