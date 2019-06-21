package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.AdresseService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.AdresseDTO;

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
 * REST controller for managing {@link fr.gest.com.application.domain.Adresse}.
 */
@RestController
@RequestMapping("/api")
public class AdresseResource {

    private final Logger log = LoggerFactory.getLogger(AdresseResource.class);

    private static final String ENTITY_NAME = "adresse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdresseService adresseService;

    public AdresseResource(AdresseService adresseService) {
        this.adresseService = adresseService;
    }

    /**
     * {@code POST  /adresses} : Create a new adresse.
     *
     * @param adresseDTO the adresseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new adresseDTO, or with status {@code 400 (Bad Request)} if the adresse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/adresses")
    public ResponseEntity<AdresseDTO> createAdresse(@Valid @RequestBody AdresseDTO adresseDTO) throws URISyntaxException {
        log.debug("REST request to save Adresse : {}", adresseDTO);
        if (adresseDTO.getId() != null) {
            throw new BadRequestAlertException("A new adresse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AdresseDTO result = adresseService.save(adresseDTO);
        return ResponseEntity.created(new URI("/api/adresses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /adresses} : Updates an existing adresse.
     *
     * @param adresseDTO the adresseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adresseDTO,
     * or with status {@code 400 (Bad Request)} if the adresseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the adresseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/adresses")
    public ResponseEntity<AdresseDTO> updateAdresse(@Valid @RequestBody AdresseDTO adresseDTO) throws URISyntaxException {
        log.debug("REST request to update Adresse : {}", adresseDTO);
        if (adresseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AdresseDTO result = adresseService.save(adresseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, adresseDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /adresses} : get all the adresses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of adresses in body.
     */
    @GetMapping("/adresses")
    public List<AdresseDTO> getAllAdresses() {
        log.debug("REST request to get all Adresses");
        return adresseService.findAll();
    }

    /**
     * {@code GET  /adresses/:id} : get the "id" adresse.
     *
     * @param id the id of the adresseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the adresseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/adresses/{id}")
    public ResponseEntity<AdresseDTO> getAdresse(@PathVariable Long id) {
        log.debug("REST request to get Adresse : {}", id);
        Optional<AdresseDTO> adresseDTO = adresseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(adresseDTO);
    }

    /**
     * {@code DELETE  /adresses/:id} : delete the "id" adresse.
     *
     * @param id the id of the adresseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/adresses/{id}")
    public ResponseEntity<Void> deleteAdresse(@PathVariable Long id) {
        log.debug("REST request to delete Adresse : {}", id);
        adresseService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
