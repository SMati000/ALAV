package uni.ingsoft.maquinaria.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.mapper.TareaMapper;
import uni.ingsoft.maquinaria.model.request.TareaReqDto;
import uni.ingsoft.maquinaria.repository.TareaRepo;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;

import java.time.LocalDate;
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
	public Tarea getTarea(@PathVariable Integer tid) throws MaquinariaExcepcion {
		Optional<Tarea> opMaquina = tareaRepo.findById(tid);

		if(opMaquina.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.TAREA_NO_ENCONTRADA);
		}

		return opMaquina.get();
	}

	@GetMapping
	@ResponseBody
	public List<Tarea> getTareas(
	) throws MaquinariaExcepcion {
		List<Tarea> tareas = new ArrayList<>();
		tareaRepo.findAll().forEach(tareas::add);
		return tareas;
	}

	@PatchMapping("/{tid}")
	@ResponseBody
	public Tarea actualizarTarea(@PathVariable Integer tid, @RequestBody @Valid TareaReqDto tareaReqDto) throws MaquinariaExcepcion {
		Optional<Tarea> opTarea = tareaRepo.findById(tid);

		if(opTarea.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.TAREA_NO_ENCONTRADA);
		}

		Tarea tarea = opTarea.get();
		tareaMapper.fromUpdateReq(tareaReqDto, tarea);

		tarea = tareaRepo.save(tarea);
		return tarea;
	}

	@DeleteMapping("/{tid}")
	@ResponseBody
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTarea(@PathVariable("tid") Integer tid) throws MaquinariaExcepcion {
		Optional<Tarea> opMaquina = tareaRepo.findById(tid);

		if(opMaquina.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.MAQUINA_NO_ENCONTRADA);
		}

		tareaRepo.deleteById(tid);
	}

	@GetMapping("/mantenimiento")    
	@ResponseBody    
	public ResponseEntity<?> obtenerTareasPorFechaActual() {
		LocalDate fechaActual = LocalDate.now();
		List<Tarea> tareasCoincidentes = new ArrayList<>();

		for (Tarea tarea : tareaRepo.findAll()) {
			if (fechaActual.equals(tarea.getFecha())) {
				tareasCoincidentes.add(tarea);
			}
		}

		if (tareasCoincidentes.isEmpty()) {
			//code 204
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No hay tareas programadas para hoy.");
		}
		
		return ResponseEntity.ok(tareasCoincidentes);
	}



}