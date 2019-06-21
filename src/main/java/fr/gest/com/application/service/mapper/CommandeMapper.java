package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.CommandeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Commande} and its DTO {@link CommandeDTO}.
 */
@Mapper(componentModel = "spring", uses = {FactureMapper.class, ClientMapper.class, EmployeMapper.class})
public interface CommandeMapper extends EntityMapper<CommandeDTO, Commande> {

    @Mapping(source = "facture.id", target = "factureId")
    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "commercial.id", target = "commercialId")
    CommandeDTO toDto(Commande commande);

    @Mapping(source = "factureId", target = "facture")
    @Mapping(source = "clientId", target = "client")
    @Mapping(source = "commercialId", target = "commercial")
    @Mapping(target = "ventes", ignore = true)
    @Mapping(target = "removeVentes", ignore = true)
    Commande toEntity(CommandeDTO commandeDTO);

    default Commande fromId(Long id) {
        if (id == null) {
            return null;
        }
        Commande commande = new Commande();
        commande.setId(id);
        return commande;
    }
}
