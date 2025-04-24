package uni.ingsoft.maquinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import uni.ingsoft.maquinaria.model.Insumos;

public interface InsumosRepo extends CrudRepository<Insumos, Integer> {
  @Query("SELECT p FROM Insumos p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
  List<Insumos> searchByName(@Param("nombre") String nombre);
}
