import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GridToolbarContainer } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from "@mui/x-data-grid";
import axiosInstance from './../../axiosConfig';
import DialogDelete from '../components/dialogDelete';
import BotonAtras from './../components/botonAtras';
import { Tooltip } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const theme = useTheme();


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
        onCellClick={(params) => navigate(`/descripcion-tecnico/${params.id}`)}
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
    </Box >
  );
};

export default ListadoTecnicos;
