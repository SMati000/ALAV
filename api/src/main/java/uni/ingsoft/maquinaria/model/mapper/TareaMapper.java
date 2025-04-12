package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import uni.ingsoft.maquinaria.model.Tarea;
import uni.ingsoft.maquinaria.model.request.TareaReqDto;
import java.util.List;
import java.time.LocalDate;
import uni.ingsoft.maquinaria.model.Maquina;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TareaMapper {
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "fechaCreada", expression = "java(java.time.LocalDate.now())")
	@Mapping(target = "maquina", expression = "java(uni.ingsoft.maquinaria.model.Maquina.builder().id(tareaReqDto.getIdMaquina()).build())")
	Tarea fromRequestDto(TareaReqDto tareaReqDto);

	List<Tarea> fromRequestDtoList(List<TareaReqDto> dtoList);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "fechaCreada", ignore = true)
	@Mapping(target = "maquina", source = "idMaquina", qualifiedByName = "mapMaquina")
	void fromUpdateReq(TareaReqDto tareaReqDto, @MappingTarget Tarea tarea);

	@Named("mapMaquina")
	default Maquina mapMaquina(Integer idMaquina) {
		if (idMaquina == null) {
			return null;
		}

		return uni.ingsoft.maquinaria.model.Maquina.builder().id(idMaquina).build();
	}
}