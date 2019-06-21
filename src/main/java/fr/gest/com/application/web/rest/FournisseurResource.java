package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.FournisseurService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.FournisseurDTO;

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
 * REST controller for managing {@link fr.gest.com.application.domain.Fournisseur}.
 */
@RestController
@RequestMapping("/api")
public class FournisseurResource {

    private final Logger log = LoggerFactory.getLogger(FournisseurResource.class);

    private static final String ENTITY_NAME = "fournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FournisseurService fournisseurService;

    public FournisseurResource(FournisseurService fournisseurService) {
        this.fournisseurService = fournisseurService;
    }

    /**
     * {@code POST  /fournisseurs} : Create a new fournisseur.
     *
     * @param fournisseurDTO the fournisseurDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fournisseurDTO, or with status {@code 400 (Bad Request)} if the fournisseur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fournisseurs")
    public ResponseEntity<FournisseurDTO> createFournisseur(@Valid @RequestBody FournisseurDTO fournisseurDTO) throws URISyntaxException {
        log.debug("REST request to save Fournisseur : {}", fournisseurDTO);
        if (fournisseurDTO.getId() != null) {
            throw new BadRequestAlertException("A new fournisseur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FournisseurDTO result = fournisseurService.save(fournisseurDTO);
        return ResponseEntity.created(new URI("/api/fournisseurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fournisseurs} : Updates an existing fournisseur.
     *
     * @param fournisseurDTO the fournisseurDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fournisseurDTO,
     * or with status {@code 400 (Bad Request)} if the fournisseurDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fournisseurDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fournisseurs")
    public ResponseEntity<FournisseurDTO> updateFournisseur(@Valid @RequestBody FournisseurDTO fournisseurDTO) throws URISyntaxException {
        log.debug("REST request to update Fournisseur : {}", fournisseurDTO);
        if (fournisseurDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FournisseurDTO result = fournisseurService.save(fournisseurDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fournisseurDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fournisseurs} : get all the fournisseurs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fournisseurs in body.
     */
    @GetMapping("/fournisseurs")
    public List<FournisseurDTO> getAllFournisseurs(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Fournisseurs");
        return fournisseurService.findAll();
    }

    /**
     * {@code GET  /fournisseurs/:id} : get the "id" fournisseur.
     *
     * @param id the id of the fournisseurDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fournisseurDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fournisseurs/{id}")
    public ResponseEntity<FournisseurDTO> getFournisseur(@PathVariable Long id) {
        log.debug("REST request to get Fournisseur : {}", id);
        Optional<FournisseurDTO> fournisseurDTO = fournisseurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fournisseurDTO);
    }

    /**
     * {@code DELETE  /fournisseurs/:id} : delete the "id" fournisseur.
     *
     * @param id the id of the fournisseurDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fournisseurs/{id}")
    public ResponseEntity<Void> deleteFournisseur(@PathVariable Long id) {
        log.debug("REST request to delete Fournisseur : {}", id);
        fournisseurService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
