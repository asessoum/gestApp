package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.HabilitationService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.HabilitationDTO;

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
 * REST controller for managing {@link fr.gest.com.application.domain.Habilitation}.
 */
@RestController
@RequestMapping("/api")
public class HabilitationResource {

    private final Logger log = LoggerFactory.getLogger(HabilitationResource.class);

    private static final String ENTITY_NAME = "habilitation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HabilitationService habilitationService;

    public HabilitationResource(HabilitationService habilitationService) {
        this.habilitationService = habilitationService;
    }

    /**
     * {@code POST  /habilitations} : Create a new habilitation.
     *
     * @param habilitationDTO the habilitationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new habilitationDTO, or with status {@code 400 (Bad Request)} if the habilitation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/habilitations")
    public ResponseEntity<HabilitationDTO> createHabilitation(@Valid @RequestBody HabilitationDTO habilitationDTO) throws URISyntaxException {
        log.debug("REST request to save Habilitation : {}", habilitationDTO);
        if (habilitationDTO.getId() != null) {
            throw new BadRequestAlertException("A new habilitation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HabilitationDTO result = habilitationService.save(habilitationDTO);
        return ResponseEntity.created(new URI("/api/habilitations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /habilitations} : Updates an existing habilitation.
     *
     * @param habilitationDTO the habilitationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated habilitationDTO,
     * or with status {@code 400 (Bad Request)} if the habilitationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the habilitationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/habilitations")
    public ResponseEntity<HabilitationDTO> updateHabilitation(@Valid @RequestBody HabilitationDTO habilitationDTO) throws URISyntaxException {
        log.debug("REST request to update Habilitation : {}", habilitationDTO);
        if (habilitationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HabilitationDTO result = habilitationService.save(habilitationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, habilitationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /habilitations} : get all the habilitations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of habilitations in body.
     */
    @GetMapping("/habilitations")
    public List<HabilitationDTO> getAllHabilitations() {
        log.debug("REST request to get all Habilitations");
        return habilitationService.findAll();
    }

    /**
     * {@code GET  /habilitations/:id} : get the "id" habilitation.
     *
     * @param id the id of the habilitationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the habilitationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/habilitations/{id}")
    public ResponseEntity<HabilitationDTO> getHabilitation(@PathVariable Long id) {
        log.debug("REST request to get Habilitation : {}", id);
        Optional<HabilitationDTO> habilitationDTO = habilitationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(habilitationDTO);
    }

    /**
     * {@code DELETE  /habilitations/:id} : delete the "id" habilitation.
     *
     * @param id the id of the habilitationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/habilitations/{id}")
    public ResponseEntity<Void> deleteHabilitation(@PathVariable Long id) {
        log.debug("REST request to delete Habilitation : {}", id);
        habilitationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
