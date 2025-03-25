package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import uni.ingsoft.maquinaria.model.EstadoTarea;
import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TareaReqDto {
	private String departamento;
	@Positive
	private Integer nroOrden;
	@PositiveOrZero
	private Integer edicion;
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