package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.ReductionService;
import fr.gest.com.application.domain.Reduction;
import fr.gest.com.application.repository.ReductionRepository;
import fr.gest.com.application.service.dto.ReductionDTO;
import fr.gest.com.application.service.mapper.ReductionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Reduction}.
 */
@Service
@Transactional
public class ReductionServiceImpl implements ReductionService {

    private final Logger log = LoggerFactory.getLogger(ReductionServiceImpl.class);

    private final ReductionRepository reductionRepository;

    private final ReductionMapper reductionMapper;

    public ReductionServiceImpl(ReductionRepository reductionRepository, ReductionMapper reductionMapper) {
        this.reductionRepository = reductionRepository;
        this.reductionMapper = reductionMapper;
    }

    /**
     * Save a reduction.
     *
     * @param reductionDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReductionDTO save(ReductionDTO reductionDTO) {
        log.debug("Request to save Reduction : {}", reductionDTO);
        Reduction reduction = reductionMapper.toEntity(reductionDTO);
        reduction = reductionRepository.save(reduction);
        return reductionMapper.toDto(reduction);
    }

    /**
     * Get all the reductions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ReductionDTO> findAll() {
        log.debug("Request to get all Reductions");
        return reductionRepository.findAll().stream()
            .map(reductionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one reduction by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReductionDTO> findOne(Long id) {
        log.debug("Request to get Reduction : {}", id);
        return reductionRepository.findById(id)
            .map(reductionMapper::toDto);
    }

    /**
     * Delete the reduction by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reduction : {}", id);
        reductionRepository.deleteById(id);
    }
}
