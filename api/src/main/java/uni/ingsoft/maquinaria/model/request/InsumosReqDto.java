package uni.ingsoft.maquinaria.model.request;

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

    private int idInsumo;
    private String nombre;
    private String descripcion;
    private Integer stock;
}
