import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useTheme } from '@mui/material/styles';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
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

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer 
        sx={{
            padding:'1rem',
        }}
    >
      <Button color="primary" variant="contained" sx={{ fontWeight: 'bold', }}  startIcon={<AddIcon />} onClick={handleClick} >
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}

function ListadoMaquinas() {
    const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const theme = useTheme();

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
        valueOptions: ['Market', 'Finance', 'Development'],
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
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Editar"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Borrar"
              onClick={handleDeleteClick(id)}
              color="inherit"
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
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        pagination={false} 
        hideFooterPagination
        autoHeight={false} 
        disableSelectionOnClick
        checkboxSelection={false}
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
            }
        }} 
      />
    </Box>
  );

}

export default ListadoMaquinas;
