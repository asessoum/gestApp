package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.ReferenceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Reference}.
 */
public interface ReferenceService {

    /**
     * Save a reference.
     *
     * @param referenceDTO the entity to save.
     * @return the persisted entity.
     */
    ReferenceDTO save(ReferenceDTO referenceDTO);

    /**
     * Get all the references.
     *
     * @return the list of entities.
     */
    List<ReferenceDTO> findAll();


    /**
     * Get the "id" reference.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReferenceDTO> findOne(Long id);

    /**
     * Delete the "id" reference.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
