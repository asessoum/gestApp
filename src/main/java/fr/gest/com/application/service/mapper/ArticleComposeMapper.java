package fr.gest.com.application.service.mapper;

import fr.gest.com.application.domain.*;
import fr.gest.com.application.service.dto.ArticleComposeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ArticleCompose} and its DTO {@link ArticleComposeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ArticleComposeMapper extends EntityMapper<ArticleComposeDTO, ArticleCompose> {


    @Mapping(target = "articles", ignore = true)
    @Mapping(target = "removeArticles", ignore = true)
    ArticleCompose toEntity(ArticleComposeDTO articleComposeDTO);

    default ArticleCompose fromId(Long id) {
        if (id == null) {
            return null;
        }
        ArticleCompose articleCompose = new ArticleCompose();
        articleCompose.setId(id);
        return articleCompose;
    }
}
