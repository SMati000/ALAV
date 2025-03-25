import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(titulos, datos) {
  return { titulos, datos };
}

const fabricante = [ // ! DATOS DE PRUEBA
  createData( 'Modelo', 'STK-300-HZL'),
  createData( 'Número de serie', 330),
  createData( 'Marca', 'Optron'),
  createData( 'Fecha de fabricación', 2023),
];

const equipo = [ // ! DATOS DE PRUEBA
  createData( 'Código', '02-O2-ST-00'),
  createData( 'Descripción', 'Stacker de segunda línea de acolchados.'),
  createData( 'Planta', 2),
  createData( 'Área', 'Optron 2'),
];

const tecnico = [ // ! DATOS DE PRUEBA
  createData( 'Corriente', '0 [A]'),
  createData( 'Tensión', '400 [V]'),
  createData( 'Potencia', '4 [Kw]'),
  createData( 'Presión', '6 [bar]'),
];

const dimensiones = [  // ! DATOS DE PRUEBA
  createData( 'Altura', '4210 [mm]'),
  createData( 'Ancho', '4430 [mm]'),
  createData( 'Largo', '2495 [mm]'),
];

const planificación = [  // ! DATOS DE PRUEBA
  createData( 'Criticidad', 'Baja'),
  createData( 'Modelo de mantenimiento', 'Correctivo'),
];

function DescripcionMaquina() {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap:'1rem', marginTop: '4rem', paddingInline:'4rem' }}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Typography
          variant="h8"
          noWrap
          component="div"
          sx={{ fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main}}
        >
          ALAV S.R.L
        </Typography>
        
        <Typography
          variant="h8"
          component="div"
          sx={{ fontWeight:'bold', textAlign:'center', color:theme.palette.primary.main}}
        >
          Departamento de <br /> Mantenimiento e Ingeniería
        </Typography>
      </div>

      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' },  fontWeight:'bold', textAlign:'center', marginTop:'-3.5rem', color:theme.palette.primary.main, letterSpacing:'0.1rem'}}
      >
        FICHA TÉCNICA DE EQUIPAMIENTO
      </Typography>

      <div style={{display:'flex', justifyContent:'center', marginBlock:'1.5rem'}}>
        <img src="/imagen-cama.jpg" alt="imagen maquina" draggable='false' style={{width:'25rem', height:'20rem'}} />
      </div>

      <div style={{display:'flex', gap:'2rem'}}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor:theme.palette.primary.main}}>
              <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: 'center', color: 'white', padding: '0.5rem' }}>
                  <Typography variant="h6" noWrap>
                    Fabricante
                  </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fabricante.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="center">{row.titulos}</StyledTableCell>
                  <StyledTableCell align="center">{row.datos}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor:theme.palette.primary.main}}>
              <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: 'center', color: 'white', padding: '0.5rem' }}>
                  <Typography variant="h6" noWrap>
                    Equipo
                  </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipo.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="center">{row.titulos}</StyledTableCell>
                  <StyledTableCell align="center">{row.datos}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor:theme.palette.primary.main}}>
              <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: 'center', color: 'white', padding: '0.5rem' }}>
                  <Typography variant="h6" noWrap>
                    Técnico
                  </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tecnico.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="center">{row.titulos}</StyledTableCell>
                  <StyledTableCell align="center">{row.datos}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{display:'flex', gap:'2rem'}}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor:theme.palette.primary.main}}>
              <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: 'center', color: 'white', padding: '0.5rem' }}>
                  <Typography variant="h6" noWrap>
                    Dimensiones
                  </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dimensiones.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="center">{row.titulos}</StyledTableCell>
                  <StyledTableCell align="center">{row.datos}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor:theme.palette.primary.main}}>
              <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: 'center', color: 'white', padding: '0.5rem' }}>
                  <Typography variant="h6" noWrap>
                    Planificación
                  </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planificación.map((row) => (
                <StyledTableRow>
                  <StyledTableCell align="center">{row.titulos}</StyledTableCell>
                  <StyledTableCell align="center">{row.datos}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor:theme.palette.primary.main}}>
            <TableRow>
                <TableCell colSpan={2} sx={{ textAlign: 'center', color: 'white', padding: '0.5rem' }}>
                <Typography variant="h6" noWrap>
                  Funcionamiento
                </Typography>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="center"> // ! DATOS DE PRUEBA
                EL equipo toma colchas o acolchados (en nuestro caso provenientes de CVT 2.2 EDR DRC) y los apila sobre una plataforma elevada, 
                que desciende gradualmente mientras se acumula el producto.. Es importante que el operador se mantenga fuera del perímetro del 
                equipo durante su funcionamiento.
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
  
export default DescripcionMaquina;