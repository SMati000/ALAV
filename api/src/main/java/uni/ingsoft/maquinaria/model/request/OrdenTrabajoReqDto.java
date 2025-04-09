package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import uni.ingsoft.maquinaria.model.EstadoOrdenesTrabajo;
import uni.ingsoft.maquinaria.model.EstadoTarea;
import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrdenTrabajoReqDto {
	private Integer idTarea; // TODO foreign key a tareas???
	private String departamento;
	@Positive
	private Integer nroOrden;
	@PositiveOrZero
	private Integer edicion;
	private LocalDate fecha;
	private Integer periodicidad; 
	private LocalDate fechaCreada;
	private String trabajadores; // TODO foreign key a tecnicos???
	private LocalDate fechaInicio;
	private LocalDate fechaFin;
	private String autorizadoPor; // TODO foreign key a tecnicos???
	private String equipoProteccion;
	private String descripcion;
	private EstadoOrdenesTrabajo estado;
	private String insumos;
	private String trabajosPendientes;
	private String posiblesMejoras;
}