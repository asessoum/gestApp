package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.PartenaireDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Partenaire}.
 */
public interface PartenaireService {

    /**
     * Save a partenaire.
     *
     * @param partenaireDTO the entity to save.
     * @return the persisted entity.
     */
    PartenaireDTO save(PartenaireDTO partenaireDTO);

    /**
     * Get all the partenaires.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PartenaireDTO> findAll(Pageable pageable);


    /**
     * Get the "id" partenaire.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PartenaireDTO> findOne(Long id);

    /**
     * Delete the "id" partenaire.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
