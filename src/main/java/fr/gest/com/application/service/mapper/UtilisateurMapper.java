package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.UtilisateurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Utilisateur} and its DTO {@link UtilisateurDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {


    @Mapping(target = "employe", ignore = true)
    Utilisateur toEntity(UtilisateurDTO utilisateurDTO);

    default Utilisateur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(id);
        return utilisateur;
    }
}
