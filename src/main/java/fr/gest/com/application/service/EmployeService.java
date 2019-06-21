package fr.gest.com.application.service;

import fr.gest.com.application.service.dto.EmployeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link fr.gest.com.application.domain.Employe}.
 */
public interface EmployeService {

    /**
     * Save a employe.
     *
     * @param employeDTO the entity to save.
     * @return the persisted entity.
     */
    EmployeDTO save(EmployeDTO employeDTO);

    /**
     * Get all the employes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EmployeDTO> findAll(Pageable pageable);

    /**
     * Get all the employes with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<EmployeDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" employe.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EmployeDTO> findOne(Long id);

    /**
     * Delete the "id" employe.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
