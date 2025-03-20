package uni.ingsoft.maquinaria.model.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class TecnicosReqDto {
    @Pattern(regexp = "(?U)[\\w ñ]+[.\\w ñ]*", message = "Debe ser una cadena alfanumérica")
    @NotNull(message = "El nombre del técnico es obligatorio")
	private String nombre_tecnico;

    @Pattern(regexp = "(?U)[\\w ñ]+[.\\w ñ]*", message = "Debe ser una cadena alfanumérica")
    @NotNull(message = "El apellido del técnico es obligatorio")
	private String apellido_tecnico;

    @NotNull(message = "El DNI del tecnico es obligatorio")
    @Positive(message = "El DNI debe ser un número positivo")
    private Integer dni_tecnico;

    @NotNull(message = "El puesto del tecnico es obligatorio")
    private String puesto_tecnico;

    @NotNull(message = "El codigo del tecnico es obligatorio")
    private String codigo_tecnico;

    @NotNull(message = "La fecha de creación del tecnico es obligatorio")
    @PastOrPresent(message = "La fecha de creación debe ser una fecha pasada o la fecha actual")
    private LocalDate fecha_creacion_tecnico;

    @PastOrPresent(message = "La fecha de revisión debe ser una fecha pasada o la fecha actual")
    private LocalDate fecha_revision_tecnico;

    @NotNull(message = "El nivel del tecnico es obligatorio")
    private String nivel_tecnico;

    @NotNull(message = "El area del tecnico es obligatorio")
    private String area_tecnico;

    @NotNull(message = "El redactor del tecnico es obligatorio")
    private String redactor_tecnico;

    private String salario_tecnico;

    @NotNull(message = "El supervisor inmediato del tecnico es obligatorio")
    private String supervisor_inmediato_tecnico;

    @NotNull(message = "El objetivo del puesto es obligatorio")
    private String objetivo_puesto_tecnico;

    @NotNull(message = "La funcion del tecnico es obligatorio")
    private String funciones_tecnico;

    @NotNull(message = "Las responsabilidades del tecnico es obligatorio")
    private String responsabilidades_tecnico;

    @NotNull(message = "Las herramientas del tecnico es obligatorio")
    private String herramientas_tecnico;

    private String condiciones_extras_tecnico;

    @NotNull(message = "La autoridad del tecnico es obligatorio")
    private String autoridad_tecnico;

    @NotNull(message = "Las relaciones formales del tecnico es obligatorio")
    private String relaciones_formales_tecnico;

    @NotNull(message = "El ambiente fisico del tecnico es obligatorio")
    private String ambiente_fisico_tecnico;

    @NotNull(message = "La formacion del tecnico es obligatorio")
    private String formacion_tecnico;

    @NotNull(message = "El conociemiento especifico del tecnico es obligatorio")
    private String conocimiento_especifico_tecnico;

    @NotNull(message = "La experiencia del tecnico es obligatorio")
    private String experiencia_tecnico;

    @NotNull(message = "El requirimiento fisico del tecnico es obligatorio")
    private String requerimiento_fisico_tecnico;

    @NotNull(message = "Las habilidades y actitudes del tecnico es obligatorio")
    private String habilidades_actitudes_tecnico;
}
