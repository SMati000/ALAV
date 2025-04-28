package uni.ingsoft.maquinaria.model.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import uni.ingsoft.maquinaria.model.Tecnicos;
import uni.ingsoft.maquinaria.model.request.TecnicosReqDto;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TecnicosMapper {
  @Mapping(target = "id_tecnico", ignore = true)
  @Mapping(target = "fecha_creacion", expression = "java(java.time.LocalDate.now())")
  Tecnicos fromRequestDto(TecnicosReqDto tecnicoReqDto);

  List<Tecnicos> fromRequestDtoList(List<TecnicosReqDto> dtoList);

  @Mapping(target = "id_tecnico", ignore = true)
  @Mapping(target = "fecha_creacion", ignore = true)
  void fromUpdateReqDTO(TecnicosReqDto tecnicoReqDto, @MappingTarget Tecnicos tecnico);
}
