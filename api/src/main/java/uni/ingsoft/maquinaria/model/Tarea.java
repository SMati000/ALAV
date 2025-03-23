package uni.ingsoft.maquinaria.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

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
	private int nroOrden;
	private int edicion;
	private LocalDate fecha;
	private String trabajadores; // TODO foreign key a tecnicos???
	private LocalDate fechaInicio;
	private LocalDate fechaFin;
	private String autorizadoPor; // TODO foreign key a tecnicos???
	private String equipoProteccion;
	private String descripcion;
	private EstadoTarea estado;
	private String insumos;
	private String trabajosPendientes;
	private String posiblesMejoras;
}