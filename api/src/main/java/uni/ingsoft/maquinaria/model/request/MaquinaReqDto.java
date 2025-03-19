package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Builder
@Getter
public class MaquinaReqDto {
	private String modelo;
	private String nroSerie;
	private LocalDate fechaFabricacion;
	private String codigo;
	private String descripcion;
	private String funcionamiento;
	private int planta;
	private String area; // TODO

	@PositiveOrZero
	private int corriente;
	@PositiveOrZero
	private int tension;
	@PositiveOrZero
	private int potencia;
	@PositiveOrZero
	private int presion;
	@PositiveOrZero
	private int altura;
	@PositiveOrZero
	private int ancho;
	@PositiveOrZero
	private int largo;

	private String criticidad; // TODO enum
	private String modeloMantenimiento;

	private String imagenDirec;
	private String manualDirec;
}
