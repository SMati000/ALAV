import * as React from 'react';
import { useState } from 'react';
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
import BotonAtras from './../components/botonAtras';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import { Tooltip } from '@mui/material';
import DialogDelete from '../components/dialogDelete';

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
            <Button color="primary" variant="contained" sx={{ fontWeight: 'bold', backgroundColor: theme.palette.background.botonAgregar, '&:hover': { backgroundColor: theme.palette.background.hover } }} startIcon={<AddIcon />} >
                Agregar
            </Button>
        </GridToolbarContainer>
    );
}

function ListadoOrdenes() {
    const [rows, setRows] = React.useState(initialRows);
    const navigate = useNavigate();
    const [rowModesModel, setRowModesModel] = React.useState({});
    const theme = useTheme();
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [idSeleccionado, setIdSeleccionado] = useState(null);

    React.useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/ordenesTrabajo');
                setRows(response.data);
            } catch (error) {
                console.error('Error al obtener las ordenes de trabajo:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrdenes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/ordenesTrabajo/${id}`);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error al eliminar la orden de trabajo:', error);
        }
    };

    const handleClickDelete = (id) => {
        setIdSeleccionado(id);
        setOpenDialog(true);
    };

    const eliminarFila = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ÓRDEN #',
            type: 'number',
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
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            resizable: false,
            flex: 1,
        },
        {
            field: 'estado',
            headerName: 'ESTADO',
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
            field: 'fechaInicio',
            headerName: 'FECHA INICIO',
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
            getActions: ( params ) => {
                return [
                    // <GridActionsCellItem
                    //     icon={
                    //         <Tooltip title="Descargar">
                    //           <DownloadIcon />
                    //         </Tooltip>
                    //       }
                    //     label="Descargar"
                    //     onClick={(event) => {
                    //         event.stopPropagation();
                    //         console.log('Descargando...');
                    //     }}
                    //     sx={{ color: 'rgb(40, 167, 69)' }}
                    // />,
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
                            // navigate(`/editar-insumos/${id}`);
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
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', color: 'white', marginBottom: '2rem' }}>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.1rem', flex: '3' }}
                >
                    ÓRDENES DE TRABAJO
                </Typography>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                pagination={false}
                hideFooterPagination
                disableSelectionOnClick
                checkboxSelection={false}
                loading={loading}
                onCellClick={(params) => navigate(`/descripcion-orden/${params.id}`)}
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
                registros="ordenesTrabajo"
                registro="orden"
                idRegistro={idSeleccionado}
                onDeleteSuccess={eliminarFila}
            />
        </Box>
    );

}

export default ListadoOrdenes;
