import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { Tooltip, Tabs, Tab, Paper } from '@mui/material';
import DialogDelete from '../components/dialogDelete';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const initialRows = [];
const estados = ['TODAS', 'PENDIENTE', 'EMITIDA', 'FINALIZADA', 'RECHAZADA'];

function EditToolbar({ value, handleChange, downloadPdf }) {
    const theme = useTheme();

    return (
        <GridToolbarContainer
            sx={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
            }}
            className="no-print"
        >
            <Paper
                square
                elevation={3}
                sx={{
                    borderRadius: '5px',
                }}
            >
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="estado de orden"
                    sx={{
                        '& .Mui-selected': {
                            fontWeight: 'bold',
                        }
                    }}
                >
                    <Tab label="Todas" />
                    <Tab label="pendientes" />
                    <Tab label="emitidas" />
                    <Tab label="finalizadas" />
                    <Tab label="rechazadas" />
                </Tabs>
            </Paper>
            <Button
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 'bold', borderColor: theme.palette.background.botonAgregar, color: theme.palette.background.botonAgregar}}
                startIcon={<DownloadIcon />}
                onClick={downloadPdf}
            >
                Descargar
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
    const pdfRef = useRef(null);
    const [value, setValue] = React.useState(0);
    const [datosOrden, setDatosOrden] = React.useState(null);
    const [exportMode, setExportMode] = useState(false);
    const exportRef = useRef(null);

    const exportToPDF = async (idOrden) => {
        try {
            setDatosOrden(idOrden);
            await new Promise((resolve) => setTimeout(resolve, 100));

            if (pdfRef.current) {
                const element = pdfRef.current;
                await html2pdf()
                    .from(element)
                    .set({
                        filename: `orden-trabajo-${idOrden.id}.pdf`,
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    })
                    .save();
                setDatosOrden(null);
            }
        } catch (error) {
            console.error('Error al exportar orden de trabajo:', error);
        }
    };

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        setLoading(true);
        try {
            if (newValue === 0) {
                const response = await axiosInstance.get('/ordenesTrabajo');
                setRows(response.data);
            } else {
                const estado = estados[newValue];
                const response = await axiosInstance.get(`/ordenesTrabajo?estado=${estado}`);
                setRows(response.data);
            }
        } catch (error) {
            console.error('Error al cambiar de estado:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        handleChange(null, 0);
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/ordenesTrabajo/${id}`);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error al eliminar la orden de trabajo:', error);
        }
    };

    const getNombreEstado = (nombre) => {
        switch (nombre) {
            case "PENDIENTE":
                return "Pendiente";
            case "EMITIDA":
                return "Emitida";
            case "FINALIZADA":
                return "Finalizada";
            case "RECHAZADA":
                return "Rechazada";
            default:
                return "Sin datos";
        }
    }

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
                return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
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
                const esPendiente = params.row.estado === 'PENDIENTE';
                return [
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Emitir orden" >
                                <DownloadIcon sx={{ pointerEvents: 'none' }} />
                            </Tooltip>
                        }
                        label="Emitir orden"
                        onClick={(event) => {
                            event.stopPropagation();
                            if (esPendiente) {
                                exportToPDF(params.row);
                            }
                        }}
                        className="solo-pantalla"
                        sx={{
                            color: esPendiente ? 'rgb(40, 167, 69)' : 'rgba(40, 167, 70, 0.24)',
                            cursor: esPendiente ? 'pointer' : 'not-allowed !important',
                        }}
                    />,
                    < GridActionsCellItem
                        icon={
                            < Tooltip title="Borrar" >
                                <DeleteIcon />
                            </Tooltip >
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
    // const printTable = () => {
    //     setExportMode(true);
    //     setTimeout(() => {
    //         window.print();
    //         setExportMode(false);
    //     }, 500); // da tiempo al DOM a renderizar el contenido oculto
    // };
    const downloadPdf = () => {
        setExportMode(true);
        setTimeout(() => {
            if (!exportRef.current) {
                console.error('No se encontró el contenedor para exportar.');
                setExportMode(false);
                return;
            }

            html2canvas(exportRef.current, { backgroundColor: '#f4f4f4', scale: 2 })
                .then((canvas) => {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const title = "ORDENES DE TRABAJO";

                    const pdfWidth = 210; // A4 width in mm
                    const pdfHeight = 297; // A4 height in mm

                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    const scale = pdfWidth / canvasWidth;
                    const scaledHeight = canvasHeight * scale;

                    // Alturas en mm para recorte
                    const titleHeight = 23; // espacio reservado para el título
                    const firstPageContentHeight = pdfHeight - titleHeight; // espacio en la primera página
                    const otherPagesContentHeight = pdfHeight; // resto sin título

                    // Convertir a unidades del canvas
                    const sliceHeightCanvasFirst = firstPageContentHeight / scale;
                    const sliceHeightCanvasOthers = otherPagesContentHeight / scale;

                    let remainingHeight = canvasHeight;
                    let position = 0;
                    let page = 0;

                    while (remainingHeight > 0) {
                        const sliceHeight = (page === 0) ? sliceHeightCanvasFirst : sliceHeightCanvasOthers;

                        const pageCanvas = document.createElement('canvas');
                        pageCanvas.width = canvasWidth;
                        pageCanvas.height = Math.min(sliceHeight, remainingHeight);

                        const context = pageCanvas.getContext('2d');
                        context.drawImage(
                            canvas,
                            0, position,
                            canvasWidth, pageCanvas.height,
                            0, 0,
                            canvasWidth, pageCanvas.height
                        );

                        const pageData = pageCanvas.toDataURL('image/png');

                        if (page > 0) pdf.addPage();

                        if (page === 0) {
                            // Título solo en la primera página
                            pdf.setFillColor(244, 244, 244);
                            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
                            pdf.setFont('helvetica', 'bold');
                            pdf.setFontSize(18);
                            pdf.setTextColor(theme.palette.primary.main);
                            pdf.text(title, pageWidth / 2, 15, { align: 'center' });
                            // Imagen debajo del título
                            pdf.addImage(pageData, 'PNG', 0, titleHeight, pdfWidth, pageCanvas.height * scale);
                        } else {
                            // Desde segunda página, sin título
                            pdf.addImage(pageData, 'PNG', 0, 0, pdfWidth, pageCanvas.height * scale);
                        }

                        position += pageCanvas.height;
                        remainingHeight -= pageCanvas.height;
                        page++;
                    }


                    pdf.save("tabla_ordenes.pdf");
                    setExportMode(false);
                })
                .catch((err) => {
                    console.error('Error generando el PDF', err);
                    setExportMode(false);
                });
        }, 500);
    };

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
                slots={{ toolbar: EditToolbar, }}
                slotProps={{
                    toolbar: { value, handleChange, setRows, setRowModesModel, downloadPdf },
                    noRowsOverlay: { value },
                }}
                pagination={false}
                hideFooterPagination
                disableSelectionOnClick
                checkboxSelection={false}
                loading={loading}
                onCellClick={(params) => navigate(`/descripcion-orden/${params.id}`)}
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

            {datosOrden && (
                <Box className="solo-pdf" style={{ display: 'none' }}>
                    <Paper
                        ref={pdfRef}

                        sx={{

                            padding: '1rem',
                            paddingBottom: '2.5rem',
                            borderRadius: '12px',
                            boxShadow: 3,
                            backgroundColor: 'white', // mejor blanco para pdf
                        }}
                    >
                        {/* {1era fila} */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
                                <Typography variant="body1"><strong>ALAV. SRL</strong></Typography>
                            </Box>
                            <Box sx={{}}>
                                <Box sx={{ height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black', borderBottom: 'none' }}>
                                    <Typography><strong>Departamento de Ingeniería</strong></Typography>
                                </Box>
                                <Box sx={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
                                    <Typography variant="body1"><strong>Orden de Trabajo</strong></Typography>
                                </Box>
                            </Box>


                            <Box
                                sx={{
                                    border: '2px solid black',
                                    padding: '0.2rem 0 0 0.3rem ',
                                }}
                            >
                                <Typography><strong>Orden Nº:</strong> {datosOrden.id} <br />
                                    <strong>Edición:</strong> {datosOrden.edicion ?? 'Sin datos'} <br />
                                    <strong>Fecha:</strong> {datosOrden.fechaInicio.split('T')[0].split('-').reverse().join('/')}
                                </Typography>


                            </Box>
                        </Box>


                        {/* {2da fila} */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2, mb: 2 }}>
                            <Box sx={{ height: '100px', marginRight: '-0.3rem' }}>
                                <Box sx={{ height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'left', border: '2px solid black', paddingLeft: '0.5rem' }}>
                                    <Typography><strong>Departamento de Ingeniería</strong></Typography>
                                </Box>
                                <Box sx={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', paddingTop: '0.5rem' }}>
                                    <Box sx={{ height: '100%', width: '100%', padding: '0.2rem', border: '2px solid black' }}>
                                        <Typography><strong>Fecha y Hora Inicio:</strong> {datosOrden.fechaInicio ? datosOrden.fechaInicio.split('T')[0].split('-').reverse().join('/') : 'Sin datos'}</Typography>
                                    </Box>
                                    <Box sx={{ height: '100%', width: '100%', padding: '0.2rem', border: '2px solid black' }}>
                                        <Typography><strong>Fecha y Hora Final:</strong> {datosOrden.fechaFin ? datosOrden.fechaFin.split('T')[0].split('-').reverse().join('/') : 'Sin datos'}</Typography>
                                    </Box>
                                </Box>
                            </Box>


                            <Box
                                sx={{
                                    border: '2px solid black',
                                    padding: '0.5rem',
                                    marginLeft: '0.3rem',
                                }}
                            >
                                <Typography><strong>Autorizó: </strong> {datosOrden.autorizadoPor ?? 'Sin datos'} <br /></Typography>
                            </Box>
                        </Box>


                        {/* Equipo de protección */}
                        <Box
                            sx={{
                                height: '100px',
                                border: '2px solid black',
                                padding: '0.5rem',
                                mb: 2,
                            }}
                        >
                            <Typography><strong>Equipo de Protección:</strong> {datosOrden.equipoProteccion ?? 'Sin datos'}</Typography>
                        </Box>


                        {/* Tabla de descripción, estado, insumos */}
                        <table style={{ width: '100%', border: '2px solid black', marginBottom: '2rem', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '2px solid black', padding: '8px' }}>Descripción</th>
                                    <th style={{ border: '2px solid black', padding: '8px' }}>Estado de la Tarea</th>
                                    <th style={{ border: '2px solid black', padding: '8px' }}>Insumos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '2px solid black', padding: '8px', height: '200px' }}>{datosOrden.descripcion ?? 'Sin datos'}</td>
                                    <td style={{ border: '2px solid black', padding: '8px' }}>{datosOrden.estado ? getNombreEstado(datosOrden.estado) : 'Sin datos'}</td>
                                    <td style={{ border: '2px solid black', padding: '8px' }}>{datosOrden.insumos ?? 'Sin datos'}</td>
                                </tr>
                            </tbody>
                        </table>


                        {/* Trabajos pendientes y mejoras */}
                        <Box
                            sx={{
                                height: '250px',
                                border: '2px solid black',
                                padding: '0.5rem',
                                mb: 2,
                            }}
                        >
                            <Typography><strong>Trabajos Pendientes y Propuestas de Mejora:</strong></Typography>
                            <Typography>
                                {datosOrden.trabajosPendientes ?? 'Sin datos'}
                                <br />
                                {datosOrden.posiblesMejoras ?? ''}
                            </Typography>
                        </Box>


                        {/* Firma */}
                        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                            <Typography><strong>Firma Trabajador/es:</strong></Typography>
                        </Box>
                    </Paper>
                </Box>
            )}

            {exportMode && (
                <div
                    ref={exportRef}
                    // className="solo-impresion"
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
                        getRowId={(row) => row.id}
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
                registros="ordenesTrabajo"
                registro="orden"
                idRegistro={idSeleccionado}
                onDeleteSuccess={eliminarFila}
            />
        </Box>
    );

}

export default ListadoOrdenes;
