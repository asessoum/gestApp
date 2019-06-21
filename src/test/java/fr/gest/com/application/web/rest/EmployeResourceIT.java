package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Employe;
import fr.gest.com.application.repository.EmployeRepository;
import fr.gest.com.application.service.EmployeService;
import fr.gest.com.application.service.dto.EmployeDTO;
import fr.gest.com.application.service.mapper.EmployeMapper;
import fr.gest.com.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;

import static fr.gest.com.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.gest.com.application.domain.enumeration.Genre;
/**
 * Integration tests for the {@Link EmployeResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class EmployeResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final Genre DEFAULT_GENRE = Genre.HOMME;
    private static final Genre UPDATED_GENRE = Genre.FEMME;

    private static final String DEFAULT_NUM_CARTE_UTI = "AAAAAAAAAA";
    private static final String UPDATED_NUM_CARTE_UTI = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_CARTE_UTI = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CARTE_UTI = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PHOTO_ID = "AAAAAAAAAA";
    private static final String UPDATED_PHOTO_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

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
    private EmployeRepository employeRepository;

    @Mock
    private EmployeRepository employeRepositoryMock;

    @Autowired
    private EmployeMapper employeMapper;

    @Mock
    private EmployeService employeServiceMock;

    @Autowired
    private EmployeService employeService;

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

    private MockMvc restEmployeMockMvc;

    private Employe employe;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeResource employeResource = new EmployeResource(employeService);
        this.restEmployeMockMvc = MockMvcBuilders.standaloneSetup(employeResource)
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
    public static Employe createEntity(EntityManager em) {
        Employe employe = new Employe()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .genre(DEFAULT_GENRE)
            .numCarteUti(DEFAULT_NUM_CARTE_UTI)
            .dateCarteUti(DEFAULT_DATE_CARTE_UTI)
            .photoID(DEFAULT_PHOTO_ID)
            .description(DEFAULT_DESCRIPTION)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return employe;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Employe createUpdatedEntity(EntityManager em) {
        Employe employe = new Employe()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .genre(UPDATED_GENRE)
            .numCarteUti(UPDATED_NUM_CARTE_UTI)
            .dateCarteUti(UPDATED_DATE_CARTE_UTI)
            .photoID(UPDATED_PHOTO_ID)
            .description(UPDATED_DESCRIPTION)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return employe;
    }

    @BeforeEach
    public void initTest() {
        employe = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmploye() throws Exception {
        int databaseSizeBeforeCreate = employeRepository.findAll().size();

        // Create the Employe
        EmployeDTO employeDTO = employeMapper.toDto(employe);
        restEmployeMockMvc.perform(post("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isCreated());

        // Validate the Employe in the database
        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeCreate + 1);
        Employe testEmploye = employeList.get(employeList.size() - 1);
        assertThat(testEmploye.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testEmploye.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testEmploye.getGenre()).isEqualTo(DEFAULT_GENRE);
        assertThat(testEmploye.getNumCarteUti()).isEqualTo(DEFAULT_NUM_CARTE_UTI);
        assertThat(testEmploye.getDateCarteUti()).isEqualTo(DEFAULT_DATE_CARTE_UTI);
        assertThat(testEmploye.getPhotoID()).isEqualTo(DEFAULT_PHOTO_ID);
        assertThat(testEmploye.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmploye.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testEmploye.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testEmploye.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testEmploye.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testEmploye.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createEmployeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeRepository.findAll().size();

        // Create the Employe with an existing ID
        employe.setId(1L);
        EmployeDTO employeDTO = employeMapper.toDto(employe);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeMockMvc.perform(post("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Employe in the database
        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeRepository.findAll().size();
        // set the field null
        employe.setTechID(null);

        // Create the Employe, which fails.
        EmployeDTO employeDTO = employeMapper.toDto(employe);

        restEmployeMockMvc.perform(post("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isBadRequest());

        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeRepository.findAll().size();
        // set the field null
        employe.setRemoteID(null);

        // Create the Employe, which fails.
        EmployeDTO employeDTO = employeMapper.toDto(employe);

        restEmployeMockMvc.perform(post("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isBadRequest());

        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenreIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeRepository.findAll().size();
        // set the field null
        employe.setGenre(null);

        // Create the Employe, which fails.
        EmployeDTO employeDTO = employeMapper.toDto(employe);

        restEmployeMockMvc.perform(post("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isBadRequest());

        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumCarteUtiIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeRepository.findAll().size();
        // set the field null
        employe.setNumCarteUti(null);

        // Create the Employe, which fails.
        EmployeDTO employeDTO = employeMapper.toDto(employe);

        restEmployeMockMvc.perform(post("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isBadRequest());

        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmployes() throws Exception {
        // Initialize the database
        employeRepository.saveAndFlush(employe);

        // Get all the employeList
        restEmployeMockMvc.perform(get("/api/employes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employe.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE.toString())))
            .andExpect(jsonPath("$.[*].numCarteUti").value(hasItem(DEFAULT_NUM_CARTE_UTI.toString())))
            .andExpect(jsonPath("$.[*].dateCarteUti").value(hasItem(DEFAULT_DATE_CARTE_UTI.toString())))
            .andExpect(jsonPath("$.[*].photoID").value(hasItem(DEFAULT_PHOTO_ID.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEmployesWithEagerRelationshipsIsEnabled() throws Exception {
        EmployeResource employeResource = new EmployeResource(employeServiceMock);
        when(employeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEmployeMockMvc = MockMvcBuilders.standaloneSetup(employeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEmployeMockMvc.perform(get("/api/employes?eagerload=true"))
        .andExpect(status().isOk());

        verify(employeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEmployesWithEagerRelationshipsIsNotEnabled() throws Exception {
        EmployeResource employeResource = new EmployeResource(employeServiceMock);
            when(employeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEmployeMockMvc = MockMvcBuilders.standaloneSetup(employeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEmployeMockMvc.perform(get("/api/employes?eagerload=true"))
        .andExpect(status().isOk());

            verify(employeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEmploye() throws Exception {
        // Initialize the database
        employeRepository.saveAndFlush(employe);

        // Get the employe
        restEmployeMockMvc.perform(get("/api/employes/{id}", employe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employe.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.genre").value(DEFAULT_GENRE.toString()))
            .andExpect(jsonPath("$.numCarteUti").value(DEFAULT_NUM_CARTE_UTI.toString()))
            .andExpect(jsonPath("$.dateCarteUti").value(DEFAULT_DATE_CARTE_UTI.toString()))
            .andExpect(jsonPath("$.photoID").value(DEFAULT_PHOTO_ID.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmploye() throws Exception {
        // Get the employe
        restEmployeMockMvc.perform(get("/api/employes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmploye() throws Exception {
        // Initialize the database
        employeRepository.saveAndFlush(employe);

        int databaseSizeBeforeUpdate = employeRepository.findAll().size();

        // Update the employe
        Employe updatedEmploye = employeRepository.findById(employe.getId()).get();
        // Disconnect from session so that the updates on updatedEmploye are not directly saved in db
        em.detach(updatedEmploye);
        updatedEmploye
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .genre(UPDATED_GENRE)
            .numCarteUti(UPDATED_NUM_CARTE_UTI)
            .dateCarteUti(UPDATED_DATE_CARTE_UTI)
            .photoID(UPDATED_PHOTO_ID)
            .description(UPDATED_DESCRIPTION)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        EmployeDTO employeDTO = employeMapper.toDto(updatedEmploye);

        restEmployeMockMvc.perform(put("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isOk());

        // Validate the Employe in the database
        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeUpdate);
        Employe testEmploye = employeList.get(employeList.size() - 1);
        assertThat(testEmploye.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testEmploye.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testEmploye.getGenre()).isEqualTo(UPDATED_GENRE);
        assertThat(testEmploye.getNumCarteUti()).isEqualTo(UPDATED_NUM_CARTE_UTI);
        assertThat(testEmploye.getDateCarteUti()).isEqualTo(UPDATED_DATE_CARTE_UTI);
        assertThat(testEmploye.getPhotoID()).isEqualTo(UPDATED_PHOTO_ID);
        assertThat(testEmploye.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmploye.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testEmploye.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testEmploye.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testEmploye.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testEmploye.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingEmploye() throws Exception {
        int databaseSizeBeforeUpdate = employeRepository.findAll().size();

        // Create the Employe
        EmployeDTO employeDTO = employeMapper.toDto(employe);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeMockMvc.perform(put("/api/employes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Employe in the database
        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmploye() throws Exception {
        // Initialize the database
        employeRepository.saveAndFlush(employe);

        int databaseSizeBeforeDelete = employeRepository.findAll().size();

        // Delete the employe
        restEmployeMockMvc.perform(delete("/api/employes/{id}", employe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Employe> employeList = employeRepository.findAll();
        assertThat(employeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Employe.class);
        Employe employe1 = new Employe();
        employe1.setId(1L);
        Employe employe2 = new Employe();
        employe2.setId(employe1.getId());
        assertThat(employe1).isEqualTo(employe2);
        employe2.setId(2L);
        assertThat(employe1).isNotEqualTo(employe2);
        employe1.setId(null);
        assertThat(employe1).isNotEqualTo(employe2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeDTO.class);
        EmployeDTO employeDTO1 = new EmployeDTO();
        employeDTO1.setId(1L);
        EmployeDTO employeDTO2 = new EmployeDTO();
        assertThat(employeDTO1).isNotEqualTo(employeDTO2);
        employeDTO2.setId(employeDTO1.getId());
        assertThat(employeDTO1).isEqualTo(employeDTO2);
        employeDTO2.setId(2L);
        assertThat(employeDTO1).isNotEqualTo(employeDTO2);
        employeDTO1.setId(null);
        assertThat(employeDTO1).isNotEqualTo(employeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(employeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(employeMapper.fromId(null)).isNull();
    }
}
