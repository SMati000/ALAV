package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.NotBlank;
import uni.ingsoft.maquinaria.model.Criticidad;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class MaquinaReqDto {
	@NotBlank(message = "Modelo no puede estar vacio") private String modelo;
	private String nroSerie;
	@NotBlank(message = "Codigo no puede estar vacio") private String codigo;
	private String descripcion;
	private String funcionamiento;
	private Integer planta;
	@NotBlank(message = "Area no puede estar vacia") private String area;

	@PositiveOrZero(message = "La corriente debe ser un valor no negativo")
	private Integer corriente;
	@PositiveOrZero(message = "La tensión debe ser un valor no negativo")
	private Integer tension;
	@PositiveOrZero(message = "La potencia debe ser un valor no negativo")
	private Integer potencia;
	@PositiveOrZero(message = "La presión debe ser un valor no negativo")
	private Integer presion;
	@PositiveOrZero(message = "La altura debe ser un valor no negativo")
	private Integer altura;
	@PositiveOrZero(message = "El ancho debe ser un valor no negativo")
	private Integer ancho;
	@PositiveOrZero(message = "El largo debe ser un valor no negativo")
	private Integer largo;

	public Criticidad criticidad; // Enum defined below
	private String marca;
	private String modeloMantenimiento;

	private String manualDirec;
	private String imagenDirec;
}
