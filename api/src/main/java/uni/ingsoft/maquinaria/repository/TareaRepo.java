package uni.ingsoft.maquinaria.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import uni.ingsoft.maquinaria.model.Tarea;

public interface TareaRepo extends CrudRepository<Tarea, Integer> {

    List<Tarea> findByCodigoMaquina(String codigoMaquina);
}