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
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.mapper.TareaMapper;
import uni.ingsoft.maquinaria.model.request.TareaReqDto;
import uni.ingsoft.maquinaria.repository.MaquinaRepo;
import uni.ingsoft.maquinaria.repository.TareaRepo;
import java.time.LocalDate;
import java.util.List;

@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = MaquinariaApplication.class)
public class TareasTests {
	private static final String BASE_ENDPOINT = "/tareas";

	@Autowired private MockMvc mvc;
	@Autowired private ObjectMapper objectMapper;


	@Autowired private TareaRepo tareaRepo;
	@Autowired private TareaMapper tareaMapper;

	private static Maquina maquina;

	@BeforeAll
	public static void setup(@Autowired MaquinaRepo maquinaRepo) {
		maquina = maquinaRepo.save(Maquina.builder()
				.modelo("Modelo 1")
				.codigo("Codigo 1")
				.area("Area 1")
				.criticidad(Criticidad.MEDIA)
				.build()
		);
	}

	@Test
	void testGuardarTarea() throws Exception {
		// Cuando: se solicita guardar una tarea
		TareaReqDto tareaReq = TareaReqDto.builder()
				.periodicidad(20)
				.unidad("mes")
				.idMaquina(maquina.getId())
				.build();

		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.post(BASE_ENDPOINT)
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(List.of(tareaReq))))
				.andDo(print())
		// Entonces: Se debe guardar dicha tarea y responder con un HTTP 201
				.andExpect(status().isCreated())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$[0].id"));
		assertNotNull(JsonPath.read(responseBody, "$[0].fecha"));
	}

	@Test
	void testEditarTarea() throws Exception {
		// Dado: una tarea presente en la DB
		Tarea tarea = tareaRepo.save(Tarea.builder()
				.periodicidad(20)
				.unidad("mes")
				.maquina(maquina)
				.build());

		// Cuando: se edita dicha tarea
		TareaReqDto tareaPatch = TareaReqDto.builder().periodicidad(30).build();
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.patch(BASE_ENDPOINT + "/{id}", tarea.getId())
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(tareaPatch)))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y editar los campos solicitados sin alterar el resto
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
		assertEquals(JsonPath.read(responseBody, "$.unidad"), tarea.getUnidad());
		assertEquals(JsonPath.read(responseBody, "$.periodicidad"), tareaPatch.getPeriodicidad());
	}

	@Test
	void testVerTarea() throws Exception {
		// Dado: una tarea presente en la DB
		Tarea tarea = tareaRepo.save(Tarea.builder()
				.periodicidad(20)
				.unidad("mes")
				.maquina(maquina)
				.build());

		// Cuando: se solicita ver dicha tarea
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.get(BASE_ENDPOINT + "/{id}", tarea.getId()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y devolver la tarea solicitada
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
		assertEquals(JsonPath.read(responseBody, "$.unidad"), tarea.getUnidad());
		assertEquals(JsonPath.read(responseBody, "$.periodicidad"), tarea.getPeriodicidad());
	}

	@Test
	void testGetTareasMantenimientoHoy() throws Exception {
		// Dado: una tarea presente en la DB con fecha de mantenimiento de hoy
		Tarea tarea = tareaRepo.save(Tarea.builder()
				.periodicidad(20)
				.unidad("mes")
				.fecha(LocalDate.now())
				.maquina(maquina)
				.build());

		// Cuando: se solicitan las tareas a las cuales se les debe aplicar mantenimiento en el dia de hoy
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.get(BASE_ENDPOINT + "/mantenimiento"))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y devolver las tareas con fecha de mantenimiento de hoy
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertEquals(JsonPath.read(responseBody, "$[0].id"), tarea.getId());
	}

	@Test
	void testEliminarTarea() throws Exception {
		// Dado: una tarea presente en la DB
		Tarea tarea = tareaRepo.save(Tarea.builder()
				.periodicidad(20)
				.unidad("mes")
				.maquina(maquina)
				.build());

		// Cuando: se solicita eliminar dicha tarea
		mvc.perform(
						MockMvcRequestBuilders.delete(BASE_ENDPOINT + "/{id}", tarea.getId()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 204, y eliminar la tarea solicitada
				.andExpect(status().isNoContent());

		assertTrue(tareaRepo.findById(tarea.getId()).isEmpty());
	}
}
