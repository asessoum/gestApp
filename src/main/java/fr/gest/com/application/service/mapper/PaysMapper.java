package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.PaysDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Pays} and its DTO {@link PaysDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaysMapper extends EntityMapper<PaysDTO, Pays> {


    @Mapping(target = "communes", ignore = true)
    @Mapping(target = "removeCommunes", ignore = true)
    @Mapping(target = "langues", ignore = true)
    @Mapping(target = "removeLangues", ignore = true)
    Pays toEntity(PaysDTO paysDTO);

    default Pays fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pays pays = new Pays();
        pays.setId(id);
        return pays;
    }
}
