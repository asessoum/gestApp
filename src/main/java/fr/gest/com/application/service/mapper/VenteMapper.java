package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.VenteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Vente} and its DTO {@link VenteDTO}.
 */
@Mapper(componentModel = "spring", uses = {CommandeMapper.class, ArticleMapper.class})
public interface VenteMapper extends EntityMapper<VenteDTO, Vente> {

    @Mapping(source = "commande.id", target = "commandeId")
    @Mapping(source = "article.id", target = "articleId")
    VenteDTO toDto(Vente vente);

    @Mapping(source = "commandeId", target = "commande")
    @Mapping(source = "articleId", target = "article")
    Vente toEntity(VenteDTO venteDTO);

    default Vente fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vente vente = new Vente();
        vente.setId(id);
        return vente;
    }
}
