package uni.ingsoft.maquinaria.model.request;

import java.time.LocalDate;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uni.ingsoft.maquinaria.model.EstadoOrdenesTrabajo;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrdenTrabajoReqDto {
  private Integer idTarea; // TODO foreign key a tareas???
  private String departamento;
  @PositiveOrZero private Integer edicion;
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
