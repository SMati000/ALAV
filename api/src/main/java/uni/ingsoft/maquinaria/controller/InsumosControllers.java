package uni.ingsoft.maquinaria.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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

import uni.ingsoft.maquinaria.model.mapper.InsumosMapper;
import uni.ingsoft.maquinaria.model.request.InsumosReqDto;
import uni.ingsoft.maquinaria.repository.InsumosRepo;
import uni.ingsoft.maquinaria.repository.TareaRepo;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;
import jakarta.validation.Valid;

import uni.ingsoft.maquinaria.model.Insumos;
import uni.ingsoft.maquinaria.model.Tarea;


@RestController
@RequestMapping("/insumos")
public class InsumosControllers {
    @Autowired 
    private InsumosRepo insumosRepo;
    @Autowired 
    private InsumosMapper insumosMapper;

    @PostMapping
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Insumos crearInsumo(@RequestBody @Valid InsumosReqDto insumoDto) throws MaquinariaExcepcion {
        
        if(insumoDto == null) {
            throw new MaquinariaExcepcion(ErrorCodes.INSUMOS_VACIOS);
        }

        if(insumoDto.getNombre() == null || insumoDto.getNombre().isEmpty()) {
            throw new MaquinariaExcepcion(ErrorCodes.NOMBRE_INSUMOS_NULO);
        }

        Insumos insumo = insumosMapper.fromRequestDto(insumoDto);
        insumosRepo.save(insumo);

        return insumo;
    }

    @GetMapping
	@ResponseBody
	public List<Insumos> getInsumos(@RequestParam(name = "nombre", required = false) String nombre) throws MaquinariaExcepcion {
		List<Insumos> insumos = new ArrayList<>();
		boolean noFilters = true;

		if(nombre != null && !nombre.isEmpty()) {
			noFilters = false;
			insumos = insumosRepo.searchByName(nombre);
        }
        if(noFilters) {
			insumosRepo.findAll().forEach(insumos::add);
		}

		return insumos;
	}

    @GetMapping("/{mid}")
	@ResponseBody
	public Insumos getInsumo(@PathVariable("mid") Integer mid) throws MaquinariaExcepcion {
		Optional<Insumos> opInsumo = insumosRepo.findById(mid);

		if(opInsumo.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.INSUMO_NO_ENCONTRADO);
		}

		return opInsumo.get();
	}

    @PatchMapping("/{mid}")
	@ResponseBody
	public Insumos actualizarInsumo(@PathVariable("mid") Integer mid, @RequestBody InsumosReqDto InsumosDto) throws MaquinariaExcepcion {
		Optional<Insumos> opInsumos = insumosRepo.findById(mid);

		if(opInsumos.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.INSUMO_NO_ENCONTRADO);
		}

		Insumos Insumo = opInsumos.get();

		if(InsumosDto.getNombre() != null && !InsumosDto.getNombre().isEmpty()) {
			Insumo.setNombre(InsumosDto.getNombre());
		}

		if(InsumosDto.getDescripcion() != null) {
			Insumo.setDescripcion(InsumosDto.getDescripcion());
		}
        
        if(InsumosDto.getStock() != null) {
            Insumo.setStock(InsumosDto.getStock());
        }

		Insumo = insumosRepo.save(Insumo);
		return Insumo;
	}
	
	
	@Autowired
	TareaRepo tareaRepo;
    
	@DeleteMapping("/{mid}")
	@ResponseBody
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteInsumo(@PathVariable("mid") Integer mid) throws MaquinariaExcepcion {
		Optional<Insumos> opInsumos = insumosRepo.findById(mid);

		if(opInsumos.isEmpty()) {
			throw new MaquinariaExcepcion(ErrorCodes.INSUMO_NO_ENCONTRADO);
		}
		try {
			insumosRepo.deleteById(mid);
		} catch (DataIntegrityViolationException e) {			
			//si se viola regla de fk se busca cuales son las tareas con las que esta relacionada la maquina			
			List<Tarea> tareas = tareaRepo.findTareasByInsumoId(mid); 
			String tareasIdStr = tareas.stream()
				.map(t -> t.getId().toString())
				.collect(Collectors.joining(", "));
		
			throw new MaquinariaExcepcion(ErrorCodes.ERROR_FK_ELIMINAR_INSUMOS, "Relacionada con tareas: [" + tareasIdStr + "]");
		}
		
	}
    
}
