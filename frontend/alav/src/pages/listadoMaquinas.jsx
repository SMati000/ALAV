import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';
import BotonAtras from './../components/botonAtras';

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
      <Button color="primary" variant="contained" sx={{ fontWeight: 'bold', backgroundColor: theme.palette.acento.main }}  startIcon={<AddIcon />} onClick={() => navigate('/agregar-maquina')} >
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}

function ListadoMaquinas() {
  const [rows, setRows] = React.useState(initialRows);
  const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = React.useState({});
  const theme = useTheme();
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        setLoading(true); 
        const response = await axiosInstance.get('/maquinas');  
        setRows(response.data);  
      } catch (error) {
        console.error('Error al obtener las máquinas:', error);
      } finally {
        setLoading(false);  
      }
    };
    fetchMaquinas(); 
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/maquinas/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error al eliminar la máquina:', error);
    }
  };

  const columns = [
    { 
      field: 'codigo', 
      headerName: 'CÓDIGO', 
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
      field: 'modelo',
      headerName: 'MODELO',
      type: 'string',
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
      field: 'marca',
      headerName: 'MARCA',
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
      field: 'planta',
      headerName: 'PLANTA',
      editable: true,
      type: 'string',
      sortable: false,
      filterable: false, 
      disableColumnMenu: true,
      resizable: false,
      flex: 1, 
      align: 'center', 
      headerAlign: 'center',
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
          icon={<DownloadIcon />}
          label="Descargar"
          onClick={(event) => {
            event.stopPropagation(); 
            console.log('Descargando...');
          }}
          sx={{ color: 'rgb(40, 167, 69)' }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={(event) => {
              event.stopPropagation(); 
              navigate(`/editar-maquina/${id}`);
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
      sx={{
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        paddingInline:'4rem',
        paddingTop: '4rem',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <BotonAtras></BotonAtras>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main, letterSpacing:'0.15rem', marginBlock:'1rem'}}
      >
        MÁQUINAS
      </Typography>
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
        onCellClick={(params) => navigate(`/descripcion-maquina/${params.id}`)}
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

export default ListadoMaquinas;
