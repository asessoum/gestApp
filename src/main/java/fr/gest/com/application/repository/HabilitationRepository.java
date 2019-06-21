package fr.gest.com.application.repository;

import fr.gest.com.application.domain.Habilitation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Habilitation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HabilitationRepository extends JpaRepository<Habilitation, Long> {

}
