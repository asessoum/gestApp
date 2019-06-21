package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Partenaire;
import fr.gest.com.application.repository.PartenaireRepository;
import fr.gest.com.application.service.PartenaireService;
import fr.gest.com.application.service.dto.PartenaireDTO;
import fr.gest.com.application.service.mapper.PartenaireMapper;
import fr.gest.com.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static fr.gest.com.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PartenaireResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class PartenaireResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final String DEFAULT_RAISON_SOCIALE = "AAAAAAAAAA";
    private static final String UPDATED_RAISON_SOCIALE = "BBBBBBBBBB";

    private static final Double DEFAULT_NOMBRE_SALARIES = 1D;
    private static final Double UPDATED_NOMBRE_SALARIES = 2D;

    private static final Boolean DEFAULT_EST_ACTIF = false;
    private static final Boolean UPDATED_EST_ACTIF = true;

    private static final Instant DEFAULT_CREE_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREE_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_CREE_PAR = "BBBBBBBBBB";

    private static final Instant DEFAULT_MODIF_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIF_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MODIF_PAR = "AAAAAAAAAA";
    private static final String UPDATED_MODIF_PAR = "BBBBBBBBBB";

    @Autowired
    private PartenaireRepository partenaireRepository;

    @Autowired
    private PartenaireMapper partenaireMapper;

    @Autowired
    private PartenaireService partenaireService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPartenaireMockMvc;

    private Partenaire partenaire;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartenaireResource partenaireResource = new PartenaireResource(partenaireService);
        this.restPartenaireMockMvc = MockMvcBuilders.standaloneSetup(partenaireResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Partenaire createEntity(EntityManager em) {
        Partenaire partenaire = new Partenaire()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .raisonSociale(DEFAULT_RAISON_SOCIALE)
            .nombreSalaries(DEFAULT_NOMBRE_SALARIES)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return partenaire;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Partenaire createUpdatedEntity(EntityManager em) {
        Partenaire partenaire = new Partenaire()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .raisonSociale(UPDATED_RAISON_SOCIALE)
            .nombreSalaries(UPDATED_NOMBRE_SALARIES)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return partenaire;
    }

    @BeforeEach
    public void initTest() {
        partenaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartenaire() throws Exception {
        int databaseSizeBeforeCreate = partenaireRepository.findAll().size();

        // Create the Partenaire
        PartenaireDTO partenaireDTO = partenaireMapper.toDto(partenaire);
        restPartenaireMockMvc.perform(post("/api/partenaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partenaireDTO)))
            .andExpect(status().isCreated());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeCreate + 1);
        Partenaire testPartenaire = partenaireList.get(partenaireList.size() - 1);
        assertThat(testPartenaire.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testPartenaire.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testPartenaire.getRaisonSociale()).isEqualTo(DEFAULT_RAISON_SOCIALE);
        assertThat(testPartenaire.getNombreSalaries()).isEqualTo(DEFAULT_NOMBRE_SALARIES);
        assertThat(testPartenaire.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testPartenaire.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testPartenaire.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testPartenaire.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testPartenaire.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createPartenaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partenaireRepository.findAll().size();

        // Create the Partenaire with an existing ID
        partenaire.setId(1L);
        PartenaireDTO partenaireDTO = partenaireMapper.toDto(partenaire);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartenaireMockMvc.perform(post("/api/partenaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partenaireDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = partenaireRepository.findAll().size();
        // set the field null
        partenaire.setTechID(null);

        // Create the Partenaire, which fails.
        PartenaireDTO partenaireDTO = partenaireMapper.toDto(partenaire);

        restPartenaireMockMvc.perform(post("/api/partenaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partenaireDTO)))
            .andExpect(status().isBadRequest());

        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = partenaireRepository.findAll().size();
        // set the field null
        partenaire.setRemoteID(null);

        // Create the Partenaire, which fails.
        PartenaireDTO partenaireDTO = partenaireMapper.toDto(partenaire);

        restPartenaireMockMvc.perform(post("/api/partenaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partenaireDTO)))
            .andExpect(status().isBadRequest());

        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPartenaires() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        // Get all the partenaireList
        restPartenaireMockMvc.perform(get("/api/partenaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partenaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].raisonSociale").value(hasItem(DEFAULT_RAISON_SOCIALE.toString())))
            .andExpect(jsonPath("$.[*].nombreSalaries").value(hasItem(DEFAULT_NOMBRE_SALARIES.doubleValue())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getPartenaire() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        // Get the partenaire
        restPartenaireMockMvc.perform(get("/api/partenaires/{id}", partenaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partenaire.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.raisonSociale").value(DEFAULT_RAISON_SOCIALE.toString()))
            .andExpect(jsonPath("$.nombreSalaries").value(DEFAULT_NOMBRE_SALARIES.doubleValue()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartenaire() throws Exception {
        // Get the partenaire
        restPartenaireMockMvc.perform(get("/api/partenaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartenaire() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();

        // Update the partenaire
        Partenaire updatedPartenaire = partenaireRepository.findById(partenaire.getId()).get();
        // Disconnect from session so that the updates on updatedPartenaire are not directly saved in db
        em.detach(updatedPartenaire);
        updatedPartenaire
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .raisonSociale(UPDATED_RAISON_SOCIALE)
            .nombreSalaries(UPDATED_NOMBRE_SALARIES)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        PartenaireDTO partenaireDTO = partenaireMapper.toDto(updatedPartenaire);

        restPartenaireMockMvc.perform(put("/api/partenaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partenaireDTO)))
            .andExpect(status().isOk());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
        Partenaire testPartenaire = partenaireList.get(partenaireList.size() - 1);
        assertThat(testPartenaire.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testPartenaire.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testPartenaire.getRaisonSociale()).isEqualTo(UPDATED_RAISON_SOCIALE);
        assertThat(testPartenaire.getNombreSalaries()).isEqualTo(UPDATED_NOMBRE_SALARIES);
        assertThat(testPartenaire.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testPartenaire.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testPartenaire.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testPartenaire.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testPartenaire.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingPartenaire() throws Exception {
        int databaseSizeBeforeUpdate = partenaireRepository.findAll().size();

        // Create the Partenaire
        PartenaireDTO partenaireDTO = partenaireMapper.toDto(partenaire);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartenaireMockMvc.perform(put("/api/partenaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partenaireDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Partenaire in the database
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePartenaire() throws Exception {
        // Initialize the database
        partenaireRepository.saveAndFlush(partenaire);

        int databaseSizeBeforeDelete = partenaireRepository.findAll().size();

        // Delete the partenaire
        restPartenaireMockMvc.perform(delete("/api/partenaires/{id}", partenaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Partenaire> partenaireList = partenaireRepository.findAll();
        assertThat(partenaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Partenaire.class);
        Partenaire partenaire1 = new Partenaire();
        partenaire1.setId(1L);
        Partenaire partenaire2 = new Partenaire();
        partenaire2.setId(partenaire1.getId());
        assertThat(partenaire1).isEqualTo(partenaire2);
        partenaire2.setId(2L);
        assertThat(partenaire1).isNotEqualTo(partenaire2);
        partenaire1.setId(null);
        assertThat(partenaire1).isNotEqualTo(partenaire2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartenaireDTO.class);
        PartenaireDTO partenaireDTO1 = new PartenaireDTO();
        partenaireDTO1.setId(1L);
        PartenaireDTO partenaireDTO2 = new PartenaireDTO();
        assertThat(partenaireDTO1).isNotEqualTo(partenaireDTO2);
        partenaireDTO2.setId(partenaireDTO1.getId());
        assertThat(partenaireDTO1).isEqualTo(partenaireDTO2);
        partenaireDTO2.setId(2L);
        assertThat(partenaireDTO1).isNotEqualTo(partenaireDTO2);
        partenaireDTO1.setId(null);
        assertThat(partenaireDTO1).isNotEqualTo(partenaireDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(partenaireMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(partenaireMapper.fromId(null)).isNull();
    }
}
