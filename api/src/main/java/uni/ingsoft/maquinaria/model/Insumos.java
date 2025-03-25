package uni.ingsoft.maquinaria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Insumos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idInsumo;

	@Column(nullable = false)
	private String nombre;

    private String descripcion;

    private int stock;
	
}
