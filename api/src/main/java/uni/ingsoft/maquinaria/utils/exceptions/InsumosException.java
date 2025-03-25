package uni.ingsoft.maquinaria.utils.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class InsumosException extends Exception {

	private final String errorCode;
	private final String errorMessage;
	private final HttpStatus statusCode;

	public InsumosException(ErrorCodes er) {
		errorCode = er.getCodigoError();
		errorMessage = er.getMensaje();
		statusCode = er.getCodigoEstado();
	}
}
