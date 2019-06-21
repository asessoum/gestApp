package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.MouvementStock;
import fr.gest.com.application.repository.MouvementStockRepository;
import fr.gest.com.application.service.MouvementStockService;
import fr.gest.com.application.service.dto.MouvementStockDTO;
import fr.gest.com.application.service.mapper.MouvementStockMapper;
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

import fr.gest.com.application.domain.enumeration.TypeMouvementStock;
/**
 * Integration tests for the {@Link MouvementStockResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class MouvementStockResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final Double DEFAULT_QUANTITE_TOTAL = 1D;
    private static final Double UPDATED_QUANTITE_TOTAL = 2D;

    private static final Double DEFAULT_PRIX_TOTAL = 1D;
    private static final Double UPDATED_PRIX_TOTAL = 2D;

    private static final Double DEFAULT_PRIX_HT = 1D;
    private static final Double UPDATED_PRIX_HT = 2D;

    private static final Double DEFAULT_TVA = 1D;
    private static final Double UPDATED_TVA = 2D;

    private static final Boolean DEFAULT_VALID_SUP = false;
    private static final Boolean UPDATED_VALID_SUP = true;

    private static final Boolean DEFAULT_VALID_RES = false;
    private static final Boolean UPDATED_VALID_RES = true;

    private static final Boolean DEFAULT_EST_ACTIF = false;
    private static final Boolean UPDATED_EST_ACTIF = true;

    private static final TypeMouvementStock DEFAULT_TYPE = TypeMouvementStock.ENTREE;
    private static final TypeMouvementStock UPDATED_TYPE = TypeMouvementStock.SORTIE;

    private static final Instant DEFAULT_CREE_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREE_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_CREE_PAR = "BBBBBBBBBB";

    private static final Instant DEFAULT_MODIF_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIF_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MODIF_PAR = "AAAAAAAAAA";
    private static final String UPDATED_MODIF_PAR = "BBBBBBBBBB";

    @Autowired
    private MouvementStockRepository mouvementStockRepository;

    @Mock
    private MouvementStockRepository mouvementStockRepositoryMock;

    @Autowired
    private MouvementStockMapper mouvementStockMapper;

    @Mock
    private MouvementStockService mouvementStockServiceMock;

    @Autowired
    private MouvementStockService mouvementStockService;

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

    private MockMvc restMouvementStockMockMvc;

    private MouvementStock mouvementStock;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MouvementStockResource mouvementStockResource = new MouvementStockResource(mouvementStockService);
        this.restMouvementStockMockMvc = MockMvcBuilders.standaloneSetup(mouvementStockResource)
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
    public static MouvementStock createEntity(EntityManager em) {
        MouvementStock mouvementStock = new MouvementStock()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .quantiteTotal(DEFAULT_QUANTITE_TOTAL)
            .prixTotal(DEFAULT_PRIX_TOTAL)
            .prixHT(DEFAULT_PRIX_HT)
            .tva(DEFAULT_TVA)
            .validSup(DEFAULT_VALID_SUP)
            .validRes(DEFAULT_VALID_RES)
            .estActif(DEFAULT_EST_ACTIF)
            .type(DEFAULT_TYPE)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return mouvementStock;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MouvementStock createUpdatedEntity(EntityManager em) {
        MouvementStock mouvementStock = new MouvementStock()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .quantiteTotal(UPDATED_QUANTITE_TOTAL)
            .prixTotal(UPDATED_PRIX_TOTAL)
            .prixHT(UPDATED_PRIX_HT)
            .tva(UPDATED_TVA)
            .validSup(UPDATED_VALID_SUP)
            .validRes(UPDATED_VALID_RES)
            .estActif(UPDATED_EST_ACTIF)
            .type(UPDATED_TYPE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return mouvementStock;
    }

    @BeforeEach
    public void initTest() {
        mouvementStock = createEntity(em);
    }

    @Test
    @Transactional
    public void createMouvementStock() throws Exception {
        int databaseSizeBeforeCreate = mouvementStockRepository.findAll().size();

        // Create the MouvementStock
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);
        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isCreated());

        // Validate the MouvementStock in the database
        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeCreate + 1);
        MouvementStock testMouvementStock = mouvementStockList.get(mouvementStockList.size() - 1);
        assertThat(testMouvementStock.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testMouvementStock.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testMouvementStock.getQuantiteTotal()).isEqualTo(DEFAULT_QUANTITE_TOTAL);
        assertThat(testMouvementStock.getPrixTotal()).isEqualTo(DEFAULT_PRIX_TOTAL);
        assertThat(testMouvementStock.getPrixHT()).isEqualTo(DEFAULT_PRIX_HT);
        assertThat(testMouvementStock.getTva()).isEqualTo(DEFAULT_TVA);
        assertThat(testMouvementStock.isValidSup()).isEqualTo(DEFAULT_VALID_SUP);
        assertThat(testMouvementStock.isValidRes()).isEqualTo(DEFAULT_VALID_RES);
        assertThat(testMouvementStock.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testMouvementStock.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testMouvementStock.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testMouvementStock.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testMouvementStock.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testMouvementStock.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createMouvementStockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mouvementStockRepository.findAll().size();

        // Create the MouvementStock with an existing ID
        mouvementStock.setId(1L);
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MouvementStock in the database
        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = mouvementStockRepository.findAll().size();
        // set the field null
        mouvementStock.setTechID(null);

        // Create the MouvementStock, which fails.
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = mouvementStockRepository.findAll().size();
        // set the field null
        mouvementStock.setRemoteID(null);

        // Create the MouvementStock, which fails.
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantiteTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = mouvementStockRepository.findAll().size();
        // set the field null
        mouvementStock.setQuantiteTotal(null);

        // Create the MouvementStock, which fails.
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = mouvementStockRepository.findAll().size();
        // set the field null
        mouvementStock.setPrixTotal(null);

        // Create the MouvementStock, which fails.
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixHTIsRequired() throws Exception {
        int databaseSizeBeforeTest = mouvementStockRepository.findAll().size();
        // set the field null
        mouvementStock.setPrixHT(null);

        // Create the MouvementStock, which fails.
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTvaIsRequired() throws Exception {
        int databaseSizeBeforeTest = mouvementStockRepository.findAll().size();
        // set the field null
        mouvementStock.setTva(null);

        // Create the MouvementStock, which fails.
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = mouvementStockRepository.findAll().size();
        // set the field null
        mouvementStock.setType(null);

        // Create the MouvementStock, which fails.
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        restMouvementStockMockMvc.perform(post("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMouvementStocks() throws Exception {
        // Initialize the database
        mouvementStockRepository.saveAndFlush(mouvementStock);

        // Get all the mouvementStockList
        restMouvementStockMockMvc.perform(get("/api/mouvement-stocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mouvementStock.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].quantiteTotal").value(hasItem(DEFAULT_QUANTITE_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].prixTotal").value(hasItem(DEFAULT_PRIX_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].prixHT").value(hasItem(DEFAULT_PRIX_HT.doubleValue())))
            .andExpect(jsonPath("$.[*].tva").value(hasItem(DEFAULT_TVA.doubleValue())))
            .andExpect(jsonPath("$.[*].validSup").value(hasItem(DEFAULT_VALID_SUP.booleanValue())))
            .andExpect(jsonPath("$.[*].validRes").value(hasItem(DEFAULT_VALID_RES.booleanValue())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMouvementStocksWithEagerRelationshipsIsEnabled() throws Exception {
        MouvementStockResource mouvementStockResource = new MouvementStockResource(mouvementStockServiceMock);
        when(mouvementStockServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restMouvementStockMockMvc = MockMvcBuilders.standaloneSetup(mouvementStockResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMouvementStockMockMvc.perform(get("/api/mouvement-stocks?eagerload=true"))
        .andExpect(status().isOk());

        verify(mouvementStockServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMouvementStocksWithEagerRelationshipsIsNotEnabled() throws Exception {
        MouvementStockResource mouvementStockResource = new MouvementStockResource(mouvementStockServiceMock);
            when(mouvementStockServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restMouvementStockMockMvc = MockMvcBuilders.standaloneSetup(mouvementStockResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMouvementStockMockMvc.perform(get("/api/mouvement-stocks?eagerload=true"))
        .andExpect(status().isOk());

            verify(mouvementStockServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMouvementStock() throws Exception {
        // Initialize the database
        mouvementStockRepository.saveAndFlush(mouvementStock);

        // Get the mouvementStock
        restMouvementStockMockMvc.perform(get("/api/mouvement-stocks/{id}", mouvementStock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mouvementStock.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.quantiteTotal").value(DEFAULT_QUANTITE_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.prixTotal").value(DEFAULT_PRIX_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.prixHT").value(DEFAULT_PRIX_HT.doubleValue()))
            .andExpect(jsonPath("$.tva").value(DEFAULT_TVA.doubleValue()))
            .andExpect(jsonPath("$.validSup").value(DEFAULT_VALID_SUP.booleanValue()))
            .andExpect(jsonPath("$.validRes").value(DEFAULT_VALID_RES.booleanValue()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMouvementStock() throws Exception {
        // Get the mouvementStock
        restMouvementStockMockMvc.perform(get("/api/mouvement-stocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMouvementStock() throws Exception {
        // Initialize the database
        mouvementStockRepository.saveAndFlush(mouvementStock);

        int databaseSizeBeforeUpdate = mouvementStockRepository.findAll().size();

        // Update the mouvementStock
        MouvementStock updatedMouvementStock = mouvementStockRepository.findById(mouvementStock.getId()).get();
        // Disconnect from session so that the updates on updatedMouvementStock are not directly saved in db
        em.detach(updatedMouvementStock);
        updatedMouvementStock
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .quantiteTotal(UPDATED_QUANTITE_TOTAL)
            .prixTotal(UPDATED_PRIX_TOTAL)
            .prixHT(UPDATED_PRIX_HT)
            .tva(UPDATED_TVA)
            .validSup(UPDATED_VALID_SUP)
            .validRes(UPDATED_VALID_RES)
            .estActif(UPDATED_EST_ACTIF)
            .type(UPDATED_TYPE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(updatedMouvementStock);

        restMouvementStockMockMvc.perform(put("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isOk());

        // Validate the MouvementStock in the database
        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeUpdate);
        MouvementStock testMouvementStock = mouvementStockList.get(mouvementStockList.size() - 1);
        assertThat(testMouvementStock.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testMouvementStock.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testMouvementStock.getQuantiteTotal()).isEqualTo(UPDATED_QUANTITE_TOTAL);
        assertThat(testMouvementStock.getPrixTotal()).isEqualTo(UPDATED_PRIX_TOTAL);
        assertThat(testMouvementStock.getPrixHT()).isEqualTo(UPDATED_PRIX_HT);
        assertThat(testMouvementStock.getTva()).isEqualTo(UPDATED_TVA);
        assertThat(testMouvementStock.isValidSup()).isEqualTo(UPDATED_VALID_SUP);
        assertThat(testMouvementStock.isValidRes()).isEqualTo(UPDATED_VALID_RES);
        assertThat(testMouvementStock.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testMouvementStock.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testMouvementStock.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testMouvementStock.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testMouvementStock.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testMouvementStock.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingMouvementStock() throws Exception {
        int databaseSizeBeforeUpdate = mouvementStockRepository.findAll().size();

        // Create the MouvementStock
        MouvementStockDTO mouvementStockDTO = mouvementStockMapper.toDto(mouvementStock);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMouvementStockMockMvc.perform(put("/api/mouvement-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvementStockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MouvementStock in the database
        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMouvementStock() throws Exception {
        // Initialize the database
        mouvementStockRepository.saveAndFlush(mouvementStock);

        int databaseSizeBeforeDelete = mouvementStockRepository.findAll().size();

        // Delete the mouvementStock
        restMouvementStockMockMvc.perform(delete("/api/mouvement-stocks/{id}", mouvementStock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MouvementStock> mouvementStockList = mouvementStockRepository.findAll();
        assertThat(mouvementStockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MouvementStock.class);
        MouvementStock mouvementStock1 = new MouvementStock();
        mouvementStock1.setId(1L);
        MouvementStock mouvementStock2 = new MouvementStock();
        mouvementStock2.setId(mouvementStock1.getId());
        assertThat(mouvementStock1).isEqualTo(mouvementStock2);
        mouvementStock2.setId(2L);
        assertThat(mouvementStock1).isNotEqualTo(mouvementStock2);
        mouvementStock1.setId(null);
        assertThat(mouvementStock1).isNotEqualTo(mouvementStock2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MouvementStockDTO.class);
        MouvementStockDTO mouvementStockDTO1 = new MouvementStockDTO();
        mouvementStockDTO1.setId(1L);
        MouvementStockDTO mouvementStockDTO2 = new MouvementStockDTO();
        assertThat(mouvementStockDTO1).isNotEqualTo(mouvementStockDTO2);
        mouvementStockDTO2.setId(mouvementStockDTO1.getId());
        assertThat(mouvementStockDTO1).isEqualTo(mouvementStockDTO2);
        mouvementStockDTO2.setId(2L);
        assertThat(mouvementStockDTO1).isNotEqualTo(mouvementStockDTO2);
        mouvementStockDTO1.setId(null);
        assertThat(mouvementStockDTO1).isNotEqualTo(mouvementStockDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(mouvementStockMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(mouvementStockMapper.fromId(null)).isNull();
    }
}
