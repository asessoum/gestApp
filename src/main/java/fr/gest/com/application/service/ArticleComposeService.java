package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.ArticleComposeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.ArticleCompose}.
 */
public interface ArticleComposeService {

    /**
     * Save a articleCompose.
     *
     * @param articleComposeDTO the entity to save.
     * @return the persisted entity.
     */
    ArticleComposeDTO save(ArticleComposeDTO articleComposeDTO);

    /**
     * Get all the articleComposes.
     *
     * @return the list of entities.
     */
    List<ArticleComposeDTO> findAll();


    /**
     * Get the "id" articleCompose.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ArticleComposeDTO> findOne(Long id);

    /**
     * Delete the "id" articleCompose.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
