package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.MouvementStockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MouvementStock} and its DTO {@link MouvementStockDTO}.
 */
@Mapper(componentModel = "spring", uses = {ArticleMapper.class})
public interface MouvementStockMapper extends EntityMapper<MouvementStockDTO, MouvementStock> {


    @Mapping(target = "removeArticles", ignore = true)

    default MouvementStock fromId(Long id) {
        if (id == null) {
            return null;
        }
        MouvementStock mouvementStock = new MouvementStock();
        mouvementStock.setId(id);
        return mouvementStock;
    }
}
