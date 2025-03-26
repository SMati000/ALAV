import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";


const technicians = [
  {
    id: 1,
    name: "Técnico 3",
    creationDate: "06/06/24",
    reviewDate: "06/06/24",
    grade: "Tiempo completo / Presencial",
    code: "M6",
    department: "Mantenimiento",
    writer: "Alemany Marcelo",
    salary: "XXX",
    supervisor: "Ingeniero Supervisor",
    objectives: "Asegurar que los equipos productivos de la empresa estén en óptimas condiciones, maximizando su eficiencia y confiabilidad.",
    functions: ["Comprobar sistemas eléctricos y neumáticos", "Realizar actividades de instalación y reparación"],
    responsibilities: "Mantener la disponibilidad de los equipos para la producción y garantizar su seguridad de uso.",
    authority: "Dispone libremente de pañol de repuestos.",
    relations: "Reporta a Ingeniero Supervisor. Trabaja con técnico 1, técnico 2, técnico 3 y técnico 4.",
    tools: "Herramientas manuales, Soldadora",
    otherconditions: "",
    environment: "Planta 1, Planta 2, Planta 3 y taller",
    education: "Secundario técnico",
    skills: "Electricidad industrial, Herrería",
    experience: "NO",
    physicalRequirement: "Alto",
    abilities: ["Rapidez", "Responsabilidad", "Proactividad"],
  },
];

const columns = [
  {
    field: 'code',
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
    field: 'name',
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
    field: 'department',
    headerName: 'DEPARTAMENTO',
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
    field: "actions",
    headerName: "ACCIONES",
    editable: false,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    resizable: false,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => params.row.handleOpen(params.row)}>
        Ver detalles
      </Button>
    ),
  },
];

function EditToolbar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <GridToolbarContainer sx={{ padding: "1rem" }}>
      <Button
        color="primary"
        variant="contained"
        sx={{ fontWeight: 'bold', backgroundColor: theme.palette.acento.main }}
        startIcon={<AddIcon />}
        onClick={() => navigate("/agregar-maquina")}
      >
        Agregar
      </Button>
    </GridToolbarContainer>
  );
}


const ListadoTecnicos = () => {
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = (technician) => {
    setSelectedTechnician(technician);
    setOpen(true);
  };

  const rows = technicians.map((tech) => ({
    ...tech,
    handleOpen,
  }));

  return (
    <Box
      sx={{
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        paddingInline: '4rem',
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
        sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, letterSpacing: '0.15rem', marginBlock: '1rem' }}
      >
        TÉCNICOS
      </Typography>


      <Box sx={{ height: 400, width: "100%", marginTop: "10px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: EditToolbar,
          }}
          disableSelectionOnClick
          hideFooterPagination
          pagination={false}
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

      {selectedTechnician && (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Puesto - {selectedTechnician.name}</DialogTitle>
          <DialogContent dividers>
            <Table>
              <TableBody>
                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Identificación</Typography></TableCell></TableRow>
                <TableRow><TableCell>Fecha de creación</TableCell><TableCell>{selectedTechnician.creationDate}</TableCell></TableRow>
                <TableRow><TableCell>Fecha de revisión</TableCell><TableCell>{selectedTechnician.reviewDate}</TableCell></TableRow>
                <TableRow><TableCell>Grado o nivel del puesto</TableCell><TableCell>{selectedTechnician.grade}</TableCell></TableRow>
                <TableRow><TableCell>Código</TableCell><TableCell>{selectedTechnician.code}</TableCell></TableRow>
                <TableRow><TableCell>Área - Departamento</TableCell><TableCell>{selectedTechnician.department}</TableCell></TableRow>
                <TableRow><TableCell>Redactor</TableCell><TableCell>{selectedTechnician.writer}</TableCell></TableRow>
                <TableRow><TableCell>Salario</TableCell><TableCell>{selectedTechnician.salary}</TableCell></TableRow>
                <TableRow><TableCell>Superior inmediato</TableCell><TableCell>{selectedTechnician.supervisor}</TableCell></TableRow>

                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Descripción</Typography></TableCell></TableRow>
                <TableRow><TableCell>Objetivos del puesto</TableCell><TableCell>{selectedTechnician.objectives}</TableCell></TableRow>
                <TableRow><TableCell>Funciones</TableCell>
                  <TableCell>
                    <ul>{selectedTechnician.functions.map((func, index) => <li key={index}>{func}</li>)}</ul>
                  </TableCell>
                </TableRow>
                <TableRow><TableCell>Responsabilidades</TableCell><TableCell>{selectedTechnician.responsibilities}</TableCell></TableRow>
                <TableRow><TableCell>Autoridad</TableCell><TableCell>{selectedTechnician.authority}</TableCell></TableRow>

                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Dimensiones</Typography></TableCell></TableRow>
                <TableRow><TableCell>Relaciones formales</TableCell><TableCell>{selectedTechnician.relations}</TableCell></TableRow>
                <TableRow><TableCell>Herramientas</TableCell><TableCell>{selectedTechnician.tools}</TableCell></TableRow>
                <TableRow><TableCell>Otras condiciones</TableCell><TableCell>{selectedTechnician.otherconditions}</TableCell></TableRow>
                <TableRow><TableCell>Ambiente físico</TableCell><TableCell>{selectedTechnician.environment}</TableCell></TableRow>

                <TableRow><TableCell colSpan={2}><Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Perfil de usuario</Typography></TableCell></TableRow>
                <TableRow><TableCell>Formación</TableCell><TableCell>{selectedTechnician.education}</TableCell></TableRow>
                <TableRow><TableCell>Conocimientos específicos</TableCell><TableCell>{selectedTechnician.skills}</TableCell></TableRow>
                <TableRow><TableCell>Experiencia</TableCell><TableCell>{selectedTechnician.experience}</TableCell></TableRow>
                <TableRow><TableCell>Requerimiento físico</TableCell><TableCell>{selectedTechnician.physicalRequirement}</TableCell></TableRow>
                <TableRow><TableCell>Habilidades y aptitudes</TableCell>
                  <TableCell>
                    <ul>{selectedTechnician.abilities.map((func, index) => <li key={index}>{func}</li>)}</ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ListadoTecnicos;
