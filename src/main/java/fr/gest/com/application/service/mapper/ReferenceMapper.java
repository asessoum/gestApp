package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.ReferenceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reference} and its DTO {@link ReferenceDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReferenceMapper extends EntityMapper<ReferenceDTO, Reference> {


    @Mapping(target = "partenaires", ignore = true)
    @Mapping(target = "removePartenaire", ignore = true)
    Reference toEntity(ReferenceDTO referenceDTO);

    default Reference fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reference reference = new Reference();
        reference.setId(id);
        return reference;
    }
}
