package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.FournisseurDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Fournisseur}.
 */
public interface FournisseurService {

    /**
     * Save a fournisseur.
     *
     * @param fournisseurDTO the entity to save.
     * @return the persisted entity.
     */
    FournisseurDTO save(FournisseurDTO fournisseurDTO);

    /**
     * Get all the fournisseurs.
     *
     * @return the list of entities.
     */
    List<FournisseurDTO> findAll();

    /**
     * Get all the fournisseurs with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<FournisseurDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" fournisseur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FournisseurDTO> findOne(Long id);

    /**
     * Delete the "id" fournisseur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
