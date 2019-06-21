package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.FournisseurService;
import fr.gest.com.application.domain.Fournisseur;
import fr.gest.com.application.repository.FournisseurRepository;
import fr.gest.com.application.service.dto.FournisseurDTO;
import fr.gest.com.application.service.mapper.FournisseurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Fournisseur}.
 */
@Service
@Transactional
public class FournisseurServiceImpl implements FournisseurService {

    private final Logger log = LoggerFactory.getLogger(FournisseurServiceImpl.class);

    private final FournisseurRepository fournisseurRepository;

    private final FournisseurMapper fournisseurMapper;

    public FournisseurServiceImpl(FournisseurRepository fournisseurRepository, FournisseurMapper fournisseurMapper) {
        this.fournisseurRepository = fournisseurRepository;
        this.fournisseurMapper = fournisseurMapper;
    }

    /**
     * Save a fournisseur.
     *
     * @param fournisseurDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public FournisseurDTO save(FournisseurDTO fournisseurDTO) {
        log.debug("Request to save Fournisseur : {}", fournisseurDTO);
        Fournisseur fournisseur = fournisseurMapper.toEntity(fournisseurDTO);
        fournisseur = fournisseurRepository.save(fournisseur);
        return fournisseurMapper.toDto(fournisseur);
    }

    /**
     * Get all the fournisseurs.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<FournisseurDTO> findAll() {
        log.debug("Request to get all Fournisseurs");
        return fournisseurRepository.findAllWithEagerRelationships().stream()
            .map(fournisseurMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the fournisseurs with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<FournisseurDTO> findAllWithEagerRelationships(Pageable pageable) {
        return fournisseurRepository.findAllWithEagerRelationships(pageable).map(fournisseurMapper::toDto);
    }
    

    /**
     * Get one fournisseur by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FournisseurDTO> findOne(Long id) {
        log.debug("Request to get Fournisseur : {}", id);
        return fournisseurRepository.findOneWithEagerRelationships(id)
            .map(fournisseurMapper::toDto);
    }

    /**
     * Delete the fournisseur by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fournisseur : {}", id);
        fournisseurRepository.deleteById(id);
    }
}
