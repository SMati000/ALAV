package uni.progweb.porkycakes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import uni.ingsoft.maquinaria.MaquinariaApplication;
import uni.ingsoft.maquinaria.model.Criticidad;
import uni.ingsoft.maquinaria.model.EstadoOrdenesTrabajo;
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.OrdenTrabajo;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.mapper.OrdenTrabajoMapper;
import uni.ingsoft.maquinaria.model.request.OrdenTrabajoReqDto;
import uni.ingsoft.maquinaria.repository.MaquinaRepo;
import uni.ingsoft.maquinaria.repository.OrdenTrabajoRepo;
import uni.ingsoft.maquinaria.repository.TareaRepo;
import java.time.LocalDate;

@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = MaquinariaApplication.class)
public class OrdenesTrabajoTests {
	private static final String BASE_ENDPOINT = "/ordenesTrabajo";

	@Autowired private MockMvc mvc;
	@Autowired private ObjectMapper objectMapper;

	@Autowired private OrdenTrabajoRepo ordenTrabajoRepo;
	@Autowired private OrdenTrabajoMapper ordenTrabajoMapper;

	private static Tarea tarea;
	private static Maquina maquina;

	@BeforeAll
	public static void setup(@Autowired TareaRepo tareaRepo, @Autowired MaquinaRepo maquinaRepo) {
		maquina = maquinaRepo.save(Maquina.builder()
				.modelo("Modelo 1")
				.codigo("Codigo 1")
				.area("Area 1")
				.criticidad(Criticidad.MEDIA)
				.build()
		);

		tarea = tareaRepo.save(Tarea.builder()
				.periodicidad(20)
				.unidad("mes")
				.maquina(maquina)
				.build());
	}

	@Test
	void testGuardarOrdenTrabajo() throws Exception {
		// Cuando: se solicita guardar una orden de trabajo
		OrdenTrabajoReqDto ordenTrabajoReq = OrdenTrabajoReqDto.builder()
				.idTarea(tarea.getId())
				.estado(EstadoOrdenesTrabajo.EMITIDA)
				.departamento("Maquinas")
				.descripcion("Orden de trabajo del dpto de maquinas")
				.build();

		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.post(BASE_ENDPOINT)
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(ordenTrabajoReq)))
				.andDo(print())
		// Entonces: Se debe guardar dicha orden de trabajo y responder con un HTTP 201
				.andExpect(status().isCreated())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
	}

	@Test
	void testEditarOrdenTrabajo() throws Exception {
		// Dado: una orden de trabajo presente en la DB
		OrdenTrabajo ordenTrabajo = ordenTrabajoRepo.save(OrdenTrabajo.builder()
				.idTarea(tarea.getId())
				.fechaInicio(LocalDate.now())
				.estado(EstadoOrdenesTrabajo.EMITIDA)
				.departamento("Maquinas")
				.descripcion("Orden de trabajo del dpto de maquinas")
				.build());

		// Cuando: se edita dicha orden de trabajo
		OrdenTrabajoReqDto ordenTrabajoPatch = OrdenTrabajoReqDto.builder()
				.estado(EstadoOrdenesTrabajo.FINALIZADA)
				.build();
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.patch(BASE_ENDPOINT + "/{id}", ordenTrabajo.getId())
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(ordenTrabajoPatch)))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y editar los campos solicitados sin alterar el resto
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
		assertEquals(JsonPath.read(responseBody, "$.idTarea"), ordenTrabajo.getIdTarea());
		assertEquals(JsonPath.read(responseBody, "$.descripcion"), ordenTrabajo.getDescripcion());
		assertEquals(JsonPath.read(responseBody, "$.departamento"), ordenTrabajo.getDepartamento());
		assertEquals(JsonPath.read(responseBody, "$.estado"), ordenTrabajoPatch.getEstado().name());
	}

	@Test
	void testVerOrdenTrabajo() throws Exception {
		// Dado: una orden de trabajo presente en la DB
		OrdenTrabajo ordenTrabajo = ordenTrabajoRepo.save(OrdenTrabajo.builder()
				.idTarea(tarea.getId())
				.fechaInicio(LocalDate.now())
				.estado(EstadoOrdenesTrabajo.EMITIDA)
				.departamento("Maquinas")
				.descripcion("Orden de trabajo del dpto de maquinas")
				.build());

		// Cuando: se solicita ver dicha orden de trabajo
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.get(BASE_ENDPOINT + "/{id}", ordenTrabajo.getId()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y devolver la orden de trabajo solicitada
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
		assertEquals(JsonPath.read(responseBody, "$.idTarea"), ordenTrabajo.getIdTarea());
		assertEquals(JsonPath.read(responseBody, "$.descripcion"), ordenTrabajo.getDescripcion());
		assertEquals(JsonPath.read(responseBody, "$.departamento"), ordenTrabajo.getDepartamento());
		assertEquals(JsonPath.read(responseBody, "$.estado"), ordenTrabajo.getEstado().name());
	}

	@Test
	void testEliminarOrdenTrabajo() throws Exception {
		// Dado: una orden de trabajo presente en la DB
		OrdenTrabajo ordenTrabajo = ordenTrabajoRepo.save(OrdenTrabajo.builder()
				.idTarea(tarea.getId())
				.fechaInicio(LocalDate.now())
				.estado(EstadoOrdenesTrabajo.EMITIDA)
				.departamento("Maquinas")
				.descripcion("Orden de trabajo del dpto de maquinas")
				.build());

		// Cuando: se solicita eliminar dicha orden de trabajo
		mvc.perform(
						MockMvcRequestBuilders.delete(BASE_ENDPOINT + "/{id}", ordenTrabajo.getId()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 204, y eliminar la orden de trabajo solicitada
				.andExpect(status().isNoContent());

		assertTrue(ordenTrabajoRepo.findById(ordenTrabajo.getId()).isEmpty());
	}
}
