package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.UtiProfileService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.UtiProfileDTO;

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
 * REST controller for managing {@link fr.gest.com.application.domain.UtiProfile}.
 */
@RestController
@RequestMapping("/api")
public class UtiProfileResource {

    private final Logger log = LoggerFactory.getLogger(UtiProfileResource.class);

    private static final String ENTITY_NAME = "utiProfile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UtiProfileService utiProfileService;

    public UtiProfileResource(UtiProfileService utiProfileService) {
        this.utiProfileService = utiProfileService;
    }

    /**
     * {@code POST  /uti-profiles} : Create a new utiProfile.
     *
     * @param utiProfileDTO the utiProfileDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new utiProfileDTO, or with status {@code 400 (Bad Request)} if the utiProfile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/uti-profiles")
    public ResponseEntity<UtiProfileDTO> createUtiProfile(@Valid @RequestBody UtiProfileDTO utiProfileDTO) throws URISyntaxException {
        log.debug("REST request to save UtiProfile : {}", utiProfileDTO);
        if (utiProfileDTO.getId() != null) {
            throw new BadRequestAlertException("A new utiProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UtiProfileDTO result = utiProfileService.save(utiProfileDTO);
        return ResponseEntity.created(new URI("/api/uti-profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /uti-profiles} : Updates an existing utiProfile.
     *
     * @param utiProfileDTO the utiProfileDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated utiProfileDTO,
     * or with status {@code 400 (Bad Request)} if the utiProfileDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the utiProfileDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/uti-profiles")
    public ResponseEntity<UtiProfileDTO> updateUtiProfile(@Valid @RequestBody UtiProfileDTO utiProfileDTO) throws URISyntaxException {
        log.debug("REST request to update UtiProfile : {}", utiProfileDTO);
        if (utiProfileDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UtiProfileDTO result = utiProfileService.save(utiProfileDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, utiProfileDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /uti-profiles} : get all the utiProfiles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of utiProfiles in body.
     */
    @GetMapping("/uti-profiles")
    public List<UtiProfileDTO> getAllUtiProfiles() {
        log.debug("REST request to get all UtiProfiles");
        return utiProfileService.findAll();
    }

    /**
     * {@code GET  /uti-profiles/:id} : get the "id" utiProfile.
     *
     * @param id the id of the utiProfileDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the utiProfileDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/uti-profiles/{id}")
    public ResponseEntity<UtiProfileDTO> getUtiProfile(@PathVariable Long id) {
        log.debug("REST request to get UtiProfile : {}", id);
        Optional<UtiProfileDTO> utiProfileDTO = utiProfileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(utiProfileDTO);
    }

    /**
     * {@code DELETE  /uti-profiles/:id} : delete the "id" utiProfile.
     *
     * @param id the id of the utiProfileDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/uti-profiles/{id}")
    public ResponseEntity<Void> deleteUtiProfile(@PathVariable Long id) {
        log.debug("REST request to delete UtiProfile : {}", id);
        utiProfileService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
