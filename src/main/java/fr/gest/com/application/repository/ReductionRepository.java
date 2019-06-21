package fr.gest.com.application.repository;

import fr.gest.com.application.domain.Reduction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Reduction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReductionRepository extends JpaRepository<Reduction, Long> {

}
