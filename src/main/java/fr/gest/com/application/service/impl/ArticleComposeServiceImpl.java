package fr.gest.com.application.service.impl;

import fr.gest.com.application.service.ArticleComposeService;
import fr.gest.com.application.domain.ArticleCompose;
import fr.gest.com.application.repository.ArticleComposeRepository;
import fr.gest.com.application.service.dto.ArticleComposeDTO;
import fr.gest.com.application.service.mapper.ArticleComposeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link ArticleCompose}.
 */
@Service
@Transactional
public class ArticleComposeServiceImpl implements ArticleComposeService {

    private final Logger log = LoggerFactory.getLogger(ArticleComposeServiceImpl.class);

    private final ArticleComposeRepository articleComposeRepository;

    private final ArticleComposeMapper articleComposeMapper;

    public ArticleComposeServiceImpl(ArticleComposeRepository articleComposeRepository, ArticleComposeMapper articleComposeMapper) {
        this.articleComposeRepository = articleComposeRepository;
        this.articleComposeMapper = articleComposeMapper;
    }

    /**
     * Save a articleCompose.
     *
     * @param articleComposeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ArticleComposeDTO save(ArticleComposeDTO articleComposeDTO) {
        log.debug("Request to save ArticleCompose : {}", articleComposeDTO);
        ArticleCompose articleCompose = articleComposeMapper.toEntity(articleComposeDTO);
        articleCompose = articleComposeRepository.save(articleCompose);
        return articleComposeMapper.toDto(articleCompose);
    }

    /**
     * Get all the articleComposes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ArticleComposeDTO> findAll() {
        log.debug("Request to get all ArticleComposes");
        return articleComposeRepository.findAll().stream()
            .map(articleComposeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one articleCompose by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ArticleComposeDTO> findOne(Long id) {
        log.debug("Request to get ArticleCompose : {}", id);
        return articleComposeRepository.findById(id)
            .map(articleComposeMapper::toDto);
    }

    /**
     * Delete the articleCompose by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ArticleCompose : {}", id);
        articleComposeRepository.deleteById(id);
    }
}
