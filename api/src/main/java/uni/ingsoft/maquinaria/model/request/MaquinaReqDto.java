package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import uni.ingsoft.maquinaria.model.TipoMaquina;

@Builder
@Getter
public class MaquinaReqDto {
	@Pattern(regexp = "(?U)[\\w ñ]+[.\\w ñ]*", message = "Must be an alphanumeric string")
	private String nombre;

	@PositiveOrZero
	private int antiguedad;

	private TipoMaquina tipo;
}
