package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.ReferenceService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.ReferenceDTO;

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
 * REST controller for managing {@link fr.gest.com.application.domain.Reference}.
 */
@RestController
@RequestMapping("/api")
public class ReferenceResource {

    private final Logger log = LoggerFactory.getLogger(ReferenceResource.class);

    private static final String ENTITY_NAME = "reference";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReferenceService referenceService;

    public ReferenceResource(ReferenceService referenceService) {
        this.referenceService = referenceService;
    }

    /**
     * {@code POST  /references} : Create a new reference.
     *
     * @param referenceDTO the referenceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new referenceDTO, or with status {@code 400 (Bad Request)} if the reference has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/references")
    public ResponseEntity<ReferenceDTO> createReference(@Valid @RequestBody ReferenceDTO referenceDTO) throws URISyntaxException {
        log.debug("REST request to save Reference : {}", referenceDTO);
        if (referenceDTO.getId() != null) {
            throw new BadRequestAlertException("A new reference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReferenceDTO result = referenceService.save(referenceDTO);
        return ResponseEntity.created(new URI("/api/references/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /references} : Updates an existing reference.
     *
     * @param referenceDTO the referenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated referenceDTO,
     * or with status {@code 400 (Bad Request)} if the referenceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the referenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/references")
    public ResponseEntity<ReferenceDTO> updateReference(@Valid @RequestBody ReferenceDTO referenceDTO) throws URISyntaxException {
        log.debug("REST request to update Reference : {}", referenceDTO);
        if (referenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReferenceDTO result = referenceService.save(referenceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, referenceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /references} : get all the references.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of references in body.
     */
    @GetMapping("/references")
    public List<ReferenceDTO> getAllReferences() {
        log.debug("REST request to get all References");
        return referenceService.findAll();
    }

    /**
     * {@code GET  /references/:id} : get the "id" reference.
     *
     * @param id the id of the referenceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the referenceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/references/{id}")
    public ResponseEntity<ReferenceDTO> getReference(@PathVariable Long id) {
        log.debug("REST request to get Reference : {}", id);
        Optional<ReferenceDTO> referenceDTO = referenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(referenceDTO);
    }

    /**
     * {@code DELETE  /references/:id} : delete the "id" reference.
     *
     * @param id the id of the referenceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/references/{id}")
    public ResponseEntity<Void> deleteReference(@PathVariable Long id) {
        log.debug("REST request to delete Reference : {}", id);
        referenceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
