package uni.ingsoft.maquinaria.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
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

import jakarta.validation.Valid;
import uni.ingsoft.maquinaria.model.EstadoOrdenesTrabajo;
import uni.ingsoft.maquinaria.model.OrdenTrabajo;
import uni.ingsoft.maquinaria.model.mapper.OrdenTrabajoMapper;
import uni.ingsoft.maquinaria.model.request.OrdenTrabajoReqDto;
import uni.ingsoft.maquinaria.repository.OrdenTrabajoRepo;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;


@Validated
@RestController
@RequestMapping("/ordenesTrabajo")
public class OrdenTrabajoController {
    @Autowired
    private OrdenTrabajoRepo ordenTrabajoRepo;
    @Autowired
    private OrdenTrabajoMapper ordenTrabajoMapper;

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public OrdenTrabajo crearOrdenTrabajo(@RequestBody @Valid OrdenTrabajoReqDto ordenTrabajoDto) throws MaquinariaExcepcion {
        
        if(ordenTrabajoDto == null) {
            throw new MaquinariaExcepcion(ErrorCodes.ORDENES_VACIAS);
        }
		if(ordenTrabajoDto.getFechaInicio() == null) {
			ordenTrabajoDto.setFechaInicio(LocalDate.now());
		}
        OrdenTrabajo ordenTrabajo = ordenTrabajoMapper.fromRequestDto(ordenTrabajoDto);
        ordenTrabajoRepo.save(ordenTrabajo);

        return ordenTrabajo;
    }

    @GetMapping
	@ResponseBody
	public List<OrdenTrabajo> getOrdenesTrabajo(@RequestParam(name = "estado", required = false) EstadoOrdenesTrabajo estadoStr) throws MaquinariaExcepcion {
		if(estadoStr != null) {
			
			return ordenTrabajoRepo.findByEstado(estadoStr);
		}
		List<OrdenTrabajo> ordenTrabajo = new ArrayList<>();
		ordenTrabajoRepo.findAll().forEach(ordenTrabajo::add);
		return ordenTrabajo;
	}
	

    @GetMapping("/{mid}")
	@ResponseBody
	public OrdenTrabajo getOrdenTrabajo(@PathVariable("mid") Integer mid) throws MaquinariaExcepcion {
		Optional<OrdenTrabajo> opOrdenTrabajo = ordenTrabajoRepo.findById(mid);

		if(opOrdenTrabajo.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.ORDEN_NO_ENCONTRADA);
		}

		return opOrdenTrabajo.get();
	}

    @PatchMapping("/{tid}")
	@ResponseBody
	public OrdenTrabajo actualizarOrdenTrabajo(@PathVariable("tid") Integer tid, @RequestBody @Valid OrdenTrabajoReqDto ordenTrabajoReqDto) throws MaquinariaExcepcion {
		Optional<OrdenTrabajo> opOrdenTrabajo = ordenTrabajoRepo.findById(tid);

		if(opOrdenTrabajo.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.ORDEN_NO_ENCONTRADA);
		}

		OrdenTrabajo ordenTrabajo = opOrdenTrabajo.get();
		ordenTrabajoMapper.fromUpdateReq(ordenTrabajoReqDto, ordenTrabajo);
		
		if(ordenTrabajoReqDto.getEstado() != null &&
			(ordenTrabajoReqDto.getEstado() == EstadoOrdenesTrabajo.FINALIZADA || 
			ordenTrabajoReqDto.getEstado() == EstadoOrdenesTrabajo.RECHAZADA)){
				ordenTrabajo.setFechaFin(LocalDate.now());
		}else{
			if(ordenTrabajo.getEstado() == EstadoOrdenesTrabajo.EMITIDA){
				ordenTrabajo.setEstado(EstadoOrdenesTrabajo.EMITIDA);
			}else if(ordenTrabajo.getEstado() == EstadoOrdenesTrabajo.PENDIENTE){
				ordenTrabajo.setEstado(EstadoOrdenesTrabajo.PENDIENTE);
			}else{
				throw new MaquinariaExcepcion(ErrorCodes.ORDEN_NO_ENCONTRADA);		
			}		
		}

		ordenTrabajo = ordenTrabajoRepo.save(ordenTrabajo);
		return ordenTrabajo;
	}

    @DeleteMapping("/{tid}")
	@ResponseBody
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteOrdenTrabajo(@PathVariable("tid") Integer tid) throws MaquinariaExcepcion {
		Optional<OrdenTrabajo> opOrdenTrabajo = ordenTrabajoRepo.findById(tid);

		if(opOrdenTrabajo.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.ORDEN_NO_ENCONTRADA);
		}

		ordenTrabajoRepo.deleteById(tid);
	}

	



}
