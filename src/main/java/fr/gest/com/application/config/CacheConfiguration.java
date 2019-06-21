package fr.gest.com.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, fr.gest.com.application.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, fr.gest.com.application.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, fr.gest.com.application.domain.User.class.getName());
            createCache(cm, fr.gest.com.application.domain.Authority.class.getName());
            createCache(cm, fr.gest.com.application.domain.User.class.getName() + ".authorities");
            createCache(cm, fr.gest.com.application.domain.Pays.class.getName());
            createCache(cm, fr.gest.com.application.domain.Pays.class.getName() + ".communes");
            createCache(cm, fr.gest.com.application.domain.Pays.class.getName() + ".langues");
            createCache(cm, fr.gest.com.application.domain.Commune.class.getName());
            createCache(cm, fr.gest.com.application.domain.Commune.class.getName() + ".adresses");
            createCache(cm, fr.gest.com.application.domain.Langue.class.getName());
            createCache(cm, fr.gest.com.application.domain.Langue.class.getName() + ".clients");
            createCache(cm, fr.gest.com.application.domain.Langue.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Langue.class.getName() + ".fournisseurs");
            createCache(cm, fr.gest.com.application.domain.Langue.class.getName() + ".employes");
            createCache(cm, fr.gest.com.application.domain.Reference.class.getName());
            createCache(cm, fr.gest.com.application.domain.Reference.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Categorie.class.getName());
            createCache(cm, fr.gest.com.application.domain.Categorie.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Categorie.class.getName() + ".articles");
            createCache(cm, fr.gest.com.application.domain.Article.class.getName());
            createCache(cm, fr.gest.com.application.domain.Article.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Article.class.getName() + ".ventes");
            createCache(cm, fr.gest.com.application.domain.Article.class.getName() + ".mouvementStocks");
            createCache(cm, fr.gest.com.application.domain.Reduction.class.getName());
            createCache(cm, fr.gest.com.application.domain.Reduction.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Reduction.class.getName() + ".articles");
            createCache(cm, fr.gest.com.application.domain.Fournisseur.class.getName());
            createCache(cm, fr.gest.com.application.domain.Fournisseur.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Fournisseur.class.getName() + ".langues");
            createCache(cm, fr.gest.com.application.domain.Fournisseur.class.getName() + ".articles");
            createCache(cm, fr.gest.com.application.domain.Fournisseur.class.getName() + ".adresses");
            createCache(cm, fr.gest.com.application.domain.Profile.class.getName());
            createCache(cm, fr.gest.com.application.domain.Profile.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Profile.class.getName() + ".employes");
            createCache(cm, fr.gest.com.application.domain.Utilisateur.class.getName());
            createCache(cm, fr.gest.com.application.domain.Employe.class.getName());
            createCache(cm, fr.gest.com.application.domain.Employe.class.getName() + ".langues");
            createCache(cm, fr.gest.com.application.domain.Employe.class.getName() + ".adresses");
            createCache(cm, fr.gest.com.application.domain.Employe.class.getName() + ".profiles");
            createCache(cm, fr.gest.com.application.domain.Employe.class.getName() + ".clients");
            createCache(cm, fr.gest.com.application.domain.Employe.class.getName() + ".commandes");
            createCache(cm, fr.gest.com.application.domain.UtiProfile.class.getName());
            createCache(cm, fr.gest.com.application.domain.Habilitation.class.getName());
            createCache(cm, fr.gest.com.application.domain.Habilitation.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Adresse.class.getName());
            createCache(cm, fr.gest.com.application.domain.Adresse.class.getName() + ".partenaires");
            createCache(cm, fr.gest.com.application.domain.Adresse.class.getName() + ".clients");
            createCache(cm, fr.gest.com.application.domain.ArticleCompose.class.getName());
            createCache(cm, fr.gest.com.application.domain.ArticleCompose.class.getName() + ".articles");
            createCache(cm, fr.gest.com.application.domain.Stock.class.getName());
            createCache(cm, fr.gest.com.application.domain.Stock.class.getName() + ".articles");
            createCache(cm, fr.gest.com.application.domain.MouvementStock.class.getName());
            createCache(cm, fr.gest.com.application.domain.MouvementStock.class.getName() + ".articles");
            createCache(cm, fr.gest.com.application.domain.Client.class.getName());
            createCache(cm, fr.gest.com.application.domain.Client.class.getName() + ".adresses");
            createCache(cm, fr.gest.com.application.domain.Client.class.getName() + ".commandes");
            createCache(cm, fr.gest.com.application.domain.Partenaire.class.getName());
            createCache(cm, fr.gest.com.application.domain.Partenaire.class.getName() + ".employes");
            createCache(cm, fr.gest.com.application.domain.Facture.class.getName());
            createCache(cm, fr.gest.com.application.domain.Commande.class.getName());
            createCache(cm, fr.gest.com.application.domain.Commande.class.getName() + ".ventes");
            createCache(cm, fr.gest.com.application.domain.Vente.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
