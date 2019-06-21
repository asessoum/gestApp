package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Commande;
import fr.gest.com.application.repository.CommandeRepository;
import fr.gest.com.application.service.CommandeService;
import fr.gest.com.application.service.dto.CommandeDTO;
import fr.gest.com.application.service.mapper.CommandeMapper;
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
 * Integration tests for the {@Link CommandeResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class CommandeResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final Double DEFAULT_QUANTITE_TOTAL = 1D;
    private static final Double UPDATED_QUANTITE_TOTAL = 2D;

    private static final Double DEFAULT_PRIX_TOTAL_COMMANDE = 1D;
    private static final Double UPDATED_PRIX_TOTAL_COMMANDE = 2D;

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

    private static final Instant DEFAULT_CREE_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREE_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_CREE_PAR = "BBBBBBBBBB";

    private static final Instant DEFAULT_MODIF_LE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIF_LE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MODIF_PAR = "AAAAAAAAAA";
    private static final String UPDATED_MODIF_PAR = "BBBBBBBBBB";

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private CommandeMapper commandeMapper;

    @Autowired
    private CommandeService commandeService;

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

    private MockMvc restCommandeMockMvc;

    private Commande commande;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommandeResource commandeResource = new CommandeResource(commandeService);
        this.restCommandeMockMvc = MockMvcBuilders.standaloneSetup(commandeResource)
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
    public static Commande createEntity(EntityManager em) {
        Commande commande = new Commande()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .quantiteTotal(DEFAULT_QUANTITE_TOTAL)
            .prixTotalCommande(DEFAULT_PRIX_TOTAL_COMMANDE)
            .prixHT(DEFAULT_PRIX_HT)
            .tva(DEFAULT_TVA)
            .validSup(DEFAULT_VALID_SUP)
            .validRes(DEFAULT_VALID_RES)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return commande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commande createUpdatedEntity(EntityManager em) {
        Commande commande = new Commande()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .quantiteTotal(UPDATED_QUANTITE_TOTAL)
            .prixTotalCommande(UPDATED_PRIX_TOTAL_COMMANDE)
            .prixHT(UPDATED_PRIX_HT)
            .tva(UPDATED_TVA)
            .validSup(UPDATED_VALID_SUP)
            .validRes(UPDATED_VALID_RES)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return commande;
    }

    @BeforeEach
    public void initTest() {
        commande = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommande() throws Exception {
        int databaseSizeBeforeCreate = commandeRepository.findAll().size();

        // Create the Commande
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);
        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isCreated());

        // Validate the Commande in the database
        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeCreate + 1);
        Commande testCommande = commandeList.get(commandeList.size() - 1);
        assertThat(testCommande.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testCommande.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testCommande.getQuantiteTotal()).isEqualTo(DEFAULT_QUANTITE_TOTAL);
        assertThat(testCommande.getPrixTotalCommande()).isEqualTo(DEFAULT_PRIX_TOTAL_COMMANDE);
        assertThat(testCommande.getPrixHT()).isEqualTo(DEFAULT_PRIX_HT);
        assertThat(testCommande.getTva()).isEqualTo(DEFAULT_TVA);
        assertThat(testCommande.isValidSup()).isEqualTo(DEFAULT_VALID_SUP);
        assertThat(testCommande.isValidRes()).isEqualTo(DEFAULT_VALID_RES);
        assertThat(testCommande.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testCommande.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testCommande.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testCommande.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testCommande.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createCommandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commandeRepository.findAll().size();

        // Create the Commande with an existing ID
        commande.setId(1L);
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Commande in the database
        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandeRepository.findAll().size();
        // set the field null
        commande.setTechID(null);

        // Create the Commande, which fails.
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandeRepository.findAll().size();
        // set the field null
        commande.setRemoteID(null);

        // Create the Commande, which fails.
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantiteTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandeRepository.findAll().size();
        // set the field null
        commande.setQuantiteTotal(null);

        // Create the Commande, which fails.
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixTotalCommandeIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandeRepository.findAll().size();
        // set the field null
        commande.setPrixTotalCommande(null);

        // Create the Commande, which fails.
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixHTIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandeRepository.findAll().size();
        // set the field null
        commande.setPrixHT(null);

        // Create the Commande, which fails.
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTvaIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandeRepository.findAll().size();
        // set the field null
        commande.setTva(null);

        // Create the Commande, which fails.
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        restCommandeMockMvc.perform(post("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommandes() throws Exception {
        // Initialize the database
        commandeRepository.saveAndFlush(commande);

        // Get all the commandeList
        restCommandeMockMvc.perform(get("/api/commandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commande.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].quantiteTotal").value(hasItem(DEFAULT_QUANTITE_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].prixTotalCommande").value(hasItem(DEFAULT_PRIX_TOTAL_COMMANDE.doubleValue())))
            .andExpect(jsonPath("$.[*].prixHT").value(hasItem(DEFAULT_PRIX_HT.doubleValue())))
            .andExpect(jsonPath("$.[*].tva").value(hasItem(DEFAULT_TVA.doubleValue())))
            .andExpect(jsonPath("$.[*].validSup").value(hasItem(DEFAULT_VALID_SUP.booleanValue())))
            .andExpect(jsonPath("$.[*].validRes").value(hasItem(DEFAULT_VALID_RES.booleanValue())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getCommande() throws Exception {
        // Initialize the database
        commandeRepository.saveAndFlush(commande);

        // Get the commande
        restCommandeMockMvc.perform(get("/api/commandes/{id}", commande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commande.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.quantiteTotal").value(DEFAULT_QUANTITE_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.prixTotalCommande").value(DEFAULT_PRIX_TOTAL_COMMANDE.doubleValue()))
            .andExpect(jsonPath("$.prixHT").value(DEFAULT_PRIX_HT.doubleValue()))
            .andExpect(jsonPath("$.tva").value(DEFAULT_TVA.doubleValue()))
            .andExpect(jsonPath("$.validSup").value(DEFAULT_VALID_SUP.booleanValue()))
            .andExpect(jsonPath("$.validRes").value(DEFAULT_VALID_RES.booleanValue()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCommande() throws Exception {
        // Get the commande
        restCommandeMockMvc.perform(get("/api/commandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommande() throws Exception {
        // Initialize the database
        commandeRepository.saveAndFlush(commande);

        int databaseSizeBeforeUpdate = commandeRepository.findAll().size();

        // Update the commande
        Commande updatedCommande = commandeRepository.findById(commande.getId()).get();
        // Disconnect from session so that the updates on updatedCommande are not directly saved in db
        em.detach(updatedCommande);
        updatedCommande
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .quantiteTotal(UPDATED_QUANTITE_TOTAL)
            .prixTotalCommande(UPDATED_PRIX_TOTAL_COMMANDE)
            .prixHT(UPDATED_PRIX_HT)
            .tva(UPDATED_TVA)
            .validSup(UPDATED_VALID_SUP)
            .validRes(UPDATED_VALID_RES)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        CommandeDTO commandeDTO = commandeMapper.toDto(updatedCommande);

        restCommandeMockMvc.perform(put("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isOk());

        // Validate the Commande in the database
        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeUpdate);
        Commande testCommande = commandeList.get(commandeList.size() - 1);
        assertThat(testCommande.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testCommande.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testCommande.getQuantiteTotal()).isEqualTo(UPDATED_QUANTITE_TOTAL);
        assertThat(testCommande.getPrixTotalCommande()).isEqualTo(UPDATED_PRIX_TOTAL_COMMANDE);
        assertThat(testCommande.getPrixHT()).isEqualTo(UPDATED_PRIX_HT);
        assertThat(testCommande.getTva()).isEqualTo(UPDATED_TVA);
        assertThat(testCommande.isValidSup()).isEqualTo(UPDATED_VALID_SUP);
        assertThat(testCommande.isValidRes()).isEqualTo(UPDATED_VALID_RES);
        assertThat(testCommande.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testCommande.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testCommande.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testCommande.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testCommande.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingCommande() throws Exception {
        int databaseSizeBeforeUpdate = commandeRepository.findAll().size();

        // Create the Commande
        CommandeDTO commandeDTO = commandeMapper.toDto(commande);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandeMockMvc.perform(put("/api/commandes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commandeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Commande in the database
        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommande() throws Exception {
        // Initialize the database
        commandeRepository.saveAndFlush(commande);

        int databaseSizeBeforeDelete = commandeRepository.findAll().size();

        // Delete the commande
        restCommandeMockMvc.perform(delete("/api/commandes/{id}", commande.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commande> commandeList = commandeRepository.findAll();
        assertThat(commandeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commande.class);
        Commande commande1 = new Commande();
        commande1.setId(1L);
        Commande commande2 = new Commande();
        commande2.setId(commande1.getId());
        assertThat(commande1).isEqualTo(commande2);
        commande2.setId(2L);
        assertThat(commande1).isNotEqualTo(commande2);
        commande1.setId(null);
        assertThat(commande1).isNotEqualTo(commande2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandeDTO.class);
        CommandeDTO commandeDTO1 = new CommandeDTO();
        commandeDTO1.setId(1L);
        CommandeDTO commandeDTO2 = new CommandeDTO();
        assertThat(commandeDTO1).isNotEqualTo(commandeDTO2);
        commandeDTO2.setId(commandeDTO1.getId());
        assertThat(commandeDTO1).isEqualTo(commandeDTO2);
        commandeDTO2.setId(2L);
        assertThat(commandeDTO1).isNotEqualTo(commandeDTO2);
        commandeDTO1.setId(null);
        assertThat(commandeDTO1).isNotEqualTo(commandeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(commandeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(commandeMapper.fromId(null)).isNull();
    }
}
