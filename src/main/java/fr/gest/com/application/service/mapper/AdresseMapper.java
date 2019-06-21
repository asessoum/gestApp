package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.AdresseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Adresse} and its DTO {@link AdresseDTO}.
 */
@Mapper(componentModel = "spring", uses = {FournisseurMapper.class, EmployeMapper.class, CommuneMapper.class})
public interface AdresseMapper extends EntityMapper<AdresseDTO, Adresse> {

    @Mapping(source = "fournisseur.id", target = "fournisseurId")
    @Mapping(source = "utilisateur.id", target = "utilisateurId")
    @Mapping(source = "commune.id", target = "communeId")
    AdresseDTO toDto(Adresse adresse);

    @Mapping(source = "fournisseurId", target = "fournisseur")
    @Mapping(source = "utilisateurId", target = "utilisateur")
    @Mapping(source = "communeId", target = "commune")
    @Mapping(target = "partenaires", ignore = true)
    @Mapping(target = "removePartenaires", ignore = true)
    @Mapping(target = "clients", ignore = true)
    @Mapping(target = "removeClients", ignore = true)
    Adresse toEntity(AdresseDTO adresseDTO);

    default Adresse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Adresse adresse = new Adresse();
        adresse.setId(id);
        return adresse;
    }
}
