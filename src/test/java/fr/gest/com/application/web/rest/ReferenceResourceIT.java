package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Reference;
import fr.gest.com.application.repository.ReferenceRepository;
import fr.gest.com.application.service.ReferenceService;
import fr.gest.com.application.service.dto.ReferenceDTO;
import fr.gest.com.application.service.mapper.ReferenceMapper;
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
 * Integration tests for the {@Link ReferenceResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class ReferenceResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final String DEFAULT_LIBELLE_REF = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_REF = "BBBBBBBBBB";

    private static final String DEFAULT_VALEUR_REF = "AAAAAAAAAA";
    private static final String UPDATED_VALEUR_REF = "BBBBBBBBBB";

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
    private ReferenceRepository referenceRepository;

    @Autowired
    private ReferenceMapper referenceMapper;

    @Autowired
    private ReferenceService referenceService;

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

    private MockMvc restReferenceMockMvc;

    private Reference reference;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReferenceResource referenceResource = new ReferenceResource(referenceService);
        this.restReferenceMockMvc = MockMvcBuilders.standaloneSetup(referenceResource)
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
    public static Reference createEntity(EntityManager em) {
        Reference reference = new Reference()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .libelleRef(DEFAULT_LIBELLE_REF)
            .valeurRef(DEFAULT_VALEUR_REF)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return reference;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reference createUpdatedEntity(EntityManager em) {
        Reference reference = new Reference()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelleRef(UPDATED_LIBELLE_REF)
            .valeurRef(UPDATED_VALEUR_REF)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return reference;
    }

    @BeforeEach
    public void initTest() {
        reference = createEntity(em);
    }

    @Test
    @Transactional
    public void createReference() throws Exception {
        int databaseSizeBeforeCreate = referenceRepository.findAll().size();

        // Create the Reference
        ReferenceDTO referenceDTO = referenceMapper.toDto(reference);
        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isCreated());

        // Validate the Reference in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeCreate + 1);
        Reference testReference = referenceList.get(referenceList.size() - 1);
        assertThat(testReference.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testReference.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testReference.getLibelleRef()).isEqualTo(DEFAULT_LIBELLE_REF);
        assertThat(testReference.getValeurRef()).isEqualTo(DEFAULT_VALEUR_REF);
        assertThat(testReference.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testReference.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testReference.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testReference.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testReference.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createReferenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = referenceRepository.findAll().size();

        // Create the Reference with an existing ID
        reference.setId(1L);
        ReferenceDTO referenceDTO = referenceMapper.toDto(reference);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reference in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = referenceRepository.findAll().size();
        // set the field null
        reference.setTechID(null);

        // Create the Reference, which fails.
        ReferenceDTO referenceDTO = referenceMapper.toDto(reference);

        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isBadRequest());

        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = referenceRepository.findAll().size();
        // set the field null
        reference.setRemoteID(null);

        // Create the Reference, which fails.
        ReferenceDTO referenceDTO = referenceMapper.toDto(reference);

        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isBadRequest());

        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleRefIsRequired() throws Exception {
        int databaseSizeBeforeTest = referenceRepository.findAll().size();
        // set the field null
        reference.setLibelleRef(null);

        // Create the Reference, which fails.
        ReferenceDTO referenceDTO = referenceMapper.toDto(reference);

        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isBadRequest());

        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValeurRefIsRequired() throws Exception {
        int databaseSizeBeforeTest = referenceRepository.findAll().size();
        // set the field null
        reference.setValeurRef(null);

        // Create the Reference, which fails.
        ReferenceDTO referenceDTO = referenceMapper.toDto(reference);

        restReferenceMockMvc.perform(post("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isBadRequest());

        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReferences() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);

        // Get all the referenceList
        restReferenceMockMvc.perform(get("/api/references?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reference.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].libelleRef").value(hasItem(DEFAULT_LIBELLE_REF.toString())))
            .andExpect(jsonPath("$.[*].valeurRef").value(hasItem(DEFAULT_VALEUR_REF.toString())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getReference() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);

        // Get the reference
        restReferenceMockMvc.perform(get("/api/references/{id}", reference.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reference.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.libelleRef").value(DEFAULT_LIBELLE_REF.toString()))
            .andExpect(jsonPath("$.valeurRef").value(DEFAULT_VALEUR_REF.toString()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReference() throws Exception {
        // Get the reference
        restReferenceMockMvc.perform(get("/api/references/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReference() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);

        int databaseSizeBeforeUpdate = referenceRepository.findAll().size();

        // Update the reference
        Reference updatedReference = referenceRepository.findById(reference.getId()).get();
        // Disconnect from session so that the updates on updatedReference are not directly saved in db
        em.detach(updatedReference);
        updatedReference
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelleRef(UPDATED_LIBELLE_REF)
            .valeurRef(UPDATED_VALEUR_REF)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        ReferenceDTO referenceDTO = referenceMapper.toDto(updatedReference);

        restReferenceMockMvc.perform(put("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isOk());

        // Validate the Reference in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeUpdate);
        Reference testReference = referenceList.get(referenceList.size() - 1);
        assertThat(testReference.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testReference.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testReference.getLibelleRef()).isEqualTo(UPDATED_LIBELLE_REF);
        assertThat(testReference.getValeurRef()).isEqualTo(UPDATED_VALEUR_REF);
        assertThat(testReference.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testReference.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testReference.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testReference.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testReference.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingReference() throws Exception {
        int databaseSizeBeforeUpdate = referenceRepository.findAll().size();

        // Create the Reference
        ReferenceDTO referenceDTO = referenceMapper.toDto(reference);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReferenceMockMvc.perform(put("/api/references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reference in the database
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReference() throws Exception {
        // Initialize the database
        referenceRepository.saveAndFlush(reference);

        int databaseSizeBeforeDelete = referenceRepository.findAll().size();

        // Delete the reference
        restReferenceMockMvc.perform(delete("/api/references/{id}", reference.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reference> referenceList = referenceRepository.findAll();
        assertThat(referenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reference.class);
        Reference reference1 = new Reference();
        reference1.setId(1L);
        Reference reference2 = new Reference();
        reference2.setId(reference1.getId());
        assertThat(reference1).isEqualTo(reference2);
        reference2.setId(2L);
        assertThat(reference1).isNotEqualTo(reference2);
        reference1.setId(null);
        assertThat(reference1).isNotEqualTo(reference2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReferenceDTO.class);
        ReferenceDTO referenceDTO1 = new ReferenceDTO();
        referenceDTO1.setId(1L);
        ReferenceDTO referenceDTO2 = new ReferenceDTO();
        assertThat(referenceDTO1).isNotEqualTo(referenceDTO2);
        referenceDTO2.setId(referenceDTO1.getId());
        assertThat(referenceDTO1).isEqualTo(referenceDTO2);
        referenceDTO2.setId(2L);
        assertThat(referenceDTO1).isNotEqualTo(referenceDTO2);
        referenceDTO1.setId(null);
        assertThat(referenceDTO1).isNotEqualTo(referenceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(referenceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(referenceMapper.fromId(null)).isNull();
    }
}
