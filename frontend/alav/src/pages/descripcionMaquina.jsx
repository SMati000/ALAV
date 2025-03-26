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
import { useParams } from 'react-router-dom';
import axiosInstance from './../../axiosConfig';

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

function DescripcionMaquina() {
  const theme = useTheme();
  const { id } = useParams(); 
  const [datosMaquina, setDatosMaquina] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMaquinaID = async () => {
      try {
        setLoading(true); 
        const response = await axiosInstance.get(`/maquinas/${id}`);  
        setDatosMaquina(response.data);  
      } catch (error) {
        console.error(`Error al obtener la máquina con id ${id}:`, error);
      } finally {
        setLoading(false);  
      }
    };
    fetchMaquinaID(); 
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!datosMaquina) return <div>No hay datos para mostrar</div>;

  const fabricante = [ 
    createData( 'Modelo', datosMaquina.modelo),
    createData( 'Número de serie', datosMaquina.nroSerie),
    createData( 'Marca', 'Optron'),
    createData( 'Fecha de fabricación', new Date(datosMaquina.fechaFabricacion).toLocaleDateString('es-ES').split('T')),
  ];
  
  const equipo = [ 
    createData( 'Código', datosMaquina.codigo),
    createData( 'Descripción', datosMaquina.descripcion),
    createData( 'Planta', datosMaquina.planta),
    createData( 'Área', datosMaquina.area),
  ];
  
  const tecnico = [
    createData( 'Corriente', `${datosMaquina.corriente ?? 0} [A]`),
    createData( 'Tensión', `${datosMaquina.tension ?? 0} [V]`),
    createData( 'Potencia', `${datosMaquina.potencia ?? 0} [Kw]`),
    createData( 'Presión', `${datosMaquina.presion ?? 0} [bar]`),
  ];
  
  const dimensiones = [ 
    createData( 'Altura', `${datosMaquina.altura ?? 0} [mm]`),
    createData( 'Ancho', `${datosMaquina.ancho ?? 0} [mm]`),
    createData( 'Largo', `${datosMaquina.largo ?? 0} [mm]`),
  ];
  
  const planificación = [  
    createData( 'Criticidad', datosMaquina.criticidad),
    createData( 'Modelo de mantenimiento', datosMaquina.modeloMantenimiento),
  ];

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
        <img src={datosMaquina.imagenDirec || '/imagen-cama.jpg'} alt="imagen maquina" draggable='false' style={{width:'25rem', height:'20rem'}} />
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
              {fabricante.map((row, index) => (
                <StyledTableRow key={index}>
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
              {equipo.map((row, index) => (
                <StyledTableRow key={index}>
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
              {tecnico.map((row, index) => (
                <StyledTableRow key={index}>
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
              {dimensiones.map((row, index) => (
                <StyledTableRow key={index}>
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
              {planificación.map((row, index) => (
                <StyledTableRow key={index}>
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
              <StyledTableCell align="center">
                {datosMaquina.funcionamiento || 'Sin datos'}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
  
export default DescripcionMaquina;