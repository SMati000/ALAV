package uni.ingsoft.maquinaria.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import uni.ingsoft.maquinaria.model.EstadoOrdenesTrabajo;
import uni.ingsoft.maquinaria.model.OrdenTrabajo;

public interface OrdenTrabajoRepo extends CrudRepository<OrdenTrabajo, Integer> {

  Optional<OrdenTrabajo> findByIdTarea(int idTarea);

  List<OrdenTrabajo> findByEstado(EstadoOrdenesTrabajo estado);
}
