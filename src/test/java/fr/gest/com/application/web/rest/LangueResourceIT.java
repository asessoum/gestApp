package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Langue;
import fr.gest.com.application.repository.LangueRepository;
import fr.gest.com.application.service.LangueService;
import fr.gest.com.application.service.dto.LangueDTO;
import fr.gest.com.application.service.mapper.LangueMapper;
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
 * Integration tests for the {@Link LangueResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class LangueResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

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
    private LangueRepository langueRepository;

    @Autowired
    private LangueMapper langueMapper;

    @Autowired
    private LangueService langueService;

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

    private MockMvc restLangueMockMvc;

    private Langue langue;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LangueResource langueResource = new LangueResource(langueService);
        this.restLangueMockMvc = MockMvcBuilders.standaloneSetup(langueResource)
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
    public static Langue createEntity(EntityManager em) {
        Langue langue = new Langue()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .libelle(DEFAULT_LIBELLE)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return langue;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Langue createUpdatedEntity(EntityManager em) {
        Langue langue = new Langue()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelle(UPDATED_LIBELLE)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return langue;
    }

    @BeforeEach
    public void initTest() {
        langue = createEntity(em);
    }

    @Test
    @Transactional
    public void createLangue() throws Exception {
        int databaseSizeBeforeCreate = langueRepository.findAll().size();

        // Create the Langue
        LangueDTO langueDTO = langueMapper.toDto(langue);
        restLangueMockMvc.perform(post("/api/langues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langueDTO)))
            .andExpect(status().isCreated());

        // Validate the Langue in the database
        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeCreate + 1);
        Langue testLangue = langueList.get(langueList.size() - 1);
        assertThat(testLangue.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testLangue.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testLangue.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testLangue.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testLangue.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testLangue.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testLangue.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testLangue.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createLangueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = langueRepository.findAll().size();

        // Create the Langue with an existing ID
        langue.setId(1L);
        LangueDTO langueDTO = langueMapper.toDto(langue);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLangueMockMvc.perform(post("/api/langues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Langue in the database
        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = langueRepository.findAll().size();
        // set the field null
        langue.setTechID(null);

        // Create the Langue, which fails.
        LangueDTO langueDTO = langueMapper.toDto(langue);

        restLangueMockMvc.perform(post("/api/langues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langueDTO)))
            .andExpect(status().isBadRequest());

        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = langueRepository.findAll().size();
        // set the field null
        langue.setRemoteID(null);

        // Create the Langue, which fails.
        LangueDTO langueDTO = langueMapper.toDto(langue);

        restLangueMockMvc.perform(post("/api/langues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langueDTO)))
            .andExpect(status().isBadRequest());

        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = langueRepository.findAll().size();
        // set the field null
        langue.setLibelle(null);

        // Create the Langue, which fails.
        LangueDTO langueDTO = langueMapper.toDto(langue);

        restLangueMockMvc.perform(post("/api/langues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langueDTO)))
            .andExpect(status().isBadRequest());

        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLangues() throws Exception {
        // Initialize the database
        langueRepository.saveAndFlush(langue);

        // Get all the langueList
        restLangueMockMvc.perform(get("/api/langues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(langue.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getLangue() throws Exception {
        // Initialize the database
        langueRepository.saveAndFlush(langue);

        // Get the langue
        restLangueMockMvc.perform(get("/api/langues/{id}", langue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(langue.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLangue() throws Exception {
        // Get the langue
        restLangueMockMvc.perform(get("/api/langues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLangue() throws Exception {
        // Initialize the database
        langueRepository.saveAndFlush(langue);

        int databaseSizeBeforeUpdate = langueRepository.findAll().size();

        // Update the langue
        Langue updatedLangue = langueRepository.findById(langue.getId()).get();
        // Disconnect from session so that the updates on updatedLangue are not directly saved in db
        em.detach(updatedLangue);
        updatedLangue
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelle(UPDATED_LIBELLE)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        LangueDTO langueDTO = langueMapper.toDto(updatedLangue);

        restLangueMockMvc.perform(put("/api/langues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langueDTO)))
            .andExpect(status().isOk());

        // Validate the Langue in the database
        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeUpdate);
        Langue testLangue = langueList.get(langueList.size() - 1);
        assertThat(testLangue.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testLangue.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testLangue.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testLangue.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testLangue.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testLangue.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testLangue.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testLangue.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingLangue() throws Exception {
        int databaseSizeBeforeUpdate = langueRepository.findAll().size();

        // Create the Langue
        LangueDTO langueDTO = langueMapper.toDto(langue);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLangueMockMvc.perform(put("/api/langues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(langueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Langue in the database
        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLangue() throws Exception {
        // Initialize the database
        langueRepository.saveAndFlush(langue);

        int databaseSizeBeforeDelete = langueRepository.findAll().size();

        // Delete the langue
        restLangueMockMvc.perform(delete("/api/langues/{id}", langue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Langue> langueList = langueRepository.findAll();
        assertThat(langueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Langue.class);
        Langue langue1 = new Langue();
        langue1.setId(1L);
        Langue langue2 = new Langue();
        langue2.setId(langue1.getId());
        assertThat(langue1).isEqualTo(langue2);
        langue2.setId(2L);
        assertThat(langue1).isNotEqualTo(langue2);
        langue1.setId(null);
        assertThat(langue1).isNotEqualTo(langue2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LangueDTO.class);
        LangueDTO langueDTO1 = new LangueDTO();
        langueDTO1.setId(1L);
        LangueDTO langueDTO2 = new LangueDTO();
        assertThat(langueDTO1).isNotEqualTo(langueDTO2);
        langueDTO2.setId(langueDTO1.getId());
        assertThat(langueDTO1).isEqualTo(langueDTO2);
        langueDTO2.setId(2L);
        assertThat(langueDTO1).isNotEqualTo(langueDTO2);
        langueDTO1.setId(null);
        assertThat(langueDTO1).isNotEqualTo(langueDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(langueMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(langueMapper.fromId(null)).isNull();
    }
}
