package uni.ingsoft.maquinaria.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.mapper.TareaMapper;
import uni.ingsoft.maquinaria.model.request.MaquinaReqDto;
import uni.ingsoft.maquinaria.model.request.TareaReqDto;
import uni.ingsoft.maquinaria.repository.TareaRepo;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/tareas")
public class TareaController {
	@Autowired TareaRepo tareaRepo;
	@Autowired TareaMapper tareaMapper;

	@PostMapping
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public List<Tarea> crearTareas(@RequestBody @Valid List<TareaReqDto> tareasReqDto) throws MaquinariaExcepcion {
		if(tareasReqDto == null || tareasReqDto.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.MAQUINAS_VACIAS);
		}

		for(TareaReqDto tareaReqDto : tareasReqDto) {
			if(tareaReqDto.getFechaInicio().isAfter(tareaReqDto.getFechaFin())) {
				throw new MaquinariaExcepcion(ErrorCodes.FECHAS_INCONSISTENTES);
			}
		}

		List<Tarea> tareas = tareaMapper.fromRequestDtoList(tareasReqDto);
		tareaRepo.saveAll(tareas);

		return tareas;
	}

	@GetMapping("/{tid}")
	@ResponseBody
	public Tarea getMaquina(@PathVariable Integer tid) throws MaquinariaExcepcion {
		Optional<Tarea> opMaquina = tareaRepo.findById(tid);

		if(opMaquina.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.TAREA_NO_ENCONTRADA);
		}

		return opMaquina.get();
	}

	@GetMapping
	@ResponseBody
	public List<Tarea> getMaquinas(
	) throws MaquinariaExcepcion {
		List<Tarea> tareas = new ArrayList<>();
		tareaRepo.findAll().forEach(tareas::add);
		return tareas;
	}

	@DeleteMapping("/{tid}")
	@ResponseBody
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteMaquina(@PathVariable Integer tid) throws MaquinariaExcepcion {
		Optional<Tarea> opMaquina = tareaRepo.findById(tid);

		if(opMaquina.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.MAQUINA_NO_ENCONTRADA);
		}

		tareaRepo.deleteById(tid);
	}
}