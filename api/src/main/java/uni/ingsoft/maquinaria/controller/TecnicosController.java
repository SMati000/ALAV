package uni.ingsoft.maquinaria.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import uni.ingsoft.maquinaria.model.mapper.TecnicosMapper;
import uni.ingsoft.maquinaria.model.request.TecnicosReqDto;
import uni.ingsoft.maquinaria.repository.TecnicosRepo;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.TecnicosException;

import jakarta.validation.Valid;

import uni.ingsoft.maquinaria.model.Tecnicos;

@RestController
@RequestMapping("/tecnicos")
public class TecnicosController {
	@Autowired
	private TecnicosRepo tecnicosRepo;
	@Autowired
	private TecnicosMapper tecnicosMapper;

	@PostMapping
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public Tecnicos crearTecnico(@RequestBody @Valid TecnicosReqDto tecnicoDto) throws TecnicosException {

		if (tecnicoDto == null) {
			throw new TecnicosException(ErrorCodes.TECNICOS_VACIOS);
		}

		if (tecnicoDto.getNombre() == null || tecnicoDto.getNombre().isEmpty()) {
			throw new TecnicosException(ErrorCodes.NOMBRE_NULO);
		}

		Tecnicos tecnico = tecnicosMapper.fromRequestDto(tecnicoDto);
		tecnicosRepo.save(tecnico);

		return tecnico;
	}

	@GetMapping
	@ResponseBody
	public List<Tecnicos> getTecnicos(@RequestParam(name = "nombre", required = false) String nombre)
			throws TecnicosException {
		List<Tecnicos> tecnicos = new ArrayList<>();
		boolean noFilters = true;

		if (nombre != null && !nombre.isEmpty()) {
			noFilters = false;
			tecnicos = tecnicosRepo.searchByName(nombre);
		}
		if (noFilters) {
			tecnicosRepo.findAll().forEach(tecnicos::add);
		}

		return tecnicos;
	}

	@GetMapping("/{mid}")
	@ResponseBody
	public Tecnicos getTecnico(@PathVariable("mid") Integer mid) throws TecnicosException {
		Optional<Tecnicos> opTecnico = tecnicosRepo.findById(mid);

		if (opTecnico.isEmpty()) {
			throw new TecnicosException(ErrorCodes.TECNICO_NO_ENCONTRADO);
		}

		return opTecnico.get();
	}

	/*
	 * @PatchMapping("/{mid}")
	 * 
	 * @ResponseBody
	 * public Tecnicos actualizarTecnico(@PathVariable("mid") Integer
	 * mid, @RequestBody @Valid TecnicosReqDto tecnicosDto) throws TecnicosException
	 * {
	 * Optional<Tecnicos> opTecnicos = tecnicosRepo.findById(mid);
	 * 
	 * if (opTecnicos.isEmpty()) {
	 * throw new TecnicosException(ErrorCodes.TECNICO_NO_ENCONTRADO);
	 * }
	 * 
	 * Tecnicos tecnico = opTecnicos.get();
	 * tecnicosMapper.fromUpdateReqDTO(tecnicosDto, tecnico);
	 * 
	 * return tecnicosRepo.save(tecnico);
	 * }
	 */

