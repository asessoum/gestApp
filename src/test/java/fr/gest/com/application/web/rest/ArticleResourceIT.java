package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.Article;
import fr.gest.com.application.repository.ArticleRepository;
import fr.gest.com.application.service.ArticleService;
import fr.gest.com.application.service.dto.ArticleDTO;
import fr.gest.com.application.service.mapper.ArticleMapper;
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

import fr.gest.com.application.domain.enumeration.UniteVente;
/**
 * Integration tests for the {@Link ArticleResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class ArticleResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_PRIX_DE_VENTE = 1D;
    private static final Double UPDATED_PRIX_DE_VENTE = 2D;

    private static final Double DEFAULT_PRIX_DE_REVIENT = 1D;
    private static final Double UPDATED_PRIX_DE_REVIENT = 2D;

    private static final Double DEFAULT_MARGE_BRUTE = 1D;
    private static final Double UPDATED_MARGE_BRUTE = 2D;

    private static final Boolean DEFAULT_EST_COMPOSE = false;
    private static final Boolean UPDATED_EST_COMPOSE = true;

    private static final UniteVente DEFAULT_UNITE_VENTE = UniteVente.UNITAIRE;
    private static final UniteVente UPDATED_UNITE_VENTE = UniteVente.POIDS;

    private static final Double DEFAULT_POURCENTAGE_TVA = 1D;
    private static final Double UPDATED_POURCENTAGE_TVA = 2D;

    private static final String DEFAULT_CODE_BARRE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_BARRE = "BBBBBBBBBB";

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
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private ArticleService articleService;

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

    private MockMvc restArticleMockMvc;

    private Article article;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleResource articleResource = new ArticleResource(articleService);
        this.restArticleMockMvc = MockMvcBuilders.standaloneSetup(articleResource)
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
    public static Article createEntity(EntityManager em) {
        Article article = new Article()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .libelle(DEFAULT_LIBELLE)
            .description(DEFAULT_DESCRIPTION)
            .prixDeVente(DEFAULT_PRIX_DE_VENTE)
            .prixDeRevient(DEFAULT_PRIX_DE_REVIENT)
            .margeBrute(DEFAULT_MARGE_BRUTE)
            .estCompose(DEFAULT_EST_COMPOSE)
            .uniteVente(DEFAULT_UNITE_VENTE)
            .pourcentageTva(DEFAULT_POURCENTAGE_TVA)
            .codeBarre(DEFAULT_CODE_BARRE)
            .estActif(DEFAULT_EST_ACTIF)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifLe(DEFAULT_MODIF_LE)
            .modifPar(DEFAULT_MODIF_PAR);
        return article;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createUpdatedEntity(EntityManager em) {
        Article article = new Article()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .prixDeVente(UPDATED_PRIX_DE_VENTE)
            .prixDeRevient(UPDATED_PRIX_DE_REVIENT)
            .margeBrute(UPDATED_MARGE_BRUTE)
            .estCompose(UPDATED_EST_COMPOSE)
            .uniteVente(UPDATED_UNITE_VENTE)
            .pourcentageTva(UPDATED_POURCENTAGE_TVA)
            .codeBarre(UPDATED_CODE_BARRE)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        return article;
    }

    @BeforeEach
    public void initTest() {
        article = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticle() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isCreated());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate + 1);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testArticle.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testArticle.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testArticle.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testArticle.getPrixDeVente()).isEqualTo(DEFAULT_PRIX_DE_VENTE);
        assertThat(testArticle.getPrixDeRevient()).isEqualTo(DEFAULT_PRIX_DE_REVIENT);
        assertThat(testArticle.getMargeBrute()).isEqualTo(DEFAULT_MARGE_BRUTE);
        assertThat(testArticle.isEstCompose()).isEqualTo(DEFAULT_EST_COMPOSE);
        assertThat(testArticle.getUniteVente()).isEqualTo(DEFAULT_UNITE_VENTE);
        assertThat(testArticle.getPourcentageTva()).isEqualTo(DEFAULT_POURCENTAGE_TVA);
        assertThat(testArticle.getCodeBarre()).isEqualTo(DEFAULT_CODE_BARRE);
        assertThat(testArticle.isEstActif()).isEqualTo(DEFAULT_EST_ACTIF);
        assertThat(testArticle.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testArticle.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testArticle.getModifLe()).isEqualTo(DEFAULT_MODIF_LE);
        assertThat(testArticle.getModifPar()).isEqualTo(DEFAULT_MODIF_PAR);
    }

    @Test
    @Transactional
    public void createArticleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article with an existing ID
        article.setId(1L);
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setTechID(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setRemoteID(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setLibelle(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEstComposeIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setEstCompose(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUniteVenteIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setUniteVente(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArticles() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList
        restArticleMockMvc.perform(get("/api/articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].prixDeVente").value(hasItem(DEFAULT_PRIX_DE_VENTE.doubleValue())))
            .andExpect(jsonPath("$.[*].prixDeRevient").value(hasItem(DEFAULT_PRIX_DE_REVIENT.doubleValue())))
            .andExpect(jsonPath("$.[*].margeBrute").value(hasItem(DEFAULT_MARGE_BRUTE.doubleValue())))
            .andExpect(jsonPath("$.[*].estCompose").value(hasItem(DEFAULT_EST_COMPOSE.booleanValue())))
            .andExpect(jsonPath("$.[*].uniteVente").value(hasItem(DEFAULT_UNITE_VENTE.toString())))
            .andExpect(jsonPath("$.[*].pourcentageTva").value(hasItem(DEFAULT_POURCENTAGE_TVA.doubleValue())))
            .andExpect(jsonPath("$.[*].codeBarre").value(hasItem(DEFAULT_CODE_BARRE.toString())))
            .andExpect(jsonPath("$.[*].estActif").value(hasItem(DEFAULT_EST_ACTIF.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR.toString())))
            .andExpect(jsonPath("$.[*].modifLe").value(hasItem(DEFAULT_MODIF_LE.toString())))
            .andExpect(jsonPath("$.[*].modifPar").value(hasItem(DEFAULT_MODIF_PAR.toString())));
    }
    
    @Test
    @Transactional
    public void getArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(article.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.prixDeVente").value(DEFAULT_PRIX_DE_VENTE.doubleValue()))
            .andExpect(jsonPath("$.prixDeRevient").value(DEFAULT_PRIX_DE_REVIENT.doubleValue()))
            .andExpect(jsonPath("$.margeBrute").value(DEFAULT_MARGE_BRUTE.doubleValue()))
            .andExpect(jsonPath("$.estCompose").value(DEFAULT_EST_COMPOSE.booleanValue()))
            .andExpect(jsonPath("$.uniteVente").value(DEFAULT_UNITE_VENTE.toString()))
            .andExpect(jsonPath("$.pourcentageTva").value(DEFAULT_POURCENTAGE_TVA.doubleValue()))
            .andExpect(jsonPath("$.codeBarre").value(DEFAULT_CODE_BARRE.toString()))
            .andExpect(jsonPath("$.estActif").value(DEFAULT_EST_ACTIF.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR.toString()))
            .andExpect(jsonPath("$.modifLe").value(DEFAULT_MODIF_LE.toString()))
            .andExpect(jsonPath("$.modifPar").value(DEFAULT_MODIF_PAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArticle() throws Exception {
        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article
        Article updatedArticle = articleRepository.findById(article.getId()).get();
        // Disconnect from session so that the updates on updatedArticle are not directly saved in db
        em.detach(updatedArticle);
        updatedArticle
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .prixDeVente(UPDATED_PRIX_DE_VENTE)
            .prixDeRevient(UPDATED_PRIX_DE_REVIENT)
            .margeBrute(UPDATED_MARGE_BRUTE)
            .estCompose(UPDATED_EST_COMPOSE)
            .uniteVente(UPDATED_UNITE_VENTE)
            .pourcentageTva(UPDATED_POURCENTAGE_TVA)
            .codeBarre(UPDATED_CODE_BARRE)
            .estActif(UPDATED_EST_ACTIF)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifLe(UPDATED_MODIF_LE)
            .modifPar(UPDATED_MODIF_PAR);
        ArticleDTO articleDTO = articleMapper.toDto(updatedArticle);

        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testArticle.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testArticle.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testArticle.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testArticle.getPrixDeVente()).isEqualTo(UPDATED_PRIX_DE_VENTE);
        assertThat(testArticle.getPrixDeRevient()).isEqualTo(UPDATED_PRIX_DE_REVIENT);
        assertThat(testArticle.getMargeBrute()).isEqualTo(UPDATED_MARGE_BRUTE);
        assertThat(testArticle.isEstCompose()).isEqualTo(UPDATED_EST_COMPOSE);
        assertThat(testArticle.getUniteVente()).isEqualTo(UPDATED_UNITE_VENTE);
        assertThat(testArticle.getPourcentageTva()).isEqualTo(UPDATED_POURCENTAGE_TVA);
        assertThat(testArticle.getCodeBarre()).isEqualTo(UPDATED_CODE_BARRE);
        assertThat(testArticle.isEstActif()).isEqualTo(UPDATED_EST_ACTIF);
        assertThat(testArticle.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testArticle.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testArticle.getModifLe()).isEqualTo(UPDATED_MODIF_LE);
        assertThat(testArticle.getModifPar()).isEqualTo(UPDATED_MODIF_PAR);
    }

    @Test
    @Transactional
    public void updateNonExistingArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeDelete = articleRepository.findAll().size();

        // Delete the article
        restArticleMockMvc.perform(delete("/api/articles/{id}", article.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Article.class);
        Article article1 = new Article();
        article1.setId(1L);
        Article article2 = new Article();
        article2.setId(article1.getId());
        assertThat(article1).isEqualTo(article2);
        article2.setId(2L);
        assertThat(article1).isNotEqualTo(article2);
        article1.setId(null);
        assertThat(article1).isNotEqualTo(article2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleDTO.class);
        ArticleDTO articleDTO1 = new ArticleDTO();
        articleDTO1.setId(1L);
        ArticleDTO articleDTO2 = new ArticleDTO();
        assertThat(articleDTO1).isNotEqualTo(articleDTO2);
        articleDTO2.setId(articleDTO1.getId());
        assertThat(articleDTO1).isEqualTo(articleDTO2);
        articleDTO2.setId(2L);
        assertThat(articleDTO1).isNotEqualTo(articleDTO2);
        articleDTO1.setId(null);
        assertThat(articleDTO1).isNotEqualTo(articleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(articleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(articleMapper.fromId(null)).isNull();
    }
}
