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
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const roles = ['Market', 'Finance', 'Development']; // ! DATOS DE PRUEBA
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [  // ! DATOS DE PRUEBA
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

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

function ListadoTecnicos() {
  const [rows, setRows] = React.useState(initialRows);
  const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = React.useState({});
  const theme = useTheme();

  const columns = [
    { 
      field: 'name', 
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
      field: 'age',
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
      field: 'joinDate',
      headerName: 'MARCA',
      type: 'date',
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
      field: 'role',
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
      field: 'actions',
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
          onClick={() => console.log('Descargando...')}
          sx={{ color: 'rgb(40, 167, 69)' }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={() => console.log('Editando...', id)}
            sx={{ color: 'rgb(0, 123, 255)' }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Borrar"
            onClick={() => console.log('Borrando...', id)}
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
        onCellClick={() => navigate('/descripcion-maquina')} // !Cambiar por función con params de id
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

export default ListadoTecnicos;
