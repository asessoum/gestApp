package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.ReferenceService;
import fr.gest.com.application.domain.Reference;
import fr.gest.com.application.repository.ReferenceRepository;
import fr.gest.com.application.service.dto.ReferenceDTO;
import fr.gest.com.application.service.mapper.ReferenceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Reference}.
 */
@Service
@Transactional
public class ReferenceServiceImpl implements ReferenceService {

    private final Logger log = LoggerFactory.getLogger(ReferenceServiceImpl.class);

    private final ReferenceRepository referenceRepository;

    private final ReferenceMapper referenceMapper;

    public ReferenceServiceImpl(ReferenceRepository referenceRepository, ReferenceMapper referenceMapper) {
        this.referenceRepository = referenceRepository;
        this.referenceMapper = referenceMapper;
    }

    /**
     * Save a reference.
     *
     * @param referenceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReferenceDTO save(ReferenceDTO referenceDTO) {
        log.debug("Request to save Reference : {}", referenceDTO);
        Reference reference = referenceMapper.toEntity(referenceDTO);
        reference = referenceRepository.save(reference);
        return referenceMapper.toDto(reference);
    }

    /**
     * Get all the references.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ReferenceDTO> findAll() {
        log.debug("Request to get all References");
        return referenceRepository.findAll().stream()
            .map(referenceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one reference by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReferenceDTO> findOne(Long id) {
        log.debug("Request to get Reference : {}", id);
        return referenceRepository.findById(id)
            .map(referenceMapper::toDto);
    }

    /**
     * Delete the reference by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reference : {}", id);
        referenceRepository.deleteById(id);
    }
}
