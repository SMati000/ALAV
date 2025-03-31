package uni.ingsoft.maquinaria.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import uni.ingsoft.maquinaria.model.Tecnicos;
import java.util.List;

public interface TecnicosRepo extends CrudRepository<Tecnicos, Integer> {
    @Query("SELECT p FROM Tecnicos p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
	List<Tecnicos> searchByName(@Param("nombre") String nombre);
}
