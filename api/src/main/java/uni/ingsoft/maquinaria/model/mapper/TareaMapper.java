package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.request.TareaReqDto;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TareaMapper {
	@Mapping(target = "id", ignore = true)
	Tarea fromRequestDto(TareaReqDto tareaReqDto);

	List<Tarea> fromRequestDtoList(List<TareaReqDto> dtoList);
}