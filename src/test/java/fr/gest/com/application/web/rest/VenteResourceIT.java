package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Vente;
import fr.gest.com.application.repository.VenteRepository;
import fr.gest.com.application.service.VenteService;
import fr.gest.com.application.service.dto.VenteDTO;
import fr.gest.com.application.service.mapper.VenteMapper;
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
 * Integration tests for the {@Link VenteResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class VenteResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final Double DEFAULT_QUANTITE = 1D;
    private static final Double UPDATED_QUANTITE = 2D;

    private static final Double DEFAULT_PRIX_VENTE = 1D;
    private static final Double UPDATED_PRIX_VENTE = 2D;

    private static final Double DEFAULT_MARGE_VENTE = 1D;
    private static final Double UPDATED_MARGE_VENTE = 2D;

    private static final Instant DEFAULT_CREE_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREE_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_CREE_PAR = "BBBBBBBBBB";

    private static final Instant DEFAULT_MODIF_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIF_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MODIF_PAR = "AAAAAAAAAA";
    private static final String UPDATED_MODIF_PAR = "BBBBBBBBBB";

    @Autowired
    private VenteRepository venteRepository;

    @Autowired
    private VenteMapper venteMapper;

    @Autowired
    private VenteService venteService;

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

    private MockMvc restVenteMockMvc;

    private Vente vente;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VenteResource venteResource = new VenteResource(venteService);
        this.restVenteMockMvc = MockMvcBuilders.standaloneSetup(venteResource)
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
    public static Vente createEntity(EntityManager em) {
        Vente vente = new Vente()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .quantite(DEFAULT_QUANTITE)
            .prixVente(DEFAULT_PRIX_VENTE)
            .margeVente(DEFAULT_MARGE_VENTE)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return vente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vente createUpdatedEntity(EntityManager em) {
        Vente vente = new Vente()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .quantite(UPDATED_QUANTITE)
            .prixVente(UPDATED_PRIX_VENTE)
            .margeVente(UPDATED_MARGE_VENTE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return vente;
    }

    @BeforeEach
    public void initTest() {
        vente = createEntity(em);
    }

    @Test
    @Transactional
    public void createVente() throws Exception {
        int databaseSizeBeforeCreate = venteRepository.findAll().size();

        // Create the Vente
        VenteDTO venteDTO = venteMapper.toDto(vente);
        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isCreated());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeCreate + 1);
        Vente testVente = venteList.get(venteList.size() - 1);
        assertThat(testVente.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testVente.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testVente.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testVente.getPrixVente()).isEqualTo(DEFAULT_PRIX_VENTE);
        assertThat(testVente.getMargeVente()).isEqualTo(DEFAULT_MARGE_VENTE);
        assertThat(testVente.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testVente.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testVente.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testVente.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createVenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = venteRepository.findAll().size();

        // Create the Vente with an existing ID
        vente.setId(1L);
        VenteDTO venteDTO = venteMapper.toDto(vente);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteRepository.findAll().size();
        // set the field null
        vente.setTechID(null);

        // Create the Vente, which fails.
        VenteDTO venteDTO = venteMapper.toDto(vente);

        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteRepository.findAll().size();
        // set the field null
        vente.setRemoteID(null);

        // Create the Vente, which fails.
        VenteDTO venteDTO = venteMapper.toDto(vente);

        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteRepository.findAll().size();
        // set the field null
        vente.setQuantite(null);

        // Create the Vente, which fails.
        VenteDTO venteDTO = venteMapper.toDto(vente);

        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixVenteIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteRepository.findAll().size();
        // set the field null
        vente.setPrixVente(null);

        // Create the Vente, which fails.
        VenteDTO venteDTO = venteMapper.toDto(vente);

        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMargeVenteIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteRepository.findAll().size();
        // set the field null
        vente.setMargeVente(null);

        // Create the Vente, which fails.
        VenteDTO venteDTO = venteMapper.toDto(vente);

        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVentes() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        // Get all the venteList
        restVenteMockMvc.perform(get("/api/ventes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vente.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE.doubleValue())))
            .andExpect(jsonPath("$.[*].prixVente").value(hasItem(DEFAULT_PRIX_VENTE.doubleValue())))
            .andExpect(jsonPath("$.[*].margeVente").value(hasItem(DEFAULT_MARGE_VENTE.doubleValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        // Get the vente
        restVenteMockMvc.perform(get("/api/ventes/{id}", vente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vente.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE.doubleValue()))
            .andExpect(jsonPath("$.prixVente").value(DEFAULT_PRIX_VENTE.doubleValue()))
            .andExpect(jsonPath("$.margeVente").value(DEFAULT_MARGE_VENTE.doubleValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVente() throws Exception {
        // Get the vente
        restVenteMockMvc.perform(get("/api/ventes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        int databaseSizeBeforeUpdate = venteRepository.findAll().size();

        // Update the vente
        Vente updatedVente = venteRepository.findById(vente.getId()).get();
        // Disconnect from session so that the updates on updatedVente are not directly saved in db
        em.detach(updatedVente);
        updatedVente
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .quantite(UPDATED_QUANTITE)
            .prixVente(UPDATED_PRIX_VENTE)
            .margeVente(UPDATED_MARGE_VENTE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        VenteDTO venteDTO = venteMapper.toDto(updatedVente);

        restVenteMockMvc.perform(put("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isOk());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeUpdate);
        Vente testVente = venteList.get(venteList.size() - 1);
        assertThat(testVente.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testVente.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testVente.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testVente.getPrixVente()).isEqualTo(UPDATED_PRIX_VENTE);
        assertThat(testVente.getMargeVente()).isEqualTo(UPDATED_MARGE_VENTE);
        assertThat(testVente.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testVente.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testVente.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testVente.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingVente() throws Exception {
        int databaseSizeBeforeUpdate = venteRepository.findAll().size();

        // Create the Vente
        VenteDTO venteDTO = venteMapper.toDto(vente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVenteMockMvc.perform(put("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        int databaseSizeBeforeDelete = venteRepository.findAll().size();

        // Delete the vente
        restVenteMockMvc.perform(delete("/api/ventes/{id}", vente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vente.class);
        Vente vente1 = new Vente();
        vente1.setId(1L);
        Vente vente2 = new Vente();
        vente2.setId(vente1.getId());
        assertThat(vente1).isEqualTo(vente2);
        vente2.setId(2L);
        assertThat(vente1).isNotEqualTo(vente2);
        vente1.setId(null);
        assertThat(vente1).isNotEqualTo(vente2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VenteDTO.class);
        VenteDTO venteDTO1 = new VenteDTO();
        venteDTO1.setId(1L);
        VenteDTO venteDTO2 = new VenteDTO();
        assertThat(venteDTO1).isNotEqualTo(venteDTO2);
        venteDTO2.setId(venteDTO1.getId());
        assertThat(venteDTO1).isEqualTo(venteDTO2);
        venteDTO2.setId(2L);
        assertThat(venteDTO1).isNotEqualTo(venteDTO2);
        venteDTO1.setId(null);
        assertThat(venteDTO1).isNotEqualTo(venteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(venteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(venteMapper.fromId(null)).isNull();
    }
}
