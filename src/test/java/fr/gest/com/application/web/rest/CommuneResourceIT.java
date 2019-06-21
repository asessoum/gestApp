package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Commune;
import fr.gest.com.application.repository.CommuneRepository;
import fr.gest.com.application.service.CommuneService;
import fr.gest.com.application.service.dto.CommuneDTO;
import fr.gest.com.application.service.mapper.CommuneMapper;
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
 * Integration tests for the {@Link CommuneResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class CommuneResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final String DEFAULT_NOM_COMMUNE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_COMMUNE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_PROVINCE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_PROVINCE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_REGION = "AAAAAAAAAA";
    private static final String UPDATED_NOM_REGION = "BBBBBBBBBB";

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
    private CommuneRepository communeRepository;

    @Autowired
    private CommuneMapper communeMapper;

    @Autowired
    private CommuneService communeService;

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

    private MockMvc restCommuneMockMvc;

    private Commune commune;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommuneResource communeResource = new CommuneResource(communeService);
        this.restCommuneMockMvc = MockMvcBuilders.standaloneSetup(communeResource)
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
    public static Commune createEntity(EntityManager em) {
        Commune commune = new Commune()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .nomCommune(DEFAULT_NOM_COMMUNE)
            .nomProvince(DEFAULT_NOM_PROVINCE)
            .nomRegion(DEFAULT_NOM_REGION)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return commune;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commune createUpdatedEntity(EntityManager em) {
        Commune commune = new Commune()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .nomCommune(UPDATED_NOM_COMMUNE)
            .nomProvince(UPDATED_NOM_PROVINCE)
            .nomRegion(UPDATED_NOM_REGION)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return commune;
    }

    @BeforeEach
    public void initTest() {
        commune = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommune() throws Exception {
        int databaseSizeBeforeCreate = communeRepository.findAll().size();

        // Create the Commune
        CommuneDTO communeDTO = communeMapper.toDto(commune);
        restCommuneMockMvc.perform(post("/api/communes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communeDTO)))
            .andExpect(status().isCreated());

        // Validate the Commune in the database
        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeCreate + 1);
        Commune testCommune = communeList.get(communeList.size() - 1);
        assertThat(testCommune.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testCommune.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testCommune.getNomCommune()).isEqualTo(DEFAULT_NOM_COMMUNE);
        assertThat(testCommune.getNomProvince()).isEqualTo(DEFAULT_NOM_PROVINCE);
        assertThat(testCommune.getNomRegion()).isEqualTo(DEFAULT_NOM_REGION);
        assertThat(testCommune.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testCommune.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testCommune.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testCommune.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testCommune.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createCommuneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = communeRepository.findAll().size();

        // Create the Commune with an existing ID
        commune.setId(1L);
        CommuneDTO communeDTO = communeMapper.toDto(commune);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommuneMockMvc.perform(post("/api/communes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Commune in the database
        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = communeRepository.findAll().size();
        // set the field null
        commune.setTechID(null);

        // Create the Commune, which fails.
        CommuneDTO communeDTO = communeMapper.toDto(commune);

        restCommuneMockMvc.perform(post("/api/communes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communeDTO)))
            .andExpect(status().isBadRequest());

        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = communeRepository.findAll().size();
        // set the field null
        commune.setRemoteID(null);

        // Create the Commune, which fails.
        CommuneDTO communeDTO = communeMapper.toDto(commune);

        restCommuneMockMvc.perform(post("/api/communes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communeDTO)))
            .andExpect(status().isBadRequest());

        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomCommuneIsRequired() throws Exception {
        int databaseSizeBeforeTest = communeRepository.findAll().size();
        // set the field null
        commune.setNomCommune(null);

        // Create the Commune, which fails.
        CommuneDTO communeDTO = communeMapper.toDto(commune);

        restCommuneMockMvc.perform(post("/api/communes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communeDTO)))
            .andExpect(status().isBadRequest());

        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommunes() throws Exception {
        // Initialize the database
        communeRepository.saveAndFlush(commune);

        // Get all the communeList
        restCommuneMockMvc.perform(get("/api/communes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commune.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].nomCommune").value(hasItem(DEFAULT_NOM_COMMUNE.toString())))
            .andExpect(jsonPath("$.[*].nomProvince").value(hasItem(DEFAULT_NOM_PROVINCE.toString())))
            .andExpect(jsonPath("$.[*].nomRegion").value(hasItem(DEFAULT_NOM_REGION.toString())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getCommune() throws Exception {
        // Initialize the database
        communeRepository.saveAndFlush(commune);

        // Get the commune
        restCommuneMockMvc.perform(get("/api/communes/{id}", commune.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commune.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.nomCommune").value(DEFAULT_NOM_COMMUNE.toString()))
            .andExpect(jsonPath("$.nomProvince").value(DEFAULT_NOM_PROVINCE.toString()))
            .andExpect(jsonPath("$.nomRegion").value(DEFAULT_NOM_REGION.toString()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCommune() throws Exception {
        // Get the commune
        restCommuneMockMvc.perform(get("/api/communes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommune() throws Exception {
        // Initialize the database
        communeRepository.saveAndFlush(commune);

        int databaseSizeBeforeUpdate = communeRepository.findAll().size();

        // Update the commune
        Commune updatedCommune = communeRepository.findById(commune.getId()).get();
        // Disconnect from session so that the updates on updatedCommune are not directly saved in db
        em.detach(updatedCommune);
        updatedCommune
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .nomCommune(UPDATED_NOM_COMMUNE)
            .nomProvince(UPDATED_NOM_PROVINCE)
            .nomRegion(UPDATED_NOM_REGION)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        CommuneDTO communeDTO = communeMapper.toDto(updatedCommune);

        restCommuneMockMvc.perform(put("/api/communes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communeDTO)))
            .andExpect(status().isOk());

        // Validate the Commune in the database
        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeUpdate);
        Commune testCommune = communeList.get(communeList.size() - 1);
        assertThat(testCommune.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testCommune.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testCommune.getNomCommune()).isEqualTo(UPDATED_NOM_COMMUNE);
        assertThat(testCommune.getNomProvince()).isEqualTo(UPDATED_NOM_PROVINCE);
        assertThat(testCommune.getNomRegion()).isEqualTo(UPDATED_NOM_REGION);
        assertThat(testCommune.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testCommune.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testCommune.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testCommune.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testCommune.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingCommune() throws Exception {
        int databaseSizeBeforeUpdate = communeRepository.findAll().size();

        // Create the Commune
        CommuneDTO communeDTO = communeMapper.toDto(commune);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommuneMockMvc.perform(put("/api/communes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(communeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Commune in the database
        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommune() throws Exception {
        // Initialize the database
        communeRepository.saveAndFlush(commune);

        int databaseSizeBeforeDelete = communeRepository.findAll().size();

        // Delete the commune
        restCommuneMockMvc.perform(delete("/api/communes/{id}", commune.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commune> communeList = communeRepository.findAll();
        assertThat(communeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commune.class);
        Commune commune1 = new Commune();
        commune1.setId(1L);
        Commune commune2 = new Commune();
        commune2.setId(commune1.getId());
        assertThat(commune1).isEqualTo(commune2);
        commune2.setId(2L);
        assertThat(commune1).isNotEqualTo(commune2);
        commune1.setId(null);
        assertThat(commune1).isNotEqualTo(commune2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommuneDTO.class);
        CommuneDTO communeDTO1 = new CommuneDTO();
        communeDTO1.setId(1L);
        CommuneDTO communeDTO2 = new CommuneDTO();
        assertThat(communeDTO1).isNotEqualTo(communeDTO2);
        communeDTO2.setId(communeDTO1.getId());
        assertThat(communeDTO1).isEqualTo(communeDTO2);
        communeDTO2.setId(2L);
        assertThat(communeDTO1).isNotEqualTo(communeDTO2);
        communeDTO1.setId(null);
        assertThat(communeDTO1).isNotEqualTo(communeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(communeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(communeMapper.fromId(null)).isNull();
    }
}
