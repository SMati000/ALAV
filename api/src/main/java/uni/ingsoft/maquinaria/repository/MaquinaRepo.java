package uni.ingsoft.maquinaria.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.TipoMaquina;
import java.util.List;

public interface MaquinaRepo extends CrudRepository<Maquina, Integer> {
	@Query("SELECT p FROM Maquina p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
	List<Maquina> searchByName(@Param("nombre") String nombre);

	@Query("SELECT p FROM Maquina p WHERE p.tipo = :tipo")
	List<Maquina> searchByCategory(@Param("tipo") TipoMaquina tipo);
}
