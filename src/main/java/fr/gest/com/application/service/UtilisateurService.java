package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.UtilisateurDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Utilisateur}.
 */
public interface UtilisateurService {

    /**
     * Save a utilisateur.
     *
     * @param utilisateurDTO the entity to save.
     * @return the persisted entity.
     */
    UtilisateurDTO save(UtilisateurDTO utilisateurDTO);

    /**
     * Get all the utilisateurs.
     *
     * @return the list of entities.
     */
    List<UtilisateurDTO> findAll();
    /**
     * Get all the UtilisateurDTO where Employe is {@code null}.
     *
     * @return the list of entities.
     */
    List<UtilisateurDTO> findAllWhereEmployeIsNull();


    /**
     * Get the "id" utilisateur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UtilisateurDTO> findOne(Long id);

    /**
     * Delete the "id" utilisateur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
