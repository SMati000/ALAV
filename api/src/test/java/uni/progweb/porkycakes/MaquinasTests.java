package uni.progweb.porkycakes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import uni.ingsoft.maquinaria.MaquinariaApplication;
import uni.ingsoft.maquinaria.model.Criticidad;
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.mapper.MaquinaMapper;
import uni.ingsoft.maquinaria.model.request.MaquinaReqDto;
import uni.ingsoft.maquinaria.repository.MaquinaRepo;

@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = MaquinariaApplication.class)
public class MaquinasTests {
	private static final String BASE_ENDPOINT = "/maquinas";

	@Autowired private MockMvc mvc;
	@Autowired private ObjectMapper objectMapper;

	@Autowired private MaquinaRepo maquinaRepo;
	@Autowired private MaquinaMapper maquinaMapper;

	@Test
	void testGuardarMaquina() throws Exception {
		// Cuando: se solicita guardar una maquina
		MaquinaReqDto maquinaReq = MaquinaReqDto.builder()
				.modelo("Modelo 1")
				.codigo("Codigo 1")
				.area("Area 1")
				.criticidad(Criticidad.MEDIA)
				.build();

		MvcResult result = mvc.perform(multipart(HttpMethod.POST, BASE_ENDPOINT)
					.file(getMaquinaReqJson(maquinaReq))
					.contentType(MediaType.MULTIPART_FORM_DATA))
				.andDo(print())
		// Entonces: Se debe guardar dicha maquina y responder con un HTTP 201
				.andExpect(status().isCreated())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
	}

	@Test
	void testEditarMaquina() throws Exception {
		// Dado: una maquina presente en la DB
		Maquina maquina = maquinaRepo.save(Maquina.builder()
				.modelo("Modelo 1")
				.codigo("Codigo 1")
				.area("Area 1")
				.criticidad(Criticidad.MEDIA).build());

		// Cuando: se edita dicha maquina
		MaquinaReqDto maquinaPatch = MaquinaReqDto.builder()
				.modelo("Modelo 2")
				.build();
		MvcResult result = mvc.perform(multipart(HttpMethod.PATCH, BASE_ENDPOINT + "/{id}", maquina.getId())
						.file(getMaquinaReqJson(maquinaPatch))
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y editar los campos solicitados sin alterar el resto
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
		assertEquals(JsonPath.read(responseBody, "$.codigo"), maquina.getCodigo());
		assertEquals(JsonPath.read(responseBody, "$.area"), maquina.getArea());
		assertEquals(JsonPath.read(responseBody, "$.criticidad"), maquina.getCriticidad().name());
		assertEquals(JsonPath.read(responseBody, "$.modelo"), maquinaPatch.getModelo());
	}

	@Test
	void testVerMaquina() throws Exception {
		// Dado: una maquina presente en la DB
		Maquina maquina = maquinaRepo.save(Maquina.builder()
				.modelo("Modelo 1")
				.codigo("Codigo 1")
				.area("Area 1")
				.criticidad(Criticidad.MEDIA).build());

		// Cuando: se solicita ver dicha maquina
		MvcResult result = mvc.perform(
						MockMvcRequestBuilders.get(BASE_ENDPOINT + "/{id}", maquina.getId()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 200, y devolver la maquina solicitada
				.andExpect(status().isOk())
				.andReturn();

		String responseBody = result.getResponse().getContentAsString();

		assertNotNull(JsonPath.read(responseBody, "$.id"));
		assertEquals(JsonPath.read(responseBody, "$.modelo"), maquina.getModelo());
		assertEquals(JsonPath.read(responseBody, "$.codigo"), maquina.getCodigo());
		assertEquals(JsonPath.read(responseBody, "$.area"), maquina.getArea());
		assertEquals(JsonPath.read(responseBody, "$.criticidad"), maquina.getCriticidad().name());
	}

	@Test
	void testEliminarMaquina() throws Exception {
		// Dado: una maquina presente en la DB
		Maquina maquina = maquinaRepo.save(Maquina.builder()
				.modelo("Modelo 1")
				.codigo("Codigo 1")
				.area("Area 1")
				.criticidad(Criticidad.MEDIA).build());

		// Cuando: se solicita eliminar dicha maquina
		mvc.perform(
						MockMvcRequestBuilders.delete(BASE_ENDPOINT + "/{id}", maquina.getId()))
				.andDo(print())
		// Entonces: Se debe responder con un HTTP 204, y eliminar la maquina solicitada
				.andExpect(status().isNoContent());

		assertTrue(maquinaRepo.findById(maquina.getId()).isEmpty());
	}

	private MockMultipartFile getMaquinaReqJson(MaquinaReqDto maquinaReqDto) throws JsonProcessingException {
		return new MockMultipartFile("maquina", "", "application/json",
				objectMapper.writeValueAsString(maquinaReqDto).getBytes());
	}
}
