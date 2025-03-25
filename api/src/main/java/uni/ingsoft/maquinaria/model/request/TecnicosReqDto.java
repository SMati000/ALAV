package uni.ingsoft.maquinaria.model.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TecnicosReqDto {

	private String nombre;
	private String apellido;
    private Integer dni;
    private String puesto;
    private String codigo;
    private LocalDate fecha_creacion;
    private LocalDate fecha_revision;
    private String nivel;
    private String area;
    private String redactor;
    private String salario;
    private String supervisor_inmediato;
    private String objetivo_puesto;
    private String funciones;
    private String responsabilidades;
    private String herramientas;
    private String condiciones_extras;
    private String autoridad;
    private String relaciones_formales;
    private String ambiente_fisico;
    private String formacion;
    private String conocimiento_especifico;
    private String experiencia;
    private String requerimiento_fisico;
    private String habilidades_actitudes;
    
}
