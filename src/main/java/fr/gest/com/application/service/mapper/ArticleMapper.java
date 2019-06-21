package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.ArticleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Article} and its DTO {@link ArticleDTO}.
 */
@Mapper(componentModel = "spring", uses = {CategorieMapper.class, ReductionMapper.class, FournisseurMapper.class, ArticleComposeMapper.class, StockMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {

    @Mapping(source = "categorie.id", target = "categorieId")
    @Mapping(source = "reduction.id", target = "reductionId")
    @Mapping(source = "fournisseur.id", target = "fournisseurId")
    @Mapping(source = "composition.id", target = "compositionId")
    @Mapping(source = "stock.id", target = "stockId")
    ArticleDTO toDto(Article article);

    @Mapping(target = "partenaires", ignore = true)
    @Mapping(target = "removePartenaire", ignore = true)
    @Mapping(source = "categorieId", target = "categorie")
    @Mapping(source = "reductionId", target = "reduction")
    @Mapping(source = "fournisseurId", target = "fournisseur")
    @Mapping(source = "compositionId", target = "composition")
    @Mapping(source = "stockId", target = "stock")
    @Mapping(target = "ventes", ignore = true)
    @Mapping(target = "removeVentes", ignore = true)
    @Mapping(target = "mouvementStocks", ignore = true)
    @Mapping(target = "removeMouvementStock", ignore = true)
    Article toEntity(ArticleDTO articleDTO);

    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }
}
