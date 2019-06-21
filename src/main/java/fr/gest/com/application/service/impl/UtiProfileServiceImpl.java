package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.UtiProfileService;
import fr.gest.com.application.domain.UtiProfile;
import fr.gest.com.application.repository.UtiProfileRepository;
import fr.gest.com.application.service.dto.UtiProfileDTO;
import fr.gest.com.application.service.mapper.UtiProfileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link UtiProfile}.
 */
@Service
@Transactional
public class UtiProfileServiceImpl implements UtiProfileService {

    private final Logger log = LoggerFactory.getLogger(UtiProfileServiceImpl.class);

    private final UtiProfileRepository utiProfileRepository;

    private final UtiProfileMapper utiProfileMapper;

    public UtiProfileServiceImpl(UtiProfileRepository utiProfileRepository, UtiProfileMapper utiProfileMapper) {
        this.utiProfileRepository = utiProfileRepository;
        this.utiProfileMapper = utiProfileMapper;
    }

    /**
     * Save a utiProfile.
     *
     * @param utiProfileDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UtiProfileDTO save(UtiProfileDTO utiProfileDTO) {
        log.debug("Request to save UtiProfile : {}", utiProfileDTO);
        UtiProfile utiProfile = utiProfileMapper.toEntity(utiProfileDTO);
        utiProfile = utiProfileRepository.save(utiProfile);
        return utiProfileMapper.toDto(utiProfile);
    }

    /**
     * Get all the utiProfiles.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UtiProfileDTO> findAll() {
        log.debug("Request to get all UtiProfiles");
        return utiProfileRepository.findAll().stream()
            .map(utiProfileMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one utiProfile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UtiProfileDTO> findOne(Long id) {
        log.debug("Request to get UtiProfile : {}", id);
        return utiProfileRepository.findById(id)
            .map(utiProfileMapper::toDto);
    }

    /**
     * Delete the utiProfile by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UtiProfile : {}", id);
        utiProfileRepository.deleteById(id);
    }
}
