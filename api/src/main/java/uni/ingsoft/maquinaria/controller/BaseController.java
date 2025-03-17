package uni.ingsoft.maquinaria.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorCodes;
import uni.ingsoft.maquinaria.utils.exceptions.ErrorResponse;
import uni.ingsoft.maquinaria.utils.exceptions.MaquinariaExcepcion;

@ControllerAdvice
public class BaseController {
	private static final Logger log = LogManager.getFormatterLogger(BaseController.class);

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<ErrorResponse> handleGenericException(Exception e) {
		if (e.getCause() instanceof MaquinariaExcepcion) {
			return handleMaquinariaExcepcion((MaquinariaExcepcion) e.getCause());
		}

		ErrorResponse body = new ErrorResponse(ErrorCodes.ALGO_SALIO_MAL);

		log.error("%s: %s", body.getCode(), body.getMessage(), e);
		return new ResponseEntity<>(body, ErrorCodes.ALGO_SALIO_MAL.getCodigoEstado());
	}

	@ExceptionHandler(MaquinariaExcepcion.class)
	private ResponseEntity<ErrorResponse> handleMaquinariaExcepcion(MaquinariaExcepcion e) {
		ErrorResponse body = new ErrorResponse(e.getErrorCode(), e.getErrorMessage());

		log.warn("%s: %s", body.getCode(), body.getMessage(), e);
		return new ResponseEntity<>(body, e.getStatusCode());
	}
}
