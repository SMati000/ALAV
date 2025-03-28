package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import uni.ingsoft.maquinaria.model.Maquina;
import uni.ingsoft.maquinaria.model.request.MaquinaReqDto;
import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MaquinaMapper {
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "imagenDirec", ignore = true)
	Maquina fromRequestDto(MaquinaReqDto maquinaReqDto);

	List<Maquina> fromRequestDtoList(List<MaquinaReqDto> dtoList);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "imagenDirec", ignore = true)
	void fromUpdateReqDTO(MaquinaReqDto maquinaReqDto, @MappingTarget Maquina maquina);
}
