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

import jakarta.validation.Valid;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.Tecnicos;
import uni.ingsoft.maquinaria.model.mapper.TecnicosMapper;
import uni.ingsoft.maquinaria.model.request.TecnicosReqDto;
import uni.ingsoft.maquinaria.repository.TareaRepo;
import uni.ingsoft.maquinaria.repository.TecnicosRepo;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;

@RestController
@RequestMapping("/tecnicos")
public class TecnicosController {
  @Autowired private TecnicosRepo tecnicosRepo;
  @Autowired private TecnicosMapper tecnicosMapper;

  @PostMapping
  @ResponseBody
  @ResponseStatus(HttpStatus.CREATED)
  public Tecnicos crearTecnico(@RequestBody @Valid TecnicosReqDto tecnicoDto)
      throws MaquinariaExcepcion {

    if (tecnicoDto == null) {
      throw new MaquinariaExcepcion(ErrorCodes.TECNICOS_VACIOS);
    }

    if (tecnicoDto.getNombre() == null || tecnicoDto.getNombre().isEmpty()) {
      throw new MaquinariaExcepcion(ErrorCodes.NOMBRE_NULO);
    }

    Tecnicos tecnico = tecnicosMapper.fromRequestDto(tecnicoDto);
    tecnicosRepo.save(tecnico);

    return tecnico;
  }

  @GetMapping
  @ResponseBody
  public List<Tecnicos> getTecnicos(@RequestParam(name = "nombre", required = false) String nombre)
      throws MaquinariaExcepcion {
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
  public Tecnicos getTecnico(@PathVariable("mid") Integer mid) throws MaquinariaExcepcion {
    Optional<Tecnicos> opTecnico = tecnicosRepo.findById(mid);

    if (opTecnico.isEmpty()) {
      throw new MaquinariaExcepcion(ErrorCodes.TECNICO_NO_ENCONTRADO);
    }

    return opTecnico.get();
  }

  @PatchMapping("/{mid}")
  @ResponseBody
  public Tecnicos actualizarTecnico(
      @PathVariable("mid") Integer mid, @RequestBody TecnicosReqDto tecnicoDto)
      throws MaquinariaExcepcion {
    Optional<Tecnicos> opTecnico = tecnicosRepo.findById(mid);

    if (opTecnico.isEmpty()) {
      throw new MaquinariaExcepcion(ErrorCodes.TECNICO_NO_ENCONTRADO);
    }

    Tecnicos tecnico = opTecnico.get();
    // esto no mapea los campos nulos, los ignora. Solo para ahorrarse todos los if's
    tecnicosMapper.fromUpdateReqDTO(tecnicoDto, tecnico);
    tecnico = tecnicosRepo.save(tecnico);

    return tecnico;
  }

  @Autowired TareaRepo tareaRepo;

  @DeleteMapping("/{mid}")
  @ResponseBody
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTecnico(@PathVariable("mid") Integer mid) throws MaquinariaExcepcion {
    Optional<Tecnicos> opTecnicos = tecnicosRepo.findById(mid);

    if (opTecnicos.isEmpty()) {
      throw new MaquinariaExcepcion(ErrorCodes.TECNICO_NO_ENCONTRADO);
    }

    try {
      tecnicosRepo.deleteById(mid);
    } catch (DataIntegrityViolationException e) {
      // si se viola regla de fk se busca cuales son las tareas con las que esta relacionada con uno
      // o mas tecnicos
      List<Tarea> tareas = tareaRepo.findTareasByTecnicoId(mid);
      String tareasIdStr =
          tareas.stream().map(t -> t.getId().toString()).collect(Collectors.joining(", "));
      throw new MaquinariaExcepcion(
          ErrorCodes.ERROR_FK_ELIMINAR_TECNICOS, "Relacionada con tareas: [" + tareasIdStr + "]");
    }
  }
}
