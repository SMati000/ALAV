package uni.ingsoft.maquinaria.model.request;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import uni.ingsoft.maquinaria.model.EstadoTarea;
import uni.ingsoft.maquinaria.model.Insumos;
import java.time.LocalDate;
import java.util.List;

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
	private LocalDate fecha; // fecha mantenimiento
	@NotNull(message = "La periodicidad no puede esta vacia")
	@Positive(message = "La periodicidad debe ser un numero positivo")
	private Integer periodicidad;
	@NotBlank(message = "Debe elegir una unidad de medida")
	private String unidad; // TODO unidad de tiempo (mes, dia, etc.)
	private String trabajadores;
	private String autorizadoPor;
	private String equipoProteccion;
	private String descripcion;
	@NotNull(message = "Debe especificar a que maquina pertenece esta tarea")
	private Integer idMaquina;
	private EstadoTarea estado;
	@ManyToMany
	@JoinTable(
		name = "TareaXinsumos",
		joinColumns = @JoinColumn(name = "tarea_id"),
		inverseJoinColumns = @JoinColumn(name = "insumo_id")
	)
	private List<Insumos> insumos;
	private String trabajosPendientes;
	private String posiblesMejoras;
}