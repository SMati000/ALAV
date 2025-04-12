package uni.ingsoft.maquinaria.utils.exceptions;


import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public enum ErrorCodes {
	/*
	 * 0x: Errores genericos
	 */
	ALGO_SALIO_MAL("00", HttpStatus.INTERNAL_SERVER_ERROR, "Algo salio mal."),
	ARCHIVO_NO_ENCONTRADO("01", HttpStatus.BAD_REQUEST, "El archivo no se encuentra o no se tienen permisos."),
	VALIDATION_ERROR("02", HttpStatus.BAD_REQUEST, "Cuerpo del request inválido."),
	/*
	 * 1x: Errores sobre Maquinas
	 */
	MAQUINA_NO_ENCONTRADA("10", HttpStatus.NOT_FOUND, "Maquina no encontrada"),
	MAQUINAS_VACIAS("11", HttpStatus.BAD_REQUEST, "No ha cargado ninguna maquina."),
	MODELO_NULO("12", HttpStatus.BAD_REQUEST, "El modelo de la maquina no puede ser nulo."),
	NOMBRE_NULO("13", HttpStatus.BAD_REQUEST, "El nombre de la maquina no puede ser nulo."),

	/*
	* 2x: Errores sobre Tareas
	*/
	TAREA_NO_ENCONTRADA("20", HttpStatus.NOT_FOUND, "Tarea no encontrada."),
	TAREAS_VACIAS("21", HttpStatus.BAD_REQUEST, "No ha cargado ninguna tarea."),
	FECHAS_INCONSISTENTES("21", HttpStatus.BAD_REQUEST, "La fecha de inicio debe ser antes que la fecha de fin."),

	/*
	* 3x: Errores sobre Insumos
	*/

	INSUMOS_VACIOS("30", HttpStatus.BAD_REQUEST, "No ha cargado ningun insumo."),
	NOMBRE_INSUMOS_NULO("31", HttpStatus.BAD_REQUEST, "El nombre del insumo no puede ser nulo."),
	INSUMO_NO_ENCONTRADO("32", HttpStatus.NOT_FOUND, "Insumo no encontrado"),


	/*
	* 4x: Errores sobre Tecnicos
	*/

	TECNICOS_VACIOS("40", HttpStatus.BAD_REQUEST, "No ha cargado ningun tecnico."),
	TECNICO_NO_ENCONTRADO("41", HttpStatus.NOT_FOUND, "Tecnico no encontrado"),

	/*
	* 5x: Errores sobre Tecnicos
	*/
	ORDENES_VACIAS("50", HttpStatus.BAD_REQUEST, "No ha cargado ninguna orden de trabajo."),
	ORDEN_NO_ENCONTRADA("51", HttpStatus.NOT_FOUND, "Orden de trabajo no encontrada.");
	

	private final String codigoError;
	private final HttpStatus codigoEstado;
	private final String mensaje;

	ErrorCodes(String codigoError, HttpStatus codigoEstado, String mensaje) {
		this.codigoError = codigoError;
		this.codigoEstado = codigoEstado;
		this.mensaje = mensaje;
	}
}