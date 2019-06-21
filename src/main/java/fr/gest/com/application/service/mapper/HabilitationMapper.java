package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.HabilitationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Habilitation} and its DTO {@link HabilitationDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HabilitationMapper extends EntityMapper<HabilitationDTO, Habilitation> {


    @Mapping(target = "partenaires", ignore = true)
    @Mapping(target = "removePartenaire", ignore = true)
    Habilitation toEntity(HabilitationDTO habilitationDTO);

    default Habilitation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Habilitation habilitation = new Habilitation();
        habilitation.setId(id);
        return habilitation;
    }
}
