package uni.ingsoft.maquinaria.utils.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCodes {
	/*
	 * 0x: Errores genericos
	 */
	ALGO_SALIO_MAL("00", HttpStatus.INTERNAL_SERVER_ERROR, "Algo salio mal."),

	/*
	 * 1x: Errores sobre Maquinas
	 */
	MAQUINA_NO_ENCONTRADA("10", HttpStatus.NOT_FOUND, "Maquina no encontrada"),
	MAQUINAS_VACIAS("11", HttpStatus.BAD_REQUEST, "No ha cargado ninguna maquina."),
	NOMBRE_NULO("12", HttpStatus.BAD_REQUEST, "El nombre de la maquina no puede ser nulo.");

	private final String codigoError;
	private final HttpStatus codigoEstado;
	private final String mensaje;

	ErrorCodes(String codigoError, HttpStatus codigoEstado, String mensaje) {
		this.codigoError = codigoError;
		this.codigoEstado = codigoEstado;
		this.mensaje = mensaje;
	}
}
