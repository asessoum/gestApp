package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.ReductionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reduction} and its DTO {@link ReductionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReductionMapper extends EntityMapper<ReductionDTO, Reduction> {


    @Mapping(target = "partenaires", ignore = true)
    @Mapping(target = "removePartenaire", ignore = true)
    @Mapping(target = "articles", ignore = true)
    @Mapping(target = "removeArticles", ignore = true)
    Reduction toEntity(ReductionDTO reductionDTO);

    default Reduction fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reduction reduction = new Reduction();
        reduction.setId(id);
        return reduction;
    }
}
