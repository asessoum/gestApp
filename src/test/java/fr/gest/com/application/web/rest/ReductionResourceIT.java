package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Reduction;
import fr.gest.com.application.repository.ReductionRepository;
import fr.gest.com.application.service.ReductionService;
import fr.gest.com.application.service.dto.ReductionDTO;
import fr.gest.com.application.service.mapper.ReductionMapper;
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

import fr.gest.com.application.domain.enumeration.TypeReduction;
/**
 * Integration tests for the {@Link ReductionResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class ReductionResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final TypeReduction DEFAULT_TYPE_REDUCTION = TypeReduction.POURCENTAGE;
    private static final TypeReduction UPDATED_TYPE_REDUCTION = TypeReduction.PRIX;

    private static final Double DEFAULT_VALEUR_REDUCTION = 1D;
    private static final Double UPDATED_VALEUR_REDUCTION = 2D;

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
    private ReductionRepository reductionRepository;

    @Autowired
    private ReductionMapper reductionMapper;

    @Autowired
    private ReductionService reductionService;

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

    private MockMvc restReductionMockMvc;

    private Reduction reduction;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReductionResource reductionResource = new ReductionResource(reductionService);
        this.restReductionMockMvc = MockMvcBuilders.standaloneSetup(reductionResource)
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
    public static Reduction createEntity(EntityManager em) {
        Reduction reduction = new Reduction()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .libelle(DEFAULT_LIBELLE)
            .typeReduction(DEFAULT_TYPE_REDUCTION)
            .valeurReduction(DEFAULT_VALEUR_REDUCTION)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return reduction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reduction createUpdatedEntity(EntityManager em) {
        Reduction reduction = new Reduction()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelle(UPDATED_LIBELLE)
            .typeReduction(UPDATED_TYPE_REDUCTION)
            .valeurReduction(UPDATED_VALEUR_REDUCTION)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return reduction;
    }

    @BeforeEach
    public void initTest() {
        reduction = createEntity(em);
    }

    @Test
    @Transactional
    public void createReduction() throws Exception {
        int databaseSizeBeforeCreate = reductionRepository.findAll().size();

        // Create the Reduction
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);
        restReductionMockMvc.perform(post("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isCreated());

        // Validate the Reduction in the database
        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeCreate + 1);
        Reduction testReduction = reductionList.get(reductionList.size() - 1);
        assertThat(testReduction.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testReduction.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testReduction.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testReduction.getTypeReduction()).isEqualTo(DEFAULT_TYPE_REDUCTION);
        assertThat(testReduction.getValeurReduction()).isEqualTo(DEFAULT_VALEUR_REDUCTION);
        assertThat(testReduction.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testReduction.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testReduction.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testReduction.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testReduction.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createReductionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reductionRepository.findAll().size();

        // Create the Reduction with an existing ID
        reduction.setId(1L);
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReductionMockMvc.perform(post("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reduction in the database
        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = reductionRepository.findAll().size();
        // set the field null
        reduction.setTechID(null);

        // Create the Reduction, which fails.
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);

        restReductionMockMvc.perform(post("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isBadRequest());

        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = reductionRepository.findAll().size();
        // set the field null
        reduction.setRemoteID(null);

        // Create the Reduction, which fails.
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);

        restReductionMockMvc.perform(post("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isBadRequest());

        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = reductionRepository.findAll().size();
        // set the field null
        reduction.setLibelle(null);

        // Create the Reduction, which fails.
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);

        restReductionMockMvc.perform(post("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isBadRequest());

        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeReductionIsRequired() throws Exception {
        int databaseSizeBeforeTest = reductionRepository.findAll().size();
        // set the field null
        reduction.setTypeReduction(null);

        // Create the Reduction, which fails.
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);

        restReductionMockMvc.perform(post("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isBadRequest());

        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValeurReductionIsRequired() throws Exception {
        int databaseSizeBeforeTest = reductionRepository.findAll().size();
        // set the field null
        reduction.setValeurReduction(null);

        // Create the Reduction, which fails.
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);

        restReductionMockMvc.perform(post("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isBadRequest());

        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReductions() throws Exception {
        // Initialize the database
        reductionRepository.saveAndFlush(reduction);

        // Get all the reductionList
        restReductionMockMvc.perform(get("/api/reductions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reduction.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].typeReduction").value(hasItem(DEFAULT_TYPE_REDUCTION.toString())))
            .andExpect(jsonPath("$.[*].valeurReduction").value(hasItem(DEFAULT_VALEUR_REDUCTION.doubleValue())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getReduction() throws Exception {
        // Initialize the database
        reductionRepository.saveAndFlush(reduction);

        // Get the reduction
        restReductionMockMvc.perform(get("/api/reductions/{id}", reduction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reduction.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.typeReduction").value(DEFAULT_TYPE_REDUCTION.toString()))
            .andExpect(jsonPath("$.valeurReduction").value(DEFAULT_VALEUR_REDUCTION.doubleValue()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReduction() throws Exception {
        // Get the reduction
        restReductionMockMvc.perform(get("/api/reductions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReduction() throws Exception {
        // Initialize the database
        reductionRepository.saveAndFlush(reduction);

        int databaseSizeBeforeUpdate = reductionRepository.findAll().size();

        // Update the reduction
        Reduction updatedReduction = reductionRepository.findById(reduction.getId()).get();
        // Disconnect from session so that the updates on updatedReduction are not directly saved in db
        em.detach(updatedReduction);
        updatedReduction
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelle(UPDATED_LIBELLE)
            .typeReduction(UPDATED_TYPE_REDUCTION)
            .valeurReduction(UPDATED_VALEUR_REDUCTION)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        ReductionDTO reductionDTO = reductionMapper.toDto(updatedReduction);

        restReductionMockMvc.perform(put("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isOk());

        // Validate the Reduction in the database
        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeUpdate);
        Reduction testReduction = reductionList.get(reductionList.size() - 1);
        assertThat(testReduction.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testReduction.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testReduction.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testReduction.getTypeReduction()).isEqualTo(UPDATED_TYPE_REDUCTION);
        assertThat(testReduction.getValeurReduction()).isEqualTo(UPDATED_VALEUR_REDUCTION);
        assertThat(testReduction.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testReduction.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testReduction.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testReduction.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testReduction.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingReduction() throws Exception {
        int databaseSizeBeforeUpdate = reductionRepository.findAll().size();

        // Create the Reduction
        ReductionDTO reductionDTO = reductionMapper.toDto(reduction);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReductionMockMvc.perform(put("/api/reductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reductionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reduction in the database
        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReduction() throws Exception {
        // Initialize the database
        reductionRepository.saveAndFlush(reduction);

        int databaseSizeBeforeDelete = reductionRepository.findAll().size();

        // Delete the reduction
        restReductionMockMvc.perform(delete("/api/reductions/{id}", reduction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reduction> reductionList = reductionRepository.findAll();
        assertThat(reductionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reduction.class);
        Reduction reduction1 = new Reduction();
        reduction1.setId(1L);
        Reduction reduction2 = new Reduction();
        reduction2.setId(reduction1.getId());
        assertThat(reduction1).isEqualTo(reduction2);
        reduction2.setId(2L);
        assertThat(reduction1).isNotEqualTo(reduction2);
        reduction1.setId(null);
        assertThat(reduction1).isNotEqualTo(reduction2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReductionDTO.class);
        ReductionDTO reductionDTO1 = new ReductionDTO();
        reductionDTO1.setId(1L);
        ReductionDTO reductionDTO2 = new ReductionDTO();
        assertThat(reductionDTO1).isNotEqualTo(reductionDTO2);
        reductionDTO2.setId(reductionDTO1.getId());
        assertThat(reductionDTO1).isEqualTo(reductionDTO2);
        reductionDTO2.setId(2L);
        assertThat(reductionDTO1).isNotEqualTo(reductionDTO2);
        reductionDTO1.setId(null);
        assertThat(reductionDTO1).isNotEqualTo(reductionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(reductionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(reductionMapper.fromId(null)).isNull();
    }
}
