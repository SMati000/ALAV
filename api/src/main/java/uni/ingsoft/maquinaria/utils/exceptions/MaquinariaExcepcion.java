package uni.ingsoft.maquinaria.utils.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MaquinariaExcepcion extends Exception {

	private final String errorCode;
	private final String errorMessage;
	private final HttpStatus statusCode;

	public MaquinariaExcepcion(ErrorCodes er) {
		errorCode = er.getCodigoError();
		errorMessage = er.getMensaje();
		statusCode = er.getCodigoEstado();
	}
}
