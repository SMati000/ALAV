import * as React from 'react';
import { useState, useRef } from 'react';
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



const initialRows = [];


function EditToolbar({ downloadPdf }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <GridToolbarContainer className="no-print" sx={{ padding: '1rem', display:'flex', gap:'1rem' }}>
            <Button
                color="primary"
                variant="contained"
                sx={{ fontWeight: 'bold', backgroundColor: theme.palette.background.botonAgregar, '&:hover': { backgroundColor: theme.palette.background.hover } }}
                startIcon={<AddIcon />}
                onClick={() => navigate('/agregar-insumos')}
            >
                Agregar
            </Button>
            <Button
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 'bold', borderColor: theme.palette.background.botonAgregar, color: theme.palette.background.botonAgregar }}
                startIcon={<DownloadIcon />}
                onClick={downloadPdf}
            >
                Descargar
            </Button>
        </GridToolbarContainer>
    );
}

function ListadoInsumos() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [rowModesModel, setRowModesModel] = React.useState({});
    const theme = useTheme();
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [exportMode, setExportMode] = useState(false);
    const exportRef = useRef(null);

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
            valueGetter: (params) => {
                return params?.row?.descripcion?.trim() ? params.row.descripcion : 'Sin datos';
            }            
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
            getActions: (params) => {
                return [
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

    const exportColumns = columns.filter((col) => col.field !== 'acciones');

    const downloadPdf = () => {
        setExportMode(true);
        setTimeout(() => {
            if (!exportRef.current) {
                console.error('No se encontró el contenedor para exportar.');
                setExportMode(false);
                return;
            }

            html2canvas(exportRef.current, { backgroundColor: '#f4f4f4'})
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();            
                    pdf.backgroundColor = '#f4f4f4';
                    pdf.setFillColor(244, 244, 244);
                    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
                    pdf.setFont(Typography.fontFamily, "bold");
                    pdf.setFontSize(18);
                    const title = "INSUMOS";
                    pdf.setTextColor(theme.palette.primary.main);
                    pdf.text(title, pdfWidth / 2, 15, { align: "center", letterSpacing: '0.1rem'});
                    const imageY = 25;
                    const pdfImageHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, imageY, pdfWidth, pdfImageHeight);
                    pdf.save("tabla_insumos.pdf");
                    setExportMode(false);
                })
                .catch((err) => {
                    console.error('Error generando el PDF', err);
                    setExportMode(false);
                });
        }, 500);
    };

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
                    toolbar: { setRows, setRowModesModel, downloadPdf },
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
            {exportMode && (
                <div
                    ref={exportRef}
                    style={{
                        position: 'absolute',
                        top: '-10000px',
                        left: '-10000px',
                        width: '1000px', 
                        backgroundColor: '#f4f4f4',
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={exportColumns}
                        getRowId={(row) => row.idInsumo}
                        loading={loading}
                        pagination={false}
                        hideFooterPagination
                        disableSelectionOnClick
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
                </div>
            )}
            <DialogDelete
                open={openDialog}
                setOpen={setOpenDialog}
                registros="insumos"
                registro="insumo"
                idRegistro={idSeleccionado}
                onDeleteSuccess={eliminarFila}
            />
        </div>
    );

}

export default ListadoInsumos;
