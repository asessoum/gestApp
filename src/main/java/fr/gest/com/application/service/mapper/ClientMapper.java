package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.ClientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring", uses = {LangueMapper.class, EmployeMapper.class, AdresseMapper.class})
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {

    @Mapping(source = "langue.id", target = "langueId")
    @Mapping(source = "commercial.id", target = "commercialId")
    ClientDTO toDto(Client client);

    @Mapping(source = "langueId", target = "langue")
    @Mapping(source = "commercialId", target = "commercial")
    @Mapping(target = "removeAdresses", ignore = true)
    @Mapping(target = "commandes", ignore = true)
    @Mapping(target = "removeCommandes", ignore = true)
    Client toEntity(ClientDTO clientDTO);

    default Client fromId(Long id) {
        if (id == null) {
            return null;
        }
        Client client = new Client();
        client.setId(id);
        return client;
    }
}
