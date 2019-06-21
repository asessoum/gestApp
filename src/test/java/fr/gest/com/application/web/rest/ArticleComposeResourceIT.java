package fr.gest.com.application.web.rest;

import fr.gest.com.application.GestApp;
import fr.gest.com.application.domain.ArticleCompose;
import fr.gest.com.application.repository.ArticleComposeRepository;
import fr.gest.com.application.service.ArticleComposeService;
import fr.gest.com.application.service.dto.ArticleComposeDTO;
import fr.gest.com.application.service.mapper.ArticleComposeMapper;
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
 * Integration tests for the {@Link ArticleComposeResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = GestApp.class)
public class ArticleComposeResourceIT {

    private static final String DEFAULT_TECH_ID = "AAAAAAAAAA";
    private static final String UPDATED_TECH_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_REMOTE_ID = 1;
    private static final Integer UPDATED_REMOTE_ID = 2;

    private static final Double DEFAULT_NOMBRE = 1D;
    private static final Double UPDATED_NOMBRE = 2D;

    @Autowired
    private ArticleComposeRepository articleComposeRepository;

    @Autowired
    private ArticleComposeMapper articleComposeMapper;

    @Autowired
    private ArticleComposeService articleComposeService;

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

    private MockMvc restArticleComposeMockMvc;

