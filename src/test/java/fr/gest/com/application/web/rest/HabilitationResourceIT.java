package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Habilitation;
import fr.gest.com.application.repository.HabilitationRepository;
import fr.gest.com.application.service.HabilitationService;
import fr.gest.com.application.service.dto.HabilitationDTO;
import fr.gest.com.application.service.mapper.HabilitationMapper;
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
import java.util.List;

import static fr.gest.com.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link HabilitationResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class HabilitationResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final String DEFAULT_PROFILE = "AAAAAAAAAA";
    private static final String UPDATED_PROFILE = "BBBBBBBBBB";

    private static final String DEFAULT_RESSOURCE = "AAAAAAAAAA";
    private static final String UPDATED_RESSOURCE = "BBBBBBBBBB";

    private static final String DEFAULT_PERMISSION = "AAAAAAAAAA";
    private static final String UPDATED_PERMISSION = "BBBBBBBBBB";

    private static final String DEFAULT_ACCES = "AA";
    private static final String UPDATED_ACCES = "BB";

    @Autowired
    private HabilitationRepository habilitationRepository;

    @Autowired
    private HabilitationMapper habilitationMapper;

    @Autowired
    private HabilitationService habilitationService;

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

    private MockMvc restHabilitationMockMvc;

    private Habilitation habilitation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HabilitationResource habilitationResource = new HabilitationResource(habilitationService);
        this.restHabilitationMockMvc = MockMvcBuilders.standaloneSetup(habilitationResource)
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
    public static Habilitation createEntity(EntityManager em) {
        Habilitation habilitation = new Habilitation()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .profile(DEFAULT_PROFILE)
            .ressource(DEFAULT_RESSOURCE)
            .permission(DEFAULT_PERMISSION)
            .acces(DEFAULT_ACCES);
        return habilitation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Habilitation createUpdatedEntity(EntityManager em) {
        Habilitation habilitation = new Habilitation()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .profile(UPDATED_PROFILE)
            .ressource(UPDATED_RESSOURCE)
            .permission(UPDATED_PERMISSION)
            .acces(UPDATED_ACCES);
        return habilitation;
    }

    @BeforeEach
    public void initTest() {
        habilitation = createEntity(em);
    }

    @Test
    @Transactional
    public void createHabilitation() throws Exception {
        int databaseSizeBeforeCreate = habilitationRepository.findAll().size();

        // Create the Habilitation
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);
        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isCreated());

        // Validate the Habilitation in the database
        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeCreate + 1);
        Habilitation testHabilitation = habilitationList.get(habilitationList.size() - 1);
        assertThat(testHabilitation.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testHabilitation.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testHabilitation.getProfile()).isEqualTo(DEFAULT_PROFILE);
        assertThat(testHabilitation.getRessource()).isEqualTo(DEFAULT_RESSOURCE);
        assertThat(testHabilitation.getPermission()).isEqualTo(DEFAULT_PERMISSION);
        assertThat(testHabilitation.getAcces()).isEqualTo(DEFAULT_ACCES);
    }

    @Test
    @Transactional
    public void createHabilitationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = habilitationRepository.findAll().size();

        // Create the Habilitation with an existing ID
        habilitation.setId(1L);
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Habilitation in the database
        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = habilitationRepository.findAll().size();
        // set the field null
        habilitation.setTechID(null);

        // Create the Habilitation, which fails.
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = habilitationRepository.findAll().size();
        // set the field null
        habilitation.setRemoteID(null);

        // Create the Habilitation, which fails.
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProfileIsRequired() throws Exception {
        int databaseSizeBeforeTest = habilitationRepository.findAll().size();
        // set the field null
        habilitation.setProfile(null);

        // Create the Habilitation, which fails.
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRessourceIsRequired() throws Exception {
        int databaseSizeBeforeTest = habilitationRepository.findAll().size();
        // set the field null
        habilitation.setRessource(null);

        // Create the Habilitation, which fails.
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPermissionIsRequired() throws Exception {
        int databaseSizeBeforeTest = habilitationRepository.findAll().size();
        // set the field null
        habilitation.setPermission(null);

        // Create the Habilitation, which fails.
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAccesIsRequired() throws Exception {
        int databaseSizeBeforeTest = habilitationRepository.findAll().size();
        // set the field null
        habilitation.setAcces(null);

        // Create the Habilitation, which fails.
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        restHabilitationMockMvc.perform(post("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHabilitations() throws Exception {
        // Initialize the database
        habilitationRepository.saveAndFlush(habilitation);

        // Get all the habilitationList
        restHabilitationMockMvc.perform(get("/api/habilitations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(habilitation.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].profile").value(hasItem(DEFAULT_PROFILE.toString())))
            .andExpect(jsonPath("$.[*].ressource").value(hasItem(DEFAULT_RESSOURCE.toString())))
            .andExpect(jsonPath("$.[*].permission").value(hasItem(DEFAULT_PERMISSION.toString())))
            .andExpect(jsonPath("$.[*].acces").value(hasItem(DEFAULT_ACCES.toString())));
    }
    
    @Test
    @Transactional
    public void getHabilitation() throws Exception {
        // Initialize the database
        habilitationRepository.saveAndFlush(habilitation);

        // Get the habilitation
        restHabilitationMockMvc.perform(get("/api/habilitations/{id}", habilitation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(habilitation.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.profile").value(DEFAULT_PROFILE.toString()))
            .andExpect(jsonPath("$.ressource").value(DEFAULT_RESSOURCE.toString()))
            .andExpect(jsonPath("$.permission").value(DEFAULT_PERMISSION.toString()))
            .andExpect(jsonPath("$.acces").value(DEFAULT_ACCES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHabilitation() throws Exception {
        // Get the habilitation
        restHabilitationMockMvc.perform(get("/api/habilitations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHabilitation() throws Exception {
        // Initialize the database
        habilitationRepository.saveAndFlush(habilitation);

        int databaseSizeBeforeUpdate = habilitationRepository.findAll().size();

        // Update the habilitation
        Habilitation updatedHabilitation = habilitationRepository.findById(habilitation.getId()).get();
        // Disconnect from session so that the updates on updatedHabilitation are not directly saved in db
        em.detach(updatedHabilitation);
        updatedHabilitation
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .profile(UPDATED_PROFILE)
            .ressource(UPDATED_RESSOURCE)
            .permission(UPDATED_PERMISSION)
            .acces(UPDATED_ACCES);
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(updatedHabilitation);

        restHabilitationMockMvc.perform(put("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isOk());

        // Validate the Habilitation in the database
        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeUpdate);
        Habilitation testHabilitation = habilitationList.get(habilitationList.size() - 1);
        assertThat(testHabilitation.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testHabilitation.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testHabilitation.getProfile()).isEqualTo(UPDATED_PROFILE);
        assertThat(testHabilitation.getRessource()).isEqualTo(UPDATED_RESSOURCE);
        assertThat(testHabilitation.getPermission()).isEqualTo(UPDATED_PERMISSION);
        assertThat(testHabilitation.getAcces()).isEqualTo(UPDATED_ACCES);
    }

    @Test
    @Transactional
    public void updateNonExistingHabilitation() throws Exception {
        int databaseSizeBeforeUpdate = habilitationRepository.findAll().size();

        // Create the Habilitation
        HabilitationDTO habilitationDTO = habilitationMapper.toDto(habilitation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHabilitationMockMvc.perform(put("/api/habilitations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(habilitationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Habilitation in the database
        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHabilitation() throws Exception {
        // Initialize the database
        habilitationRepository.saveAndFlush(habilitation);

        int databaseSizeBeforeDelete = habilitationRepository.findAll().size();

        // Delete the habilitation
        restHabilitationMockMvc.perform(delete("/api/habilitations/{id}", habilitation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Habilitation> habilitationList = habilitationRepository.findAll();
        assertThat(habilitationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Habilitation.class);
        Habilitation habilitation1 = new Habilitation();
        habilitation1.setId(1L);
        Habilitation habilitation2 = new Habilitation();
        habilitation2.setId(habilitation1.getId());
        assertThat(habilitation1).isEqualTo(habilitation2);
        habilitation2.setId(2L);
        assertThat(habilitation1).isNotEqualTo(habilitation2);
        habilitation1.setId(null);
        assertThat(habilitation1).isNotEqualTo(habilitation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HabilitationDTO.class);
        HabilitationDTO habilitationDTO1 = new HabilitationDTO();
        habilitationDTO1.setId(1L);
        HabilitationDTO habilitationDTO2 = new HabilitationDTO();
        assertThat(habilitationDTO1).isNotEqualTo(habilitationDTO2);
        habilitationDTO2.setId(habilitationDTO1.getId());
        assertThat(habilitationDTO1).isEqualTo(habilitationDTO2);
        habilitationDTO2.setId(2L);
        assertThat(habilitationDTO1).isNotEqualTo(habilitationDTO2);
        habilitationDTO1.setId(null);
        assertThat(habilitationDTO1).isNotEqualTo(habilitationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(habilitationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(habilitationMapper.fromId(null)).isNull();
    }
}
