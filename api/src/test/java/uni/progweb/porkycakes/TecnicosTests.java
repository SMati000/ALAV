package uni.progweb.porkycakes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
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
import uni.ingsoft.maquinaria.model.Tecnicos;
import uni.ingsoft.maquinaria.model.mapper.TecnicosMapper;
import uni.ingsoft.maquinaria.model.request.TecnicosReqDto;
import uni.ingsoft.maquinaria.repository.TecnicosRepo;

@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = MaquinariaApplication.class)
public class TecnicosTests {
	private static final String BASE_ENDPOINT = "/tecnicos";

	@Autowired private MockMvc mvc;
	@Autowired private ObjectMapper objectMapper;

	@Autowired private TecnicosRepo tecnicosRepo;
	@Autowired private TecnicosMapper tecnicosMapper;

	@Test
	void testGuardarTecnico() throws Exception {
		// Cuando: se solicita guardar un tecnico
		TecnicosReqDto tecnicoReq = TecnicosReqDto.builder()
				.nombre("Tecnico 1")
				.apellido("Para prueba")
				.dni(20487238)
				.build();

		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.post(BASE_ENDPOINT)
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(tecnicoReq)))
				.andDo(print())
		// Entonces: Se debe guardar dicho tecnico y responder con un HTTP 201
				.andExpect(status().isCreated())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id_tecnico"));
	}

	@Test
	void testEditarTecnico() throws Exception {
		// Dado: un tecnico presente en la DB
		Tecnicos tecnico = tecnicosRepo.save(Tecnicos.builder()
				.nombre("Tecnico 1")
				.apellido("Para prueba")
				.dni(20487238)
				.build());

		// Cuando: se edita dicho tecnico
		TecnicosReqDto tecnicoPatch = TecnicosReqDto.builder().dni(25427123).build();
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.patch(BASE_ENDPOINT + "/{id}", tecnico.getId_tecnico())
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(tecnicoPatch)))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y editar los campos solicitados sin alterar el resto
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id_tecnico"));
		assertEquals(JsonPath.read(responseBody, "$.nombre"), tecnico.getNombre());
		assertEquals(JsonPath.read(responseBody, "$.apellido"), tecnico.getApellido());
		assertEquals(JsonPath.read(responseBody, "$.dni"), tecnicoPatch.getDni());
	}

	@Test
	void testVerTecnico() throws Exception {
		// Dado: un tecnico presente en la DB
		Tecnicos tecnico = tecnicosRepo.save(Tecnicos.builder()
				.nombre("Tecnico 1")
				.apellido("Para prueba")
				.dni(20487238)
				.build());

		// Cuando: se solicita ver dicho tecnico
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.get(BASE_ENDPOINT + "/{id}", tecnico.getId_tecnico()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y devolver el tecnico solicitado
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id_tecnico"));
		assertEquals(JsonPath.read(responseBody, "$.nombre"), tecnico.getNombre());
		assertEquals(JsonPath.read(responseBody, "$.apellido"), tecnico.getApellido());
		assertEquals(JsonPath.read(responseBody, "$.dni"), tecnico.getDni());
	}

	@Test
	void testEliminarTecnico() throws Exception {
		// Dado: un tecnico presente en la DB
		Tecnicos tecnico = tecnicosRepo.save(Tecnicos.builder()
				.nombre("Tecnico 1")
				.apellido("Para prueba")
				.dni(20487238)
				.build());

		// Cuando: se solicita eliminar dicho tecnico
		mvc.perform(
						MockMvcRequestBuilders.delete(BASE_ENDPOINT + "/{id}", tecnico.getId_tecnico()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 204, y eliminar el tecnico solicitado
				.andExpect(status().isNoContent());

		assertTrue(tecnicosRepo.findById(tecnico.getId_tecnico()).isEmpty());
	}
}
