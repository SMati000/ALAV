package uni.ingsoft.maquinaria.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InsumosReqDto {

    @NotBlank(message = "El insumo debe tener un nombre")
    private String nombre;
    private String descripcion;
    private Integer stock;
}
