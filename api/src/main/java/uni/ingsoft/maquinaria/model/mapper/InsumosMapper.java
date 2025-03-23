package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import uni.ingsoft.maquinaria.model.Insumos;
import uni.ingsoft.maquinaria.model.request.InsumosReqDto;
import java.util.List;

@Mapper(componentModel = "spring")
public interface InsumosMapper {
	@Mapping(target = "idInsumo", ignore = true)
	Insumos fromRequestDto(InsumosReqDto insumosReqDto);

	List<Insumos> fromRequestDtoList(List<InsumosReqDto> dtoList);
}