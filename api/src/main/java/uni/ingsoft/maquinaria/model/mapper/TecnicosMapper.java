package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import uni.ingsoft.maquinaria.model.Tecnicos;
import uni.ingsoft.maquinaria.model.request.TecnicosReqDto;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TecnicosMapper {
    @Mapping(target = "idTecnico", ignore = true)
	Tecnicos fromRequestDto(TecnicosReqDto tecnicoReqDto);

	List<Tecnicos> fromRequestDtoList(List<TecnicosReqDto> dtoList);

	@Mapping(target = "idTecnico", ignore = true)
	void fromUpdateReqDTO(TecnicosReqDto tecnicoReqDto, @MappingTarget Tecnicos tecnico);
}
