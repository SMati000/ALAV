import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axiosInstance from './../../axiosConfig';
import BotonAtras from './../components/botonAtras';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

function DescripcionTecnico() {
    const theme = useTheme();
    const { id } = useParams();
    const [datosTecnico, setDatosTecnico] = useState(null);
    const [tareasAsignadas, setTareasAsignadas]=useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const pdfRef = useRef(null);

    useEffect(() => {
        const fetchTecnicoID = async () => {
            try {
                const response = await axiosInstance.get(`/tecnicos/${id}`);
                setDatosTecnico(response.data);
            } catch (error) {
                console.error(`Error al obtener técnico con id ${id}:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchTecnicoID();
    }, [id]);

    React.useEffect(()=>{
        const fetchTareasAsignadas = async () =>{
            try {
            const response = await axiosInstance.get(`/tareas/tareasPorTecnico/${id}`);
            setTareasAsignadas(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(`Error al obtener las tareas del técnico con id ${id}:`, error);
        } finally {
            setLoading(false);
        }
        };
        fetchTareasAsignadas();
    });


    if (loading) return <div>Cargando...</div>;
    if (!datosTecnico) return <div>No hay datos para mostrar</div>;

    return (
        <div style={{ padding: '0', margin: '1rem' }}>
            <Box>
                <BotonAtras link='/' />

                <Box
                    ref={pdfRef}
                    sx={{
                        width: '75%',
                        margin: '0 auto',
                        mt: 2,
                        backgroundColor: 'white',
                        padding: 3,
                        boxShadow: 3,
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h4" align="center" sx={{ fontWeight: '500', p: 2}}>
                        Puesto: {datosTecnico.puesto}
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell colSpan={2}><Typography variant="h6" align="center" sx={{ fontWeight: '500' }}>Identificación</Typography></TableCell></TableRow>
                            <TableRow><TableCell>Nombre</TableCell><TableCell>{datosTecnico.nombre}</TableCell></TableRow>
                            <TableRow><TableCell>Apellido</TableCell><TableCell>{datosTecnico.apellido}</TableCell></TableRow>
                            <TableRow><TableCell>DNI</TableCell><TableCell>{datosTecnico.dni}</TableCell></TableRow>
                            <TableRow><TableCell>Fecha de creación</TableCell><TableCell>{datosTecnico.fecha_creacion}</TableCell></TableRow>
                            <TableRow><TableCell>Fecha de revisión</TableCell><TableCell>{datosTecnico.fecha_revision}</TableCell></TableRow>
                            <TableRow><TableCell>Nivel</TableCell><TableCell>{datosTecnico.nivel}</TableCell></TableRow>
                            <TableRow><TableCell>Código</TableCell><TableCell>{datosTecnico.codigo}</TableCell></TableRow>
                            <TableRow><TableCell>Área - Departamento</TableCell><TableCell>{datosTecnico.area}</TableCell></TableRow>
                            <TableRow><TableCell>Redactor</TableCell><TableCell>{datosTecnico.redactor}</TableCell></TableRow>
                            <TableRow><TableCell>Salario</TableCell><TableCell>{datosTecnico.salario}</TableCell></TableRow>
                            <TableRow><TableCell>Supervisor</TableCell><TableCell>{datosTecnico.supervisor_inmediato}</TableCell></TableRow>
                            <TableRow><TableCell>Tareas asigandas</TableCell><TableCell>{tareasAsignadas}</TableCell></TableRow>

                            <TableRow><TableCell colSpan={2}><Typography variant="h6" align="center" sx={{ fontWeight: '500' }}>Descripción</Typography></TableCell></TableRow>
                            <TableRow><TableCell>Objetivos del puesto</TableCell><TableCell>{datosTecnico.objetivo_puesto}</TableCell></TableRow>
                            <TableRow><TableCell>Funciones</TableCell><TableCell>{datosTecnico.funciones}</TableCell></TableRow>
                            <TableRow><TableCell>Responsabilidades</TableCell><TableCell>{datosTecnico.responsabilidades}</TableCell></TableRow>
                            <TableRow><TableCell>Autoridad</TableCell><TableCell>{datosTecnico.autoridad}</TableCell></TableRow>

                            <TableRow><TableCell colSpan={2}><Typography variant="h6" align="center" sx={{ fontWeight: '500' }}>Dimensiones</Typography></TableCell></TableRow>
                            <TableRow><TableCell>Relaciones formales</TableCell><TableCell>{datosTecnico.relaciones_formales}</TableCell></TableRow>
                            <TableRow><TableCell>Herramientas</TableCell><TableCell>{datosTecnico.herramientas}</TableCell></TableRow>
                            <TableRow><TableCell>Otras condiciones</TableCell><TableCell>{datosTecnico.condiciones_extras}</TableCell></TableRow>
                            <TableRow><TableCell>Ambiente físico</TableCell><TableCell>{datosTecnico.ambiente_fisico}</TableCell></TableRow>

                            <TableRow><TableCell colSpan={2}><Typography variant="h6" align="center" sx={{ fontWeight: '500' }}>Perfil</Typography></TableCell></TableRow>
                            <TableRow><TableCell>Formación</TableCell><TableCell>{datosTecnico.formacion}</TableCell></TableRow>
                            <TableRow><TableCell>Conocimientos específicos</TableCell><TableCell>{datosTecnico.conocimiento_especifico}</TableCell></TableRow>
                            <TableRow><TableCell>Experiencia</TableCell><TableCell>{datosTecnico.experiencia}</TableCell></TableRow>
                            <TableRow><TableCell>Requerimiento físico</TableCell><TableCell>{datosTecnico.requerimiento_fisico}</TableCell></TableRow>
                            <TableRow><TableCell>Habilidades y aptitudes</TableCell><TableCell>{datosTecnico.habilidades_actitudes}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </Box>

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                    <Button
                        onClick={() => exportToPDF(pdfRef, datosTecnico)}
                        color="success"
                        variant="contained"
                        startIcon={<DownloadIcon />}
                    >
                        Descargar
                    </Button>
                    <Button onClick={() => navigate(-1)} color="primary" variant="outlined">
                        Volver
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default DescripcionTecnico;
