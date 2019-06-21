package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.MouvementStockDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.MouvementStock}.
 */
public interface MouvementStockService {

    /**
     * Save a mouvementStock.
     *
     * @param mouvementStockDTO the entity to save.
     * @return the persisted entity.
     */
    MouvementStockDTO save(MouvementStockDTO mouvementStockDTO);

    /**
     * Get all the mouvementStocks.
     *
     * @return the list of entities.
     */
    List<MouvementStockDTO> findAll();

    /**
     * Get all the mouvementStocks with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<MouvementStockDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" mouvementStock.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MouvementStockDTO> findOne(Long id);

    /**
     * Delete the "id" mouvementStock.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
