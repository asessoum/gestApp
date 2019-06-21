package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.FactureDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Facture}.
 */
public interface FactureService {

    /**
     * Save a facture.
     *
     * @param factureDTO the entity to save.
     * @return the persisted entity.
     */
    FactureDTO save(FactureDTO factureDTO);

    /**
     * Get all the factures.
     *
     * @return the list of entities.
     */
    List<FactureDTO> findAll();
    /**
     * Get all the FactureDTO where Commande is {@code null}.
     *
     * @return the list of entities.
     */
    List<FactureDTO> findAllWhereCommandeIsNull();


    /**
     * Get the "id" facture.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FactureDTO> findOne(Long id);

    /**
     * Delete the "id" facture.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
