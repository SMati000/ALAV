package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import uni.ingsoft.maquinaria.model.Tecnicos;
import uni.ingsoft.maquinaria.model.request.TecnicosReqDto;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TecnicosMapper {
    @Mapping(target = "id_tecnico", ignore = true)
	Tecnicos fromRequestDto(TecnicosReqDto tecnicoReqDto);

	List<Tecnicos> fromRequestDtoList(List<TecnicosReqDto> dtoList);
}
