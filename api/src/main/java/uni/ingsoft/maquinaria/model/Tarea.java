package uni.ingsoft.maquinaria.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.ManyToAny;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Tarea {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// TODO fecha mantenimiento??
	private String departamento;
	private Integer nroOrden;
	private Integer edicion;
	private LocalDate fechaCreada;
	private LocalDate fecha; // fecha mantenimiento
	private Integer periodicidad; // TODO periodicidad en meses??
	private String unidad; // TODO unidad de tiempo (mes, dia, etc.)
	private String trabajadores; // TODO foreign key a tecnicos???
	private String autorizadoPor; // TODO foreign key a tecnicos???
	private String equipoProteccion;
	private String descripcion;
	@ManyToOne
	@JoinColumn(name = "maquina_id", referencedColumnName = "id")
	private Maquina maquina;
	private EstadoTarea estado;
	@ManyToMany
	@JoinTable(
		name = "TareaXinsumos",
		joinColumns = @JoinColumn(name = "tarea_id"),
		inverseJoinColumns = @JoinColumn(name = "insumo_id")
	)
	private List<Insumos> insumos;
	private String trabajosPendientes;
	private String posiblesMejoras;
}