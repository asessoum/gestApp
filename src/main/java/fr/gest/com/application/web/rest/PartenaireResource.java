package fr.gest.com.application.web.rest;

import fr.gest.com.application.service.PartenaireService;
import fr.gest.com.application.web.rest.errors.BadRequestAlertException;
import fr.gest.com.application.service.dto.PartenaireDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.gest.com.application.domain.Partenaire}.
 */
@RestController
@RequestMapping("/api")
public class PartenaireResource {

    private final Logger log = LoggerFactory.getLogger(PartenaireResource.class);

    private static final String ENTITY_NAME = "partenaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PartenaireService partenaireService;

    public PartenaireResource(PartenaireService partenaireService) {
        this.partenaireService = partenaireService;
    }

    /**
     * {@code POST  /partenaires} : Create a new partenaire.
     *
     * @param partenaireDTO the partenaireDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new partenaireDTO, or with status {@code 400 (Bad Request)} if the partenaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/partenaires")
    public ResponseEntity<PartenaireDTO> createPartenaire(@Valid @RequestBody PartenaireDTO partenaireDTO) throws URISyntaxException {
        log.debug("REST request to save Partenaire : {}", partenaireDTO);
        if (partenaireDTO.getId() != null) {
            throw new BadRequestAlertException("A new partenaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartenaireDTO result = partenaireService.save(partenaireDTO);
        return ResponseEntity.created(new URI("/api/partenaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /partenaires} : Updates an existing partenaire.
     *
     * @param partenaireDTO the partenaireDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated partenaireDTO,
     * or with status {@code 400 (Bad Request)} if the partenaireDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the partenaireDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/partenaires")
    public ResponseEntity<PartenaireDTO> updatePartenaire(@Valid @RequestBody PartenaireDTO partenaireDTO) throws URISyntaxException {
        log.debug("REST request to update Partenaire : {}", partenaireDTO);
        if (partenaireDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PartenaireDTO result = partenaireService.save(partenaireDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, partenaireDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /partenaires} : get all the partenaires.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of partenaires in body.
     */
    @GetMapping("/partenaires")
    public ResponseEntity<List<PartenaireDTO>> getAllPartenaires(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Partenaires");
        Page<PartenaireDTO> page = partenaireService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /partenaires/:id} : get the "id" partenaire.
     *
     * @param id the id of the partenaireDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the partenaireDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/partenaires/{id}")
    public ResponseEntity<PartenaireDTO> getPartenaire(@PathVariable Long id) {
        log.debug("REST request to get Partenaire : {}", id);
        Optional<PartenaireDTO> partenaireDTO = partenaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(partenaireDTO);
    }

    /**
     * {@code DELETE  /partenaires/:id} : delete the "id" partenaire.
     *
     * @param id the id of the partenaireDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/partenaires/{id}")
    public ResponseEntity<Void> deletePartenaire(@PathVariable Long id) {
        log.debug("REST request to delete Partenaire : {}", id);
        partenaireService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
