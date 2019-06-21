package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.CommuneService;
import fr.gest.com.application.domain.Commune;
import fr.gest.com.application.repository.CommuneRepository;
import fr.gest.com.application.service.dto.CommuneDTO;
import fr.gest.com.application.service.mapper.CommuneMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Commune}.
 */
@Service
@Transactional
public class CommuneServiceImpl implements CommuneService {

    private final Logger log = LoggerFactory.getLogger(CommuneServiceImpl.class);

    private final CommuneRepository communeRepository;

    private final CommuneMapper communeMapper;

    public CommuneServiceImpl(CommuneRepository communeRepository, CommuneMapper communeMapper) {
        this.communeRepository = communeRepository;
        this.communeMapper = communeMapper;
    }

    /**
     * Save a commune.
     *
     * @param communeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CommuneDTO save(CommuneDTO communeDTO) {
        log.debug("Request to save Commune : {}", communeDTO);
        Commune commune = communeMapper.toEntity(communeDTO);
        commune = communeRepository.save(commune);
        return communeMapper.toDto(commune);
    }

    /**
     * Get all the communes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CommuneDTO> findAll() {
        log.debug("Request to get all Communes");
        return communeRepository.findAll().stream()
            .map(communeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one commune by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CommuneDTO> findOne(Long id) {
        log.debug("Request to get Commune : {}", id);
        return communeRepository.findById(id)
            .map(communeMapper::toDto);
    }

    /**
     * Delete the commune by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Commune : {}", id);
        communeRepository.deleteById(id);
    }
}