	@PatchMapping("/{mid}")
	@ResponseBody
	public Tecnicos actualizarTecnico(@PathVariable("mid") Integer mid, @RequestBody @Valid TecnicosReqDto tecnicoDto)
			throws TecnicosException {
		Optional<Tecnicos> opTecnico = tecnicosRepo.findById(mid);

		if (opTecnico.isEmpty()) {
			throw new TecnicosException(ErrorCodes.TECNICO_NO_ENCONTRADO);
		}

		Tecnicos tecnico = opTecnico.get();

		if (tecnicoDto.getNombre() != null && !tecnicoDto.getNombre().isEmpty()) {
			tecnico.setNombre(tecnicoDto.getNombre());
		}

		if (tecnicoDto.getApellido() != null) {
			tecnico.setApellido(tecnicoDto.getApellido());
		}

		if (tecnicoDto.getPuesto() != null) {
			tecnico.setPuesto(tecnicoDto.getPuesto());
		}

		if (tecnicoDto.getCodigo() != null) {
			tecnico.setCodigo(tecnicoDto.getCodigo());
		}

		if (tecnicoDto.getFecha_creacion() != null) {
			tecnico.setFecha_creacion(tecnicoDto.getFecha_creacion());
		}

		if (tecnicoDto.getFecha_revision() != null) {
			tecnico.setFecha_revision(tecnicoDto.getFecha_revision());
		}

		if (tecnicoDto.getNivel() != null) {
			tecnico.setNivel(tecnicoDto.getNivel());
		}

		if (tecnicoDto.getArea() != null) {
			tecnico.setArea(tecnicoDto.getArea());
		}

		if (tecnicoDto.getRedactor() != null) {
			tecnico.setRedactor(tecnicoDto.getRedactor());
		}

		if (tecnicoDto.getSalario() != null) {
			tecnico.setSalario(tecnicoDto.getSalario());
		}

		if (tecnicoDto.getSupervisor_inmediato() != null) {
			tecnico.setSupervisor_inmediato(tecnicoDto.getSupervisor_inmediato());
		}

		if (tecnicoDto.getObjetivo_puesto() != null) {
			tecnico.setObjetivo_puesto(tecnicoDto.getObjetivo_puesto());
		}

		if (tecnicoDto.getFunciones() != null) {
			tecnico.setFunciones(tecnicoDto.getFunciones());
		}

		if (tecnicoDto.getResponsabilidades() != null) {
			tecnico.setResponsabilidades(tecnicoDto.getResponsabilidades());
		}

		if (tecnicoDto.getHerramientas() != null) {
			tecnico.setHerramientas(tecnicoDto.getHerramientas());
		}

		if (tecnicoDto.getCondiciones_extras() != null) {
			tecnico.setCondiciones_extras(tecnicoDto.getCondiciones_extras());
		}

		if (tecnicoDto.getAutoridad() != null) {
			tecnico.setAutoridad(tecnicoDto.getAutoridad());
		}

		if (tecnicoDto.getRelaciones_formales() != null) {
			tecnico.setRelaciones_formales(tecnicoDto.getRelaciones_formales());
		}

		if (tecnicoDto.getAmbiente_fisico() != null) {
			tecnico.setAmbiente_fisico(tecnicoDto.getAmbiente_fisico());
		}

		if (tecnicoDto.getFormacion() != null) {
			tecnico.setFormacion(tecnicoDto.getFormacion());
		}

		if (tecnicoDto.getConocimiento_especifico() != null) {
			tecnico.setConocimiento_especifico(tecnicoDto.getConocimiento_especifico());
		}

		if (tecnicoDto.getExperiencia() != null) {
			tecnico.setExperiencia(tecnicoDto.getExperiencia());
		}

		if (tecnicoDto.getRequerimiento_fisico() != null) {
			tecnico.setRequerimiento_fisico(tecnicoDto.getRequerimiento_fisico());
		}

		if (tecnicoDto.getHabilidades_actitudes() != null) {
			tecnico.setHabilidades_actitudes(tecnicoDto.getHabilidades_actitudes());
		}

		tecnico = tecnicosRepo.save(tecnico);

		return tecnico;
	}

	@DeleteMapping("/{mid}")
	@ResponseBody
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTecnico(@PathVariable("mid") Integer mid) throws TecnicosException {
		Optional<Tecnicos> opTecnicos = tecnicosRepo.findById(mid);

		if (opTecnicos.isEmpty()) {
			throw new TecnicosException(ErrorCodes.TECNICO_NO_ENCONTRADO);
		}

		tecnicosRepo.deleteById(mid);
	}

}
