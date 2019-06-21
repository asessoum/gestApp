package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.ReductionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Reduction}.
 */
public interface ReductionService {

    /**
     * Save a reduction.
     *
     * @param reductionDTO the entity to save.
     * @return the persisted entity.
     */
    ReductionDTO save(ReductionDTO reductionDTO);

    /**
     * Get all the reductions.
     *
     * @return the list of entities.
     */
    List<ReductionDTO> findAll();


    /**
     * Get the "id" reduction.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReductionDTO> findOne(Long id);

    /**
     * Delete the "id" reduction.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
