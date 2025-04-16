import * as React from 'react';
import { useState } from 'react';
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
import DialogDelete from '../components/dialogDelete';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';
import BotonAtras from './../components/botonAtras';
import { Tooltip } from '@mui/material';
import DownloadIcon from "@mui/icons-material/Download";

const initialRows = [];

function EditToolbar() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <GridToolbarContainer
            sx={{
                padding: '1rem',
            }}
        >
            <Button color="primary" variant="contained" sx={{ fontWeight: 'bold', backgroundColor: theme.palette.background.botonAgregar }} startIcon={<AddIcon />} onClick={() => navigate('/agregar-insumos')} >
                Agregar
            </Button>
        </GridToolbarContainer>
    );
}

function ListadoInsumos() {
    const [rows, setRows] = React.useState(initialRows);
    const navigate = useNavigate();
    const [rowModesModel, setRowModesModel] = React.useState({});
    const theme = useTheme();
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [idSeleccionado, setIdSeleccionado] = useState(null);

    React.useEffect(() => {
        const fetchInsumos = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/insumos');
                setRows(response.data);
            } catch (error) {
                console.error('Error al obtener los insumos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInsumos();
    }, []);

    const handleClickDelete = (id) => {
        setIdSeleccionado(id);
        setOpenDialog(true);
    };

    const eliminarFila = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.idInsumo !== id));
    };
    
    const columns = [
        {
            field: 'nombre',
            headerName: 'NOMBRE',
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
            field: 'descripcion',
            headerName: 'DESCRIPCION',
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
            field: 'stock',
            headerName: 'STOCK',
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
            getActions: (params) => {
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
                        icon={
                            <Tooltip title="Editar">
                                <EditIcon />
                            </Tooltip>
                        }
                        label="Editar"
                        className="textPrimary"
                        onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/editar-insumos/${id}`);
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
        <div style={{ padding: '0', margin: '1rem' }}>
            <BotonAtras link={'/'}></BotonAtras>
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', color: 'white', marginBottom: '2rem' }}>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', letterSpacing: '0.1rem', flex: '3', color: theme.palette.primary.main }}
                >
                    INSUMOS
                </Typography>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.idInsumo}
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
                registros="insumos"
                registro="insumos"
                idRegistro={idSeleccionado}
                onDeleteSuccess={eliminarFila}
            />
        </div>
    );

}

export default ListadoInsumos;
