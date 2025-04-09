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
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class OrdenTrabajo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private Integer idTarea; // TODO foreign key a tareas???
	// TODO fecha mantenimiento??
	private String departamento;
	private Integer nroOrden;
	private Integer edicion;
	private LocalDate fecha;	//Cambiar a "Periodicidad"
	private Integer periodicidad; 
	private LocalDate fechaCreada;
	private String trabajadores; // TODO foreign key a tecnicos???
	private LocalDate fechaInicio;  
	@Column(nullable = false)
	private LocalDate fechaFin;		
	private String autorizadoPor; // TODO foreign key a tecnicos???
	private String equipoProteccion;
	@Column(nullable = false)
	private String descripcion;
	@Column(nullable = false)
	private EstadoOrdenesTrabajo estado;
	private String insumos; // TODO foreign key a insumos???
	private String trabajosPendientes;
	private String posiblesMejoras;
}