package uni.ingsoft.maquinaria.model.request;

import uni.ingsoft.maquinaria.model.Criticidad;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
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

	public Criticidad criticidad; // Enum defined below
	private String marca;
	private String modeloMantenimiento;

	private String manualDirec;
}
