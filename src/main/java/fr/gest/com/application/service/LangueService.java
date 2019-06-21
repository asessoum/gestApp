package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.LangueDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Langue}.
 */
public interface LangueService {

    /**
     * Save a langue.
     *
     * @param langueDTO the entity to save.
     * @return the persisted entity.
     */
    LangueDTO save(LangueDTO langueDTO);

    /**
     * Get all the langues.
     *
     * @return the list of entities.
     */
    List<LangueDTO> findAll();


    /**
     * Get the "id" langue.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LangueDTO> findOne(Long id);

    /**
     * Delete the "id" langue.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
