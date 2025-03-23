package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import uni.ingsoft.maquinaria.model.EstadoTarea;
import java.time.LocalDate;

@Builder
@Getter
public class TareaReqDto {
	private String departamento;
	@Positive
	private int nroOrden;
	@PositiveOrZero
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