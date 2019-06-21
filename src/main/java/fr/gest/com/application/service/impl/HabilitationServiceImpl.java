package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.HabilitationService;
import fr.gest.com.application.domain.Habilitation;
import fr.gest.com.application.repository.HabilitationRepository;
import fr.gest.com.application.service.dto.HabilitationDTO;
import fr.gest.com.application.service.mapper.HabilitationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Habilitation}.
 */
@Service
@Transactional
public class HabilitationServiceImpl implements HabilitationService {

    private final Logger log = LoggerFactory.getLogger(HabilitationServiceImpl.class);

    private final HabilitationRepository habilitationRepository;

    private final HabilitationMapper habilitationMapper;

    public HabilitationServiceImpl(HabilitationRepository habilitationRepository, HabilitationMapper habilitationMapper) {
        this.habilitationRepository = habilitationRepository;
        this.habilitationMapper = habilitationMapper;
    }

    /**
     * Save a habilitation.
     *
     * @param habilitationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public HabilitationDTO save(HabilitationDTO habilitationDTO) {
        log.debug("Request to save Habilitation : {}", habilitationDTO);
        Habilitation habilitation = habilitationMapper.toEntity(habilitationDTO);
        habilitation = habilitationRepository.save(habilitation);
        return habilitationMapper.toDto(habilitation);
    }

    /**
     * Get all the habilitations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<HabilitationDTO> findAll() {
        log.debug("Request to get all Habilitations");
        return habilitationRepository.findAll().stream()
            .map(habilitationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one habilitation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HabilitationDTO> findOne(Long id) {
        log.debug("Request to get Habilitation : {}", id);
        return habilitationRepository.findById(id)
            .map(habilitationMapper::toDto);
    }

    /**
     * Delete the habilitation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Habilitation : {}", id);
        habilitationRepository.deleteById(id);
    }
}
