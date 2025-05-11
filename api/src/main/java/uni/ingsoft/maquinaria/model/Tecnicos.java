package uni.ingsoft.maquinaria.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
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
