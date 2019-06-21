package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.LangueDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Langue} and its DTO {@link LangueDTO}.
 */
@Mapper(componentModel = "spring", uses = {PaysMapper.class})
public interface LangueMapper extends EntityMapper<LangueDTO, Langue> {

    @Mapping(source = "pays.id", target = "paysId")
    LangueDTO toDto(Langue langue);

    @Mapping(source = "paysId", target = "pays")
    @Mapping(target = "clients", ignore = true)
    @Mapping(target = "removeClients", ignore = true)
    @Mapping(target = "partenaires", ignore = true)
    @Mapping(target = "removePartenaires", ignore = true)
    @Mapping(target = "fournisseurs", ignore = true)
    @Mapping(target = "removeFournisseurs", ignore = true)
    @Mapping(target = "employes", ignore = true)
    @Mapping(target = "removeEmployes", ignore = true)
    Langue toEntity(LangueDTO langueDTO);

    default Langue fromId(Long id) {
        if (id == null) {
            return null;
        }
        Langue langue = new Langue();
        langue.setId(id);
        return langue;
    }
}
