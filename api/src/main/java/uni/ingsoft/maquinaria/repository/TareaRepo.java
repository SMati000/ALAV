package uni.ingsoft.maquinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import uni.ingsoft.maquinaria.model.Tarea;

public interface TareaRepo extends CrudRepository<Tarea, Integer> {

  @Query("Select t FROM Tarea t WHERE t.maquina.codigo = :codigoMaquina")
  List<Tarea> findByCodigoMaquina(@Param("codigoMaquina") String codigoMaquina);

  List<Tarea> findByMaquina_Id(Integer idMaquina);

  @Query(
      value =
          "SELECT t.* FROM tarea t "
              + "JOIN tarea_xinsumos txi ON t.id = txi.tarea_id "
              + "WHERE txi.insumo_id = :insumoId",
      nativeQuery = true)
  List<Tarea> findTareasByInsumoId(@Param("insumoId") Integer insumoId);

  @Query(
      value =
          "SELECT t.* FROM tarea t "
              + "JOIN tarea_tecnicos tt ON t.id = tt.tarea_id "
              + "WHERE tt.tecnico_id = :tecnicoId",
      nativeQuery = true)
  List<Tarea> findTareasByTecnicoId(@Param("tecnicoId") Integer tecnicoId);


}
