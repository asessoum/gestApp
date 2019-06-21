package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.CommuneDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Commune}.
 */
public interface CommuneService {

    /**
     * Save a commune.
     *
     * @param communeDTO the entity to save.
     * @return the persisted entity.
     */
    CommuneDTO save(CommuneDTO communeDTO);

    /**
     * Get all the communes.
     *
     * @return the list of entities.
     */
    List<CommuneDTO> findAll();


    /**
     * Get the "id" commune.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommuneDTO> findOne(Long id);

    /**
     * Delete the "id" commune.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
