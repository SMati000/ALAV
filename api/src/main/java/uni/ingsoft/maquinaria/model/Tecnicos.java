package uni.ingsoft.maquinaria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Tecnicos {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_tecnico;

    @Column(nullable = false)
	private String nombre_tecnico;

    @Column(nullable = false)
	private String apellido_tecnico;

    @Column(nullable = false)
    private Integer dni_tecnico;

    @Column(nullable = false)
    private String puesto_tecnico;

    @Column(nullable = false)
    private String codigo_tecnico;

    @Column(nullable = false)
    private LocalDate fecha_creacion_tecnico;

    @Column(nullable = true)
    private LocalDate fecha_revision_tecnico;

    @Column(nullable = false)
    private String nivel_tecnico;

    @Column(nullable = false)
    private String area_tecnico;

    @Column(nullable = false)
    private String redactor_tecnico;

    @Column(nullable = true)
    private String salario_tecnico;

    @Column(nullable = false)
    private String supervisor_inmediato_tecnico;

    @Column(nullable = false)
    private String objetivo_puesto_tecnico;

    @Column(nullable = false)
    private String funciones_tecnico;

    @Column(nullable = false)
    private String responsabilidades_tecnico;

    @Column(nullable = false)
    private String herramientas_tecnico;

    @Column(nullable = true)
    private String condiciones_extras_tecnico;

    @Column(nullable = false)
    private String autoridad_tecnico;

    @Column(nullable = false)
    private String relaciones_formales_tecnico;

    @Column(nullable = false)
    private String ambiente_fisico_tecnico;

    @Column(nullable = false)
    private String formacion_tecnico;

    @Column(nullable = false)
    private String conocimiento_especifico_tecnico;

    @Column(nullable = false)
    private String experiencia_tecnico;

    @Column(nullable = false)
    private String requerimiento_fisico_tecnico;

    @Column(nullable = false)
    private String habilidades_actitudes_tecnico;
}