package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.ReductionService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.ReductionDTO;

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
 * REST controller for managing {@link fr.gest.com.application.domain.Reduction}.
 */
@RestController
@RequestMapping("/api")
public class ReductionResource {

    private final Logger log = LoggerFactory.getLogger(ReductionResource.class);

    private static final String ENTITY_NAME = "reduction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReductionService reductionService;

    public ReductionResource(ReductionService reductionService) {
        this.reductionService = reductionService;
    }

    /**
     * {@code POST  /reductions} : Create a new reduction.
     *
     * @param reductionDTO the reductionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reductionDTO, or with status {@code 400 (Bad Request)} if the reduction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reductions")
    public ResponseEntity<ReductionDTO> createReduction(@Valid @RequestBody ReductionDTO reductionDTO) throws URISyntaxException {
        log.debug("REST request to save Reduction : {}", reductionDTO);
        if (reductionDTO.getId() != null) {
            throw new BadRequestAlertException("A new reduction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReductionDTO result = reductionService.save(reductionDTO);
        return ResponseEntity.created(new URI("/api/reductions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reductions} : Updates an existing reduction.
     *
     * @param reductionDTO the reductionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reductionDTO,
     * or with status {@code 400 (Bad Request)} if the reductionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reductionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reductions")
    public ResponseEntity<ReductionDTO> updateReduction(@Valid @RequestBody ReductionDTO reductionDTO) throws URISyntaxException {
        log.debug("REST request to update Reduction : {}", reductionDTO);
        if (reductionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReductionDTO result = reductionService.save(reductionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reductionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reductions} : get all the reductions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reductions in body.
     */
    @GetMapping("/reductions")
    public List<ReductionDTO> getAllReductions() {
        log.debug("REST request to get all Reductions");
        return reductionService.findAll();
    }

    /**
     * {@code GET  /reductions/:id} : get the "id" reduction.
     *
     * @param id the id of the reductionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reductionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reductions/{id}")
    public ResponseEntity<ReductionDTO> getReduction(@PathVariable Long id) {
        log.debug("REST request to get Reduction : {}", id);
        Optional<ReductionDTO> reductionDTO = reductionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reductionDTO);
    }

    /**
     * {@code DELETE  /reductions/:id} : delete the "id" reduction.
     *
     * @param id the id of the reductionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reductions/{id}")
    public ResponseEntity<Void> deleteReduction(@PathVariable Long id) {
        log.debug("REST request to delete Reduction : {}", id);
        reductionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
