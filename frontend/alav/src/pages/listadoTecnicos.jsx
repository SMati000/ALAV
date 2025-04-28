import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from "@mui/x-data-grid";
import axiosInstance from './../../axiosConfig';
import DialogDelete from '../components/dialogDelete';
import BotonAtras from './../components/botonAtras';
import { Tooltip } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from "react";

function EditToolbar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <GridToolbarContainer
      sx={{
        padding: '1rem',
      }}
    >
      <Button
        color="primary"
        variant="contained"
        sx={{ fontWeight: 'bold', backgroundColor: theme.palette.background.botonAgregar, '&:hover': { backgroundColor: theme.palette.background.hover } }}
        startIcon={<AddIcon />}
        onClick={() => navigate('/agregar-tecnicos')} >
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}

const exportToPDF = async (ref, technician) => {
  if (!ref.current) return;

  const element = ref.current;

  const canvas = await html2canvas(element, {
    backgroundColor: "#fff",
    scale: 3,
    useCORS: true,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  const nombre = technician?.nombre || "Desconocido";
  const apellido = technician?.apellido || "Desconocido";
  pdf.save(`Ficha_Tecnica_${nombre}_${apellido}.pdf`);
};


const ListadoTecnicos = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedTechnician, setSelectedTechnician] = React.useState(null);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const theme = useTheme();
  const dialogRef = useRef();

  React.useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/tecnicos');
        setRows(response.data);
      } catch (error) {
        console.error('Error al obtener los técnicos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTecnicos();
  }, []);

  const handleOpen = (technician) => {
    setSelectedTechnician(technician);
    setOpen(true);
  };

  const eliminarFila = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id_tecnico !== id));
  };

  const columns = [
    {
      field: 'codigo',
      headerName: 'CÓDIGO',
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
      field: 'nombre',
      headerName: 'NOMBRE',
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
      field: 'apellido',
      headerName: 'APELLIDO',
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
      field: 'area',
      headerName: 'ÁREA',
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
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Editar">
              <EditIcon />
            </Tooltip>
          }
          label="Editar"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/editar-tecnico/${params.id}`);
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
      ],


    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        paddingInline: '1rem',
        paddingTop: '1rem',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <BotonAtras link={'/'}></BotonAtras>
      <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', color: 'white', marginBottom: '2rem' }}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', letterSpacing: '0.1rem', flex: '3', color: theme.palette.primary.main }}
        >
          TÉCNICOS
        </Typography>
      </div>


      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id_tecnico}
        slots={{
          toolbar: EditToolbar,
        }}
        disableSelectionOnClick
        hideFooterPagination
        pagination={false}
        onCellClick={(params) => handleOpen(params.row)}
        checkboxSelection={false}
        loading={loading}
        hideFooter={true}
        localeText={{
          noRowsLabel: 'No hay datos para mostrar', 
        }}
        sx={{
          flexGrow: 1,
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            backgroundColor: theme.palette.background.headerTable,
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
        registros="tecnicos"
        registro="tecnico"
        idRegistro={idSeleccionado}
        onDeleteSuccess={eliminarFila}
      />

      {selectedTechnician && (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <div ref={dialogRef}>
            <DialogTitle>Puesto - {selectedTechnician.puesto}</DialogTitle>
            <DialogContent dividers sx={{ fontSize: '1rem', padding: '1.5rem' }}>
              <Table>
                <TableBody>
                  <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Identificación</Typography></TableCell></TableRow>
                  <TableRow><TableCell>Nombre</TableCell><TableCell>{selectedTechnician.nombre}</TableCell></TableRow>
                  <TableRow><TableCell>Apellido</TableCell><TableCell>{selectedTechnician.apellido}</TableCell></TableRow>
                  <TableRow><TableCell>DNI</TableCell><TableCell>{selectedTechnician.dni}</TableCell></TableRow>
                  <TableRow><TableCell>Fecha de creación</TableCell><TableCell>{selectedTechnician.fecha_creacion.split('T')[0].split('-').reverse().join('/')}</TableCell></TableRow>
                  <TableRow><TableCell>Fecha de revisión</TableCell><TableCell>{selectedTechnician.fecha_revision.split('T')[0].split('-').reverse().join('/')}</TableCell></TableRow>
                  <TableRow><TableCell>Grado o nivel del puesto</TableCell><TableCell>{selectedTechnician.nivel}</TableCell></TableRow>
                  <TableRow><TableCell>Código</TableCell><TableCell>{selectedTechnician.codigo}</TableCell></TableRow>
                  <TableRow><TableCell>Área - Departamento</TableCell><TableCell>{selectedTechnician.area}</TableCell></TableRow>
                  <TableRow><TableCell>Redactor</TableCell><TableCell>{selectedTechnician.redactor}</TableCell></TableRow>
                  <TableRow><TableCell>Salario</TableCell><TableCell>{selectedTechnician.salario}</TableCell></TableRow>
                  <TableRow><TableCell>Superior inmediato</TableCell><TableCell>{selectedTechnician.supervisor_inmediato}</TableCell></TableRow>

                  <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Descripción</Typography></TableCell></TableRow>
                  <TableRow><TableCell>Objetivos del puesto</TableCell><TableCell>{selectedTechnician.objetivo_puesto}</TableCell></TableRow>
                  <TableRow><TableCell>Funciones</TableCell><TableCell>{selectedTechnician.funciones}</TableCell></TableRow>
                  <TableRow><TableCell>Responsabilidades</TableCell><TableCell>{selectedTechnician.responsabilidades}</TableCell></TableRow>
                  <TableRow><TableCell>Autoridad</TableCell><TableCell>{selectedTechnician.autoridad}</TableCell></TableRow>

                  <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Dimensiones</Typography></TableCell></TableRow>
                  <TableRow><TableCell>Relaciones formales</TableCell><TableCell>{selectedTechnician.relaciones_formales}</TableCell></TableRow>
                  <TableRow><TableCell>Herramientas</TableCell><TableCell>{selectedTechnician.herramientas}</TableCell></TableRow>
                  <TableRow><TableCell>Otras condiciones</TableCell><TableCell>{selectedTechnician.condiciones_extras}</TableCell></TableRow>
                  <TableRow><TableCell>Ambiente físico</TableCell><TableCell>{selectedTechnician.ambiente_fisico}</TableCell></TableRow>

                  <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Perfil de usuario</Typography></TableCell></TableRow>
                  <TableRow><TableCell>Formación</TableCell><TableCell>{selectedTechnician.formacion}</TableCell></TableRow>
                  <TableRow><TableCell>Conocimientos específicos</TableCell><TableCell>{selectedTechnician.conocimiento_especifico}</TableCell></TableRow>
                  <TableRow><TableCell>Experiencia</TableCell><TableCell>{selectedTechnician.experiencia}</TableCell></TableRow>
                  <TableRow><TableCell>Requerimiento físico</TableCell><TableCell>{selectedTechnician.requerimiento_fisico}</TableCell></TableRow>
                  <TableRow><TableCell>Habilidades y aptitudes</TableCell><TableCell>{selectedTechnician.habilidades_actitudes}</TableCell></TableRow>

                </TableBody>
              </Table>

            </DialogContent>
          </div>
          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button
              onClick={() => exportToPDF(dialogRef, selectedTechnician)}
              color="success"
              variant="contained"
              startIcon={<DownloadIcon />}
            >
              Descargar
            </Button>
            <Button onClick={() => setOpen(false)} color="primary">Cerrar</Button>
          </DialogActions>

        </Dialog>
      )
      }
    </Box >
  );
};

export default ListadoTecnicos;
