import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';
import BotonAtras from './../components/botonAtras';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

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
      <Button color="primary" variant="contained" sx={{ fontWeight: 'bold', backgroundColor: theme.palette.acento.main }}  startIcon={<AddIcon />} onClick={() => navigate('/agregar-tarea')} >
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

  React.useEffect(() => {
    const fetchTareas = async () => {
      try {
        setLoading(true); 
        const response = await axiosInstance.get('/tareas');  
        setRows(response.data);  
      } catch (error) {
        console.error('Error al obtener las máquinas:', error);
      } finally {
        setLoading(false);  
      }
    };
    fetchTareas(); 
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tareas/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const columns = [
    { 
      field: 'fechaCreada', 
      headerName: 'CREADA', 
      editable: true, 
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
      editable: true,
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
      editable: true,
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
      editable: true,
      sortable: false,
      filterable: false, 
      disableColumnMenu: true,
      resizable: false,
      flex: 1, 
      align: 'center', 
      headerAlign: 'center',
      renderCell: (params) => params.value ? params.value : 'Sin datos',
    },
    {
      field: 'insumos',
      headerName: 'INSUMOS',
      editable: true,
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
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AssignmentOutlinedIcon />}
            label="Emitir orden"
            onClick={(event) => {
              event.stopPropagation(); 
              navigate(`/descripcion-tarea/${id}`);
            }}
            sx={{ color: 'rgba(69, 72, 169, 1)' }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={(event) => {
              event.stopPropagation(); 
              navigate(`/editar-tarea/${id}`);
            }}
            sx={{ color: 'rgb(0, 123, 255)' }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Borrar"
            onClick={(event) => {
              event.stopPropagation(); 
              handleDelete(id);
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
      <div style={{display:'flex', alignItems:'center', backgroundColor:theme.palette.acento.main, padding:'1rem', color:'white', marginBottom:'2rem'}}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', letterSpacing:'0.1rem', flex:'3'}}
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
        onCellClick={(params) => navigate(`/descripcion-tarea/${params.id}`)}
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
    </Box>
  );

}

export default ListadoTareas;
