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
public class Maquina {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String modelo;
	private String nroSerie;
	private LocalDate fechaFabricacion;
	private String codigo;
	private String descripcion;
	private String funcionamiento;
	private int planta;
	private String area; // TODO enum
	private int corriente;
	private int tension;
	private int potencia;
	private int presion;
	private int altura;
	private int ancho;
	private int largo;
	private String criticidad; // TODO enum
	private String modeloMantenimiento;

	private String imagenDirec;
	private String manualDirec;
}
