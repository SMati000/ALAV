package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.request.MaquinaReqDto;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MaquinaMapper {
	@Mapping(target = "id", ignore = true)
	Maquina fromRequestDto(MaquinaReqDto maquinaReqDto);

	List<Maquina> fromRequestDtoList(List<MaquinaReqDto> dtoList);
}
