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
import uni.ingsoft.maquinaria.model.Insumos;
import uni.ingsoft.maquinaria.model.mapper.InsumosMapper;
import uni.ingsoft.maquinaria.model.request.InsumosReqDto;
import uni.ingsoft.maquinaria.repository.InsumosRepo;

@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = MaquinariaApplication.class)
public class InsumosTests {
	private static final String BASE_ENDPOINT = "/insumos";

	@Autowired private MockMvc mvc;
	@Autowired private ObjectMapper objectMapper;

	@Autowired private InsumosRepo insumosRepo;
	@Autowired private InsumosMapper insumosMapper;

	@Test
	void testGuardarInsumo() throws Exception {
		// Cuando: se solicita guardar un insumo
		InsumosReqDto insumoReq = new InsumosReqDto("Insumo 1", "Descripcion insumo 1", 3);

		MvcResult result = mvc.perform(
				MockMvcRequestBuilders.post(BASE_ENDPOINT)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(insumoReq)))
			.andDo(print())
		// Entonces: Se debe guardar dicho insumo y responder con un HTTP 201
			.andExpect(status().isCreated())
			.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.idInsumo"));
	}

	@Test
	void testEditarInsumo() throws Exception {
		// Dado: un insumo presente en la DB
		Insumos insumo = insumosRepo.save(new Insumos(null, "insumo 1", "descripcion insumo 1", 3));

		// Cuando: se edita dicho insumo
		InsumosReqDto insumoPatch = new InsumosReqDto(null, null, 20);
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.patch(BASE_ENDPOINT + "/{id}", insumo.getIdInsumo())
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(insumoPatch)))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y editar los campos solicitados sin alterar el resto
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.idInsumo"));
		assertEquals(JsonPath.read(responseBody, "$.nombre"), insumo.getNombre());
		assertEquals(JsonPath.read(responseBody, "$.descripcion"), insumo.getDescripcion());
		assertEquals(JsonPath.read(responseBody, "$.stock"), insumoPatch.getStock());
	}

	@Test
	void testVerInsumo() throws Exception {
		// Dado: un insumo presente en la DB
		Insumos insumo = insumosRepo.save(new Insumos(null, "insumo 1", "descripcion insumo 1", 3));

		// Cuando: se solicita ver dicho insumo
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.get(BASE_ENDPOINT + "/{id}", insumo.getIdInsumo()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y devolver el insumo solicitado
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.idInsumo"));
		assertEquals(JsonPath.read(responseBody, "$.nombre"), insumo.getNombre());
		assertEquals(JsonPath.read(responseBody, "$.descripcion"), insumo.getDescripcion());
		assertEquals((int)JsonPath.read(responseBody, "$.stock"), insumo.getStock());
	}

	@Test
	void testEliminarInsumo() throws Exception {
		// Dado: un insumo presente en la DB
		Insumos insumo = insumosRepo.save(new Insumos(null, "insumo 1", "descripcion insumo 1", 3));

		// Cuando: se solicita eliminar dicho insumo
		mvc.perform(
						MockMvcRequestBuilders.delete(BASE_ENDPOINT + "/{id}", insumo.getIdInsumo()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 204, y eliminar el insumo solicitado
				.andExpect(status().isNoContent());

		assertTrue(insumosRepo.findById(insumo.getIdInsumo()).isEmpty());
	}
}
