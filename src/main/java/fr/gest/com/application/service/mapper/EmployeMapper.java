package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.EmployeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employe} and its DTO {@link EmployeDTO}.
 */
@Mapper(componentModel = "spring", uses = {UtilisateurMapper.class, PartenaireMapper.class, LangueMapper.class})
public interface EmployeMapper extends EntityMapper<EmployeDTO, Employe> {

    @Mapping(source = "utilisateur.id", target = "utilisateurId")
    @Mapping(source = "responsable.id", target = "responsableId")
    EmployeDTO toDto(Employe employe);

    @Mapping(source = "utilisateurId", target = "utilisateur")
    @Mapping(source = "responsableId", target = "responsable")
    @Mapping(target = "removeLangues", ignore = true)
    @Mapping(target = "adresses", ignore = true)
    @Mapping(target = "removeAdresses", ignore = true)
    @Mapping(target = "profiles", ignore = true)
    @Mapping(target = "removeProfiles", ignore = true)
    @Mapping(target = "clients", ignore = true)
    @Mapping(target = "removeClients", ignore = true)
    @Mapping(target = "commandes", ignore = true)
    @Mapping(target = "removeCommandes", ignore = true)
    Employe toEntity(EmployeDTO employeDTO);

    default Employe fromId(Long id) {
        if (id == null) {
            return null;
        }
        Employe employe = new Employe();
        employe.setId(id);
        return employe;
    }
}
