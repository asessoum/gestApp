package fr.gest.com.application.repository;

import fr.gest.com.application.domain.ArticleCompose;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ArticleCompose entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleComposeRepository extends JpaRepository<ArticleCompose, Long> {

}
