package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Builder
@Getter
@Setter
public class MaquinaReqDto {
	private String modelo;
	private String nroSerie;
	private LocalDate fechaFabricacion;
	private String codigo;
	private String descripcion;
	private String funcionamiento;
	private Integer planta;
	private String area; // TODO

	@PositiveOrZero
	private Integer corriente;
	@PositiveOrZero
	private Integer tension;
	@PositiveOrZero
	private Integer potencia;
	@PositiveOrZero
	private Integer presion;
	@PositiveOrZero
	private Integer altura;
	@PositiveOrZero
	private Integer ancho;
	@PositiveOrZero
	private Integer largo;

	private String criticidad; // TODO enum
	private String modeloMantenimiento;

	private String manualDirec;
}
