package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uni.ingsoft.maquinaria.model.Criticidad;
import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

	private Criticidad criticidad; // TODO enum
	private String marca;
	private String modeloMantenimiento;

	private String imagenDirec;
	private String manualDirec;
}
