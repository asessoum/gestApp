package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.LangueService;
import fr.gest.com.application.domain.Langue;
import fr.gest.com.application.repository.LangueRepository;
import fr.gest.com.application.service.dto.LangueDTO;
import fr.gest.com.application.service.mapper.LangueMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Langue}.
 */
@Service
@Transactional
public class LangueServiceImpl implements LangueService {

    private final Logger log = LoggerFactory.getLogger(LangueServiceImpl.class);

    private final LangueRepository langueRepository;

    private final LangueMapper langueMapper;

    public LangueServiceImpl(LangueRepository langueRepository, LangueMapper langueMapper) {
        this.langueRepository = langueRepository;
        this.langueMapper = langueMapper;
    }

    /**
     * Save a langue.
     *
     * @param langueDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LangueDTO save(LangueDTO langueDTO) {
        log.debug("Request to save Langue : {}", langueDTO);
        Langue langue = langueMapper.toEntity(langueDTO);
        langue = langueRepository.save(langue);
        return langueMapper.toDto(langue);
    }

    /**
     * Get all the langues.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LangueDTO> findAll() {
        log.debug("Request to get all Langues");
        return langueRepository.findAll().stream()
            .map(langueMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one langue by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LangueDTO> findOne(Long id) {
        log.debug("Request to get Langue : {}", id);
        return langueRepository.findById(id)
            .map(langueMapper::toDto);
    }

    /**
     * Delete the langue by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Langue : {}", id);
        langueRepository.deleteById(id);
    }
}
