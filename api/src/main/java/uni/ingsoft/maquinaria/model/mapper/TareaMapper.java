package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.request.TareaReqDto;
import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TareaMapper {
	@Mapping(target = "id", ignore = true)
	Tarea fromRequestDto(TareaReqDto tareaReqDto);

	List<Tarea> fromRequestDtoList(List<TareaReqDto> dtoList);

	@Mapping(target = "id", ignore = true)
	void fromUpdateReq(TareaReqDto tareaReqDto, @MappingTarget Tarea tarea);
}