package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.MouvementStockService;
import fr.gest.com.application.domain.MouvementStock;
import fr.gest.com.application.repository.MouvementStockRepository;
import fr.gest.com.application.service.dto.MouvementStockDTO;
import fr.gest.com.application.service.mapper.MouvementStockMapper;
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
 * Service Implementation for managing {@link MouvementStock}.
 */
@Service
@Transactional
public class MouvementStockServiceImpl implements MouvementStockService {

    private final Logger log = LoggerFactory.getLogger(MouvementStockServiceImpl.class);

    private final MouvementStockRepository mouvementStockRepository;

    private final MouvementStockMapper mouvementStockMapper;

    public MouvementStockServiceImpl(MouvementStockRepository mouvementStockRepository, MouvementStockMapper mouvementStockMapper) {
        this.mouvementStockRepository = mouvementStockRepository;
        this.mouvementStockMapper = mouvementStockMapper;
    }

    /**
     * Save a mouvementStock.
     *
     * @param mouvementStockDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MouvementStockDTO save(MouvementStockDTO mouvementStockDTO) {
        log.debug("Request to save MouvementStock : {}", mouvementStockDTO);
        MouvementStock mouvementStock = mouvementStockMapper.toEntity(mouvementStockDTO);
        mouvementStock = mouvementStockRepository.save(mouvementStock);
        return mouvementStockMapper.toDto(mouvementStock);
    }

    /**
     * Get all the mouvementStocks.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MouvementStockDTO> findAll() {
        log.debug("Request to get all MouvementStocks");
        return mouvementStockRepository.findAllWithEagerRelationships().stream()
            .map(mouvementStockMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the mouvementStocks with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<MouvementStockDTO> findAllWithEagerRelationships(Pageable pageable) {
        return mouvementStockRepository.findAllWithEagerRelationships(pageable).map(mouvementStockMapper::toDto);
    }
    

    /**
     * Get one mouvementStock by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MouvementStockDTO> findOne(Long id) {
        log.debug("Request to get MouvementStock : {}", id);
        return mouvementStockRepository.findOneWithEagerRelationships(id)
            .map(mouvementStockMapper::toDto);
    }

    /**
     * Delete the mouvementStock by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MouvementStock : {}", id);
        mouvementStockRepository.deleteById(id);
    }
}
