package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.ArticleComposeService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.ArticleComposeDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.gest.com.application.domain.ArticleCompose}.
 */
@RestController
@RequestMapping("/api")
public class ArticleComposeResource {

    private final Logger log = LoggerFactory.getLogger(ArticleComposeResource.class);

    private static final String ENTITY_NAME = "articleCompose";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArticleComposeService articleComposeService;

    public ArticleComposeResource(ArticleComposeService articleComposeService) {
        this.articleComposeService = articleComposeService;
    }

    /**
     * {@code POST  /article-composes} : Create a new articleCompose.
     *
     * @param articleComposeDTO the articleComposeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new articleComposeDTO, or with status {@code 400 (Bad Request)} if the articleCompose has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/article-composes")
    public ResponseEntity<ArticleComposeDTO> createArticleCompose(@Valid @RequestBody ArticleComposeDTO articleComposeDTO) throws URISyntaxException {
        log.debug("REST request to save ArticleCompose : {}", articleComposeDTO);
        if (articleComposeDTO.getId() != null) {
            throw new BadRequestAlertException("A new articleCompose cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleComposeDTO result = articleComposeService.save(articleComposeDTO);
        return ResponseEntity.created(new URI("/api/article-composes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /article-composes} : Updates an existing articleCompose.
     *
     * @param articleComposeDTO the articleComposeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated articleComposeDTO,
     * or with status {@code 400 (Bad Request)} if the articleComposeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the articleComposeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/article-composes")
    public ResponseEntity<ArticleComposeDTO> updateArticleCompose(@Valid @RequestBody ArticleComposeDTO articleComposeDTO) throws URISyntaxException {
        log.debug("REST request to update ArticleCompose : {}", articleComposeDTO);
        if (articleComposeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleComposeDTO result = articleComposeService.save(articleComposeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, articleComposeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /article-composes} : get all the articleComposes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articleComposes in body.
     */
    @GetMapping("/article-composes")
    public List<ArticleComposeDTO> getAllArticleComposes() {
        log.debug("REST request to get all ArticleComposes");
        return articleComposeService.findAll();
    }

    /**
     * {@code GET  /article-composes/:id} : get the "id" articleCompose.
     *
     * @param id the id of the articleComposeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the articleComposeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/article-composes/{id}")
    public ResponseEntity<ArticleComposeDTO> getArticleCompose(@PathVariable Long id) {
        log.debug("REST request to get ArticleCompose : {}", id);
        Optional<ArticleComposeDTO> articleComposeDTO = articleComposeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(articleComposeDTO);
    }

    /**
     * {@code DELETE  /article-composes/:id} : delete the "id" articleCompose.
     *
     * @param id the id of the articleComposeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/article-composes/{id}")
    public ResponseEntity<Void> deleteArticleCompose(@PathVariable Long id) {
        log.debug("REST request to delete ArticleCompose : {}", id);
        articleComposeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
