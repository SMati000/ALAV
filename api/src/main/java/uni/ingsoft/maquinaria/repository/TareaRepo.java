package uni.ingsoft.maquinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import uni.ingsoft.maquinaria.model.Tarea;

public interface TareaRepo extends CrudRepository<Tarea, Integer> {

    @Query("Select t FROM Tarea t WHERE t.maquina.codigo = :codigoMaquina")
    List<Tarea> findByCodigoMaquina(@Param("codigoMaquina") String codigoMaquina);
}