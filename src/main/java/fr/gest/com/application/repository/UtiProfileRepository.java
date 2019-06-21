package fr.gest.com.application.repository;

import fr.gest.com.application.domain.UtiProfile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UtiProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UtiProfileRepository extends JpaRepository<UtiProfile, Long> {

}
