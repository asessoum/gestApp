package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.HabilitationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Habilitation}.
 */
public interface HabilitationService {

    /**
     * Save a habilitation.
     *
     * @param habilitationDTO the entity to save.
     * @return the persisted entity.
     */
    HabilitationDTO save(HabilitationDTO habilitationDTO);

    /**
     * Get all the habilitations.
     *
     * @return the list of entities.
     */
    List<HabilitationDTO> findAll();


    /**
     * Get the "id" habilitation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HabilitationDTO> findOne(Long id);

    /**
     * Delete the "id" habilitation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
