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
	//constuctor para excepciones con mensaje extra(envio de idTarea para especificar el error en fk en maquina)
	public MaquinariaExcepcion(ErrorCodes codigo, String mensajeExtra) {
		super(codigo.getMensaje() + " " + mensajeExtra);
		errorCode = codigo.getCodigoError();
		this.errorMessage = codigo.getMensaje() + " " + mensajeExtra;
		this.statusCode = codigo.getCodigoEstado();
	}
	
}
