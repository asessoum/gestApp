package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.UtiProfile;
import fr.gest.com.application.repository.UtiProfileRepository;
import fr.gest.com.application.service.UtiProfileService;
import fr.gest.com.application.service.dto.UtiProfileDTO;
import fr.gest.com.application.service.mapper.UtiProfileMapper;
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
 * Integration tests for the {@Link UtiProfileResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class UtiProfileResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

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
    private UtiProfileRepository utiProfileRepository;

    @Autowired
    private UtiProfileMapper utiProfileMapper;

    @Autowired
    private UtiProfileService utiProfileService;

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

    private MockMvc restUtiProfileMockMvc;

    private UtiProfile utiProfile;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UtiProfileResource utiProfileResource = new UtiProfileResource(utiProfileService);
        this.restUtiProfileMockMvc = MockMvcBuilders.standaloneSetup(utiProfileResource)
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
    public static UtiProfile createEntity(EntityManager em) {
        UtiProfile utiProfile = new UtiProfile()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return utiProfile;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UtiProfile createUpdatedEntity(EntityManager em) {
        UtiProfile utiProfile = new UtiProfile()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return utiProfile;
    }

    @BeforeEach
    public void initTest() {
        utiProfile = createEntity(em);
    }

    @Test
    @Transactional
    public void createUtiProfile() throws Exception {
        int databaseSizeBeforeCreate = utiProfileRepository.findAll().size();

        // Create the UtiProfile
        UtiProfileDTO utiProfileDTO = utiProfileMapper.toDto(utiProfile);
        restUtiProfileMockMvc.perform(post("/api/uti-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utiProfileDTO)))
            .andExpect(status().isCreated());

        // Validate the UtiProfile in the database
        List<UtiProfile> utiProfileList = utiProfileRepository.findAll();
        assertThat(utiProfileList).hasSize(databaseSizeBeforeCreate + 1);
        UtiProfile testUtiProfile = utiProfileList.get(utiProfileList.size() - 1);
        assertThat(testUtiProfile.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testUtiProfile.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testUtiProfile.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testUtiProfile.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testUtiProfile.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testUtiProfile.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testUtiProfile.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createUtiProfileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = utiProfileRepository.findAll().size();

        // Create the UtiProfile with an existing ID
        utiProfile.setId(1L);
        UtiProfileDTO utiProfileDTO = utiProfileMapper.toDto(utiProfile);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUtiProfileMockMvc.perform(post("/api/uti-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utiProfileDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UtiProfile in the database
        List<UtiProfile> utiProfileList = utiProfileRepository.findAll();
        assertThat(utiProfileList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = utiProfileRepository.findAll().size();
        // set the field null
        utiProfile.setTechID(null);

        // Create the UtiProfile, which fails.
        UtiProfileDTO utiProfileDTO = utiProfileMapper.toDto(utiProfile);

        restUtiProfileMockMvc.perform(post("/api/uti-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utiProfileDTO)))
            .andExpect(status().isBadRequest());

        List<UtiProfile> utiProfileList = utiProfileRepository.findAll();
        assertThat(utiProfileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = utiProfileRepository.findAll().size();
        // set the field null
        utiProfile.setRemoteID(null);

        // Create the UtiProfile, which fails.
        UtiProfileDTO utiProfileDTO = utiProfileMapper.toDto(utiProfile);

        restUtiProfileMockMvc.perform(post("/api/uti-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utiProfileDTO)))
            .andExpect(status().isBadRequest());

        List<UtiProfile> utiProfileList = utiProfileRepository.findAll();
        assertThat(utiProfileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUtiProfiles() throws Exception {
        // Initialize the database
        utiProfileRepository.saveAndFlush(utiProfile);

        // Get all the utiProfileList
        restUtiProfileMockMvc.perform(get("/api/uti-profiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utiProfile.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getUtiProfile() throws Exception {
        // Initialize the database
        utiProfileRepository.saveAndFlush(utiProfile);

        // Get the utiProfile
        restUtiProfileMockMvc.perform(get("/api/uti-profiles/{id}", utiProfile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(utiProfile.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUtiProfile() throws Exception {
        // Get the utiProfile
        restUtiProfileMockMvc.perform(get("/api/uti-profiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUtiProfile() throws Exception {
        // Initialize the database
        utiProfileRepository.saveAndFlush(utiProfile);

        int databaseSizeBeforeUpdate = utiProfileRepository.findAll().size();

        // Update the utiProfile
        UtiProfile updatedUtiProfile = utiProfileRepository.findById(utiProfile.getId()).get();
        // Disconnect from session so that the updates on updatedUtiProfile are not directly saved in db
        em.detach(updatedUtiProfile);
        updatedUtiProfile
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        UtiProfileDTO utiProfileDTO = utiProfileMapper.toDto(updatedUtiProfile);

        restUtiProfileMockMvc.perform(put("/api/uti-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utiProfileDTO)))
            .andExpect(status().isOk());

        // Validate the UtiProfile in the database
        List<UtiProfile> utiProfileList = utiProfileRepository.findAll();
        assertThat(utiProfileList).hasSize(databaseSizeBeforeUpdate);
        UtiProfile testUtiProfile = utiProfileList.get(utiProfileList.size() - 1);
        assertThat(testUtiProfile.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testUtiProfile.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testUtiProfile.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testUtiProfile.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testUtiProfile.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testUtiProfile.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testUtiProfile.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingUtiProfile() throws Exception {
        int databaseSizeBeforeUpdate = utiProfileRepository.findAll().size();

        // Create the UtiProfile
        UtiProfileDTO utiProfileDTO = utiProfileMapper.toDto(utiProfile);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUtiProfileMockMvc.perform(put("/api/uti-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utiProfileDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UtiProfile in the database
        List<UtiProfile> utiProfileList = utiProfileRepository.findAll();
        assertThat(utiProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUtiProfile() throws Exception {
        // Initialize the database
        utiProfileRepository.saveAndFlush(utiProfile);

        int databaseSizeBeforeDelete = utiProfileRepository.findAll().size();

        // Delete the utiProfile
        restUtiProfileMockMvc.perform(delete("/api/uti-profiles/{id}", utiProfile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UtiProfile> utiProfileList = utiProfileRepository.findAll();
        assertThat(utiProfileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UtiProfile.class);
        UtiProfile utiProfile1 = new UtiProfile();
        utiProfile1.setId(1L);
        UtiProfile utiProfile2 = new UtiProfile();
        utiProfile2.setId(utiProfile1.getId());
        assertThat(utiProfile1).isEqualTo(utiProfile2);
        utiProfile2.setId(2L);
        assertThat(utiProfile1).isNotEqualTo(utiProfile2);
        utiProfile1.setId(null);
        assertThat(utiProfile1).isNotEqualTo(utiProfile2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UtiProfileDTO.class);
        UtiProfileDTO utiProfileDTO1 = new UtiProfileDTO();
        utiProfileDTO1.setId(1L);
        UtiProfileDTO utiProfileDTO2 = new UtiProfileDTO();
        assertThat(utiProfileDTO1).isNotEqualTo(utiProfileDTO2);
        utiProfileDTO2.setId(utiProfileDTO1.getId());
        assertThat(utiProfileDTO1).isEqualTo(utiProfileDTO2);
        utiProfileDTO2.setId(2L);
        assertThat(utiProfileDTO1).isNotEqualTo(utiProfileDTO2);
        utiProfileDTO1.setId(null);
        assertThat(utiProfileDTO1).isNotEqualTo(utiProfileDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(utiProfileMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(utiProfileMapper.fromId(null)).isNull();
    }
}
