package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.FournisseurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Fournisseur} and its DTO {@link FournisseurDTO}.
 */
@Mapper(componentModel = "spring", uses = {LangueMapper.class})
public interface FournisseurMapper extends EntityMapper<FournisseurDTO, Fournisseur> {


    @Mapping(target = "partenaires", ignore = true)
    @Mapping(target = "removePartenaire", ignore = true)
    @Mapping(target = "removeLangues", ignore = true)
    @Mapping(target = "articles", ignore = true)
    @Mapping(target = "removeArticles", ignore = true)
    @Mapping(target = "adresses", ignore = true)
    @Mapping(target = "removeAdresses", ignore = true)
    Fournisseur toEntity(FournisseurDTO fournisseurDTO);

    default Fournisseur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Fournisseur fournisseur = new Fournisseur();
        fournisseur.setId(id);
        return fournisseur;
    }
}
