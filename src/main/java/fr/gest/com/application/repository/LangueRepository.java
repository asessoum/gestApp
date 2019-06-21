package fr.gest.com.application.repository;

import fr.gest.com.application.domain.Langue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Langue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LangueRepository extends JpaRepository<Langue, Long> {

}