    private ArticleCompose articleCompose;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleComposeResource articleComposeResource = new ArticleComposeResource(articleComposeService);
        this.restArticleComposeMockMvc = MockMvcBuilders.standaloneSetup(articleComposeResource)
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
    public static ArticleCompose createEntity(EntityManager em) {
        ArticleCompose articleCompose = new ArticleCompose()
            .techID(DEFAULT_TECH_ID)
            .remoteID(DEFAULT_REMOTE_ID)
            .nombre(DEFAULT_NOMBRE);
        return articleCompose;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArticleCompose createUpdatedEntity(EntityManager em) {
        ArticleCompose articleCompose = new ArticleCompose()
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .nombre(UPDATED_NOMBRE);
        return articleCompose;
    }

    @BeforeEach
    public void initTest() {
        articleCompose = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticleCompose() throws Exception {
        int databaseSizeBeforeCreate = articleComposeRepository.findAll().size();

        // Create the ArticleCompose
        ArticleComposeDTO articleComposeDTO = articleComposeMapper.toDto(articleCompose);
        restArticleComposeMockMvc.perform(post("/api/article-composes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleComposeDTO)))
            .andExpect(status().isCreated());

        // Validate the ArticleCompose in the database
        List<ArticleCompose> articleComposeList = articleComposeRepository.findAll();
        assertThat(articleComposeList).hasSize(databaseSizeBeforeCreate + 1);
        ArticleCompose testArticleCompose = articleComposeList.get(articleComposeList.size() - 1);
        assertThat(testArticleCompose.getTechID()).isEqualTo(DEFAULT_TECH_ID);
        assertThat(testArticleCompose.getRemoteID()).isEqualTo(DEFAULT_REMOTE_ID);
        assertThat(testArticleCompose.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createArticleComposeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleComposeRepository.findAll().size();

        // Create the ArticleCompose with an existing ID
        articleCompose.setId(1L);
        ArticleComposeDTO articleComposeDTO = articleComposeMapper.toDto(articleCompose);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleComposeMockMvc.perform(post("/api/article-composes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleComposeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleCompose in the database
        List<ArticleCompose> articleComposeList = articleComposeRepository.findAll();
        assertThat(articleComposeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTechIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleComposeRepository.findAll().size();
        // set the field null
        articleCompose.setTechID(null);

        // Create the ArticleCompose, which fails.
        ArticleComposeDTO articleComposeDTO = articleComposeMapper.toDto(articleCompose);

        restArticleComposeMockMvc.perform(post("/api/article-composes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleComposeDTO)))
            .andExpect(status().isBadRequest());

        List<ArticleCompose> articleComposeList = articleComposeRepository.findAll();
        assertThat(articleComposeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemoteIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleComposeRepository.findAll().size();
        // set the field null
        articleCompose.setRemoteID(null);

        // Create the ArticleCompose, which fails.
        ArticleComposeDTO articleComposeDTO = articleComposeMapper.toDto(articleCompose);

        restArticleComposeMockMvc.perform(post("/api/article-composes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleComposeDTO)))
            .andExpect(status().isBadRequest());

        List<ArticleCompose> articleComposeList = articleComposeRepository.findAll();
        assertThat(articleComposeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArticleComposes() throws Exception {
        // Initialize the database
        articleComposeRepository.saveAndFlush(articleCompose);

        // Get all the articleComposeList
        restArticleComposeMockMvc.perform(get("/api/article-composes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articleCompose.getId().intValue())))
            .andExpect(jsonPath("$.[*].techID").value(hasItem(DEFAULT_TECH_ID.toString())))
            .andExpect(jsonPath("$.[*].remoteID").value(hasItem(DEFAULT_REMOTE_ID)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getArticleCompose() throws Exception {
        // Initialize the database
        articleComposeRepository.saveAndFlush(articleCompose);

        // Get the articleCompose
        restArticleComposeMockMvc.perform(get("/api/article-composes/{id}", articleCompose.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articleCompose.getId().intValue()))
            .andExpect(jsonPath("$.techID").value(DEFAULT_TECH_ID.toString()))
            .andExpect(jsonPath("$.remoteID").value(DEFAULT_REMOTE_ID))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingArticleCompose() throws Exception {
        // Get the articleCompose
        restArticleComposeMockMvc.perform(get("/api/article-composes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticleCompose() throws Exception {
        // Initialize the database
        articleComposeRepository.saveAndFlush(articleCompose);

        int databaseSizeBeforeUpdate = articleComposeRepository.findAll().size();

        // Update the articleCompose
        ArticleCompose updatedArticleCompose = articleComposeRepository.findById(articleCompose.getId()).get();
        // Disconnect from session so that the updates on updatedArticleCompose are not directly saved in db
        em.detach(updatedArticleCompose);
        updatedArticleCompose
            .techID(UPDATED_TECH_ID)
            .remoteID(UPDATED_REMOTE_ID)
            .nombre(UPDATED_NOMBRE);
        ArticleComposeDTO articleComposeDTO = articleComposeMapper.toDto(updatedArticleCompose);

        restArticleComposeMockMvc.perform(put("/api/article-composes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleComposeDTO)))
            .andExpect(status().isOk());

        // Validate the ArticleCompose in the database
        List<ArticleCompose> articleComposeList = articleComposeRepository.findAll();
        assertThat(articleComposeList).hasSize(databaseSizeBeforeUpdate);
        ArticleCompose testArticleCompose = articleComposeList.get(articleComposeList.size() - 1);
        assertThat(testArticleCompose.getTechID()).isEqualTo(UPDATED_TECH_ID);
        assertThat(testArticleCompose.getRemoteID()).isEqualTo(UPDATED_REMOTE_ID);
        assertThat(testArticleCompose.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticleCompose() throws Exception {
        int databaseSizeBeforeUpdate = articleComposeRepository.findAll().size();

        // Create the ArticleCompose
        ArticleComposeDTO articleComposeDTO = articleComposeMapper.toDto(articleCompose);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleComposeMockMvc.perform(put("/api/article-composes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleComposeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleCompose in the database
        List<ArticleCompose> articleComposeList = articleComposeRepository.findAll();
        assertThat(articleComposeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticleCompose() throws Exception {
        // Initialize the database
        articleComposeRepository.saveAndFlush(articleCompose);

        int databaseSizeBeforeDelete = articleComposeRepository.findAll().size();

        // Delete the articleCompose
        restArticleComposeMockMvc.perform(delete("/api/article-composes/{id}", articleCompose.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ArticleCompose> articleComposeList = articleComposeRepository.findAll();
        assertThat(articleComposeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleCompose.class);
        ArticleCompose articleCompose1 = new ArticleCompose();
        articleCompose1.setId(1L);
        ArticleCompose articleCompose2 = new ArticleCompose();
        articleCompose2.setId(articleCompose1.getId());
        assertThat(articleCompose1).isEqualTo(articleCompose2);
        articleCompose2.setId(2L);
        assertThat(articleCompose1).isNotEqualTo(articleCompose2);
        articleCompose1.setId(null);
        assertThat(articleCompose1).isNotEqualTo(articleCompose2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleComposeDTO.class);
        ArticleComposeDTO articleComposeDTO1 = new ArticleComposeDTO();
        articleComposeDTO1.setId(1L);
        ArticleComposeDTO articleComposeDTO2 = new ArticleComposeDTO();
        assertThat(articleComposeDTO1).isNotEqualTo(articleComposeDTO2);
        articleComposeDTO2.setId(articleComposeDTO1.getId());
        assertThat(articleComposeDTO1).isEqualTo(articleComposeDTO2);
        articleComposeDTO2.setId(2L);
        assertThat(articleComposeDTO1).isNotEqualTo(articleComposeDTO2);
        articleComposeDTO1.setId(null);
        assertThat(articleComposeDTO1).isNotEqualTo(articleComposeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(articleComposeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(articleComposeMapper.fromId(null)).isNull();
    }
}
