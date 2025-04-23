package uni.ingsoft.maquinaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import uni.ingsoft.maquinaria.model.OrdenTrabajo;
import uni.ingsoft.maquinaria.model.request.OrdenTrabajoReqDto;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface OrdenTrabajoMapper {
    @Mapping(target = "id", ignore = true)    
    OrdenTrabajo fromRequestDto(OrdenTrabajoReqDto ordenTrabajoReqDto);

    List<OrdenTrabajo> fromRequestDtoList(List<OrdenTrabajoReqDto> dtoList);

    @Mapping(target = "id", ignore = true)    
    void fromUpdateReq(OrdenTrabajoReqDto ordenTrabajoReqDto, @MappingTarget OrdenTrabajo ordenTrabajo);
}