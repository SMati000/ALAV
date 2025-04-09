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
	private String nombre;

    @Column(nullable = false)
	private String apellido;

    @Column(nullable = false)
    private Integer dni;

    @Column(nullable = false)
    private String puesto;

    @Column(nullable = false)
    private String codigo;

    @Column(nullable = false)
    private LocalDate fecha_creacion;

    @Column(nullable = true)
    private LocalDate fecha_revision;

    @Column(nullable = false)
    private String nivel;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String redactor;

    @Column(nullable = true)
    private String salario;

    @Column(nullable = false)
    private String supervisor_inmediato;

    @Column(nullable = false)
    private String objetivo_puesto;

    @Column(nullable = false)
    private String funciones;

    @Column(nullable = false)
    private String responsabilidades;

    @Column(nullable = false)
    private String herramientas;

    @Column(nullable = true)
    private String condiciones_extras;

    @Column(nullable = false)
    private String autoridad;

    @Column(nullable = false)
    private String relaciones_formales;

    @Column(nullable = false)
    private String ambiente_fisico;

    @Column(nullable = false)
    private String formacion;

    @Column(nullable = false)
    private String conocimiento_especifico;

    @Column(nullable = false)
    private String experiencia;

    @Column(nullable = false)
    private String requerimiento_fisico;

    @Column(nullable = false)
    private String habilidades_actitudes;
}